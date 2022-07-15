import React, { useState, createContext, useEffect, useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";
import _ from "lodash";
import { confirmAlert } from "react-confirm-alert";

import { questions } from "../assets/questions";
import { WorkshopPhases } from "../assets/WorkshopPhases";
import { answers } from "../assets/answers";
import { average, isDevMode } from "./utils";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";

import "react-confirm-alert/src/react-confirm-alert.css";
import "./CapacityAssessment.css";

export const CapabilityAssessmentContext = createContext({
  answerClicked: null,
  done: null,
  currentQuestion: null,
  questions: null,
  answers: null,
  initialCapacities: null,
  capacities: null,
  answeredQuestions: null,
  printSAFArchitectureResultsRef: null,
  removeItem: null,
  allowGlobalResults: false,
});

const getCapacitiesTitles = (workshopPhase) => {
  return questions
    .filter((question) => {
      if (question.workshopPhase === workshopPhase) {
        return true;
      }
      return false;
    })
    .map((question) => {
      return {
        workshopPhase: question.title,
        value: 0,
      };
    });
};

const initialCapacities = [
  {
    workshopPhase: WorkshopPhases["business"],
    titles: getCapacitiesTitles(WorkshopPhases["business"]),
    value: 0,
    value_global: 0,
  },
  {
    workshopPhase: WorkshopPhases["people"],
    titles: getCapacitiesTitles(WorkshopPhases["people"]),
    value: 0,
    value_global: 0,
  },
  {
    workshopPhase: WorkshopPhases["risk"],
    titles: getCapacitiesTitles(WorkshopPhases["risk"]),
    value: 0,
    value_global: 0,
  },
  {
    workshopPhase: WorkshopPhases["tech"],
    titles: getCapacitiesTitles(WorkshopPhases["tech"]),
    value: 0,
    value_global: 0,
  },
  {
    workshopPhase: WorkshopPhases["operation"],
    titles: getCapacitiesTitles(WorkshopPhases["operation"]),
    value: 0,
    value_global: 0,
  },
];

function CapabilityAssessment() {
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [allowGlobalResults, setAllowGlobalResults] = useState(true);
  const [recoveredFromLocalStage, setRecoveredFromLocalStage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const printSAFArchitectureResultsRef = React.useRef();
  const [storage, setStorage, { removeItem, isPersistent }] =
    useLocalStorageState("saf");

  const getNumberOfAlreadyAnsweredQuestions = () =>
    parseInt(Object.keys(storage)[Object.keys(storage).length - 1]);

  if (!_.isEmpty(storage) && _.isEmpty(answeredQuestions)) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert-confirmation">
            <h1 style={{ textAlign: "center" }}>
              Pick up where we left off? &#128517;
            </h1>
            <p>
              You have already answered{" "}
              {getNumberOfAlreadyAnsweredQuestions() + 1} questions.
            </p>
            <p>Do you want to move forward with the latest evaluation?</p>
            <button
              onClick={() => {
                setAnsweredQuestions(storage);
                setCurrentQuestion(getNumberOfAlreadyAnsweredQuestions());
                setRecoveredFromLocalStage(true);
                onClose();
              }}
            >
              &#10004; Yes, let us continue
            </button>
            <button
              style={{ backgroundColor: "red" }}
              onClick={() => {
                removeItem("saf");
                onClose();
              }}
            >
              &#10006; No, delete it
            </button>
          </div>
        );
      },
    });
  }

  const getCapacities = () => {
    const newResult = Object.values(answeredQuestions)?.reduce(
      (result, { workshopPhase, title, value, value_global }) => {
        return {
          ...result,
          [workshopPhase]: [
            ...(result[workshopPhase] ? result[workshopPhase] : []),
            { value, value_global },
          ],
          [workshopPhase + "_titles"]: [
            ...(result[workshopPhase + "_titles"]
              ? result[workshopPhase + "_titles"]
              : []),
            { workshopPhase: title, value, value_global },
          ],
        };
      },
      {}
    );

    const getTitles = (originalTitles, newComputedTitles) => {
      return originalTitles?.map((originalTitlesObject) => {
        return (
          newComputedTitles?.find(
            (newComputedTitlesObject) =>
              newComputedTitlesObject.workshopPhase ===
              originalTitlesObject.workshopPhase
          ) || originalTitlesObject
        );
      });
    };

    const newCapacities = initialCapacities.map(
      ({ workshopPhase, value, titles, value_global }) => {
        return {
          workshopPhase,
          value: newResult[workshopPhase]?.length
            ? average(newResult[workshopPhase], "value")
            : value,
          value_global: newResult[workshopPhase]?.length
            ? average(newResult[workshopPhase], "value_global")
            : value_global,
          titles: getTitles(titles, newResult[workshopPhase + "_titles"]),
        };
      }
    );

    return newCapacities;
  };

  const hasNextQuestion = useCallback(
    () => currentQuestion + 1 < questions.length,
    [currentQuestion]
  );

  const hasPreviousQuestion = () => currentQuestion >= 1;

  const nextQuestion = useCallback(() => {
    if (hasNextQuestion()) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setDone(true);
    }
  }, [currentQuestion, hasNextQuestion]);

  useEffect(() => {
    if (recoveredFromLocalStage) {
      nextQuestion();
      setRecoveredFromLocalStage(false);
    }
  }, [recoveredFromLocalStage, nextQuestion]);

  const previousQuestion = () => {
    if (hasPreviousQuestion()) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const answerClicked = ({
    questionNumber,
    workshopPhase,
    title,
    text,
    value,
    value_global,
    text_global,
    note,
  }) => {
    const newAnsweredQuestions = {
      ...answeredQuestions,
      [questionNumber]: {
        workshopPhase,
        title,
        text,
        value,
        value_global,
        text_global,
        note,
      },
    };
    setAnsweredQuestions(newAnsweredQuestions);
    setStorage(newAnsweredQuestions);
    nextQuestion();
  };

  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setAnsweredQuestions({});
    removeItem("saf");
  };

  const toggleShowResult = () => {
    setShowResults((showResults) => !showResults);
  };

  const toggleShowMoreInformation = () => {
    setShowMoreInformation((showMoreInformation) => !showMoreInformation);
  };

  const toggleAllowGlobalResults = () => {
    setAllowGlobalResults((allowGlobalResults) => !allowGlobalResults);
  };

  return (
    <CapabilityAssessmentContext.Provider
      value={{
        answerClicked,
        done,
        currentQuestion,
        questions,
        answers,
        initialCapacities,
        capacities: getCapacities(),
        answeredQuestions,
        printSAFArchitectureResultsRef,
        removeItem,
        allowGlobalResults,
      }}
    >
      <div className="container">
        <div className="header">
          <button
            disabled={!hasPreviousQuestion() || done}
            onClick={() => previousQuestion()}
          >
            {"<"}
          </button>
          <h1 className="title">Stripe Adoption Framework</h1>
          <button
            disabled={!hasNextQuestion() || done}
            onClick={() => nextQuestion()}
          >
            {">"}
          </button>
        </div>
        {showResults && <Results />}
        {!done && (
          <>
            <Questions showMoreInformation={showMoreInformation} />
            <div className="button-container">
              <button onClick={() => restartCapacityAssessment()}>
                Restart Capacity Assessment
              </button>
              <button onClick={() => toggleShowResult()}>
                {showResults ? "Hide Results" : "Show Results"}
              </button>
              {isDevMode() && (
                <button onClick={() => toggleAllowGlobalResults()}>
                  {allowGlobalResults
                    ? "Hide Global Results"
                    : "Show Global Results"}
                </button>
              )}
              <button onClick={() => toggleShowMoreInformation()}>
                {showMoreInformation
                  ? "Hide Question Information"
                  : "Show Question Information"}
              </button>
            </div>
          </>
        )}
      </div>
    </CapabilityAssessmentContext.Provider>
  );
}

export default CapabilityAssessment;
