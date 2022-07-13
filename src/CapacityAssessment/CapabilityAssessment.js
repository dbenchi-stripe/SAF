import React, { useState, createContext, useEffect, useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";
import _ from "lodash";
import { confirmAlert } from "react-confirm-alert";

import { questions } from "../assets/questions";
import { WorkshopPhases } from "../assets/WorkshopPhases";
import { answers } from "../assets/answers";
import { average } from "./utils";
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
        subject: question.title,
        score: 0,
      };
    });
};

const initialCapacities = [
  {
    subject: WorkshopPhases["business"],
    titles: getCapacitiesTitles(WorkshopPhases["business"]),
    score: 0,
  },
  {
    subject: WorkshopPhases["people"],
    titles: getCapacitiesTitles(WorkshopPhases["people"]),
    score: 0,
  },
  {
    subject: WorkshopPhases["risk"],
    titles: getCapacitiesTitles(WorkshopPhases["risk"]),
    score: 0,
  },
  {
    subject: WorkshopPhases["tech"],
    titles: getCapacitiesTitles(WorkshopPhases["tech"]),
    score: 0,
  },
  {
    subject: WorkshopPhases["operation"],
    titles: getCapacitiesTitles(WorkshopPhases["operation"]),
    score: 0,
  },
];

function CapabilityAssessment() {
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [recoveredFromLocalStage, setRecoveredFromLocalStage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const printSAFArchitectureResultsRef = React.useRef();
  const [storage, setStorage, { removeItem, isPersistent }] =
    useLocalStorageState("saf");

  if (!_.isEmpty(storage) && _.isEmpty(answeredQuestions)) {
    confirmAlert({
      title: "Pick up where we left off?",
      message: "Do you want to move forward with the latest evaluation?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setAnsweredQuestions(storage);
            setCurrentQuestion(
              parseInt(Object.keys(storage)[Object.keys(storage).length - 1])
            );
            setRecoveredFromLocalStage(true);
          },
        },
        {
          label: "No, delete it",
          onClick: () => {
            removeItem("saf");
          },
        },
      ],
    });
  }

  const getCapacities = () => {
    const newResult = Object.values(answeredQuestions)?.reduce(
      (result, { workshopPhase, title, value }) => {
        return {
          ...result,
          [workshopPhase]: [
            ...(result[workshopPhase] ? result[workshopPhase] : []),
            value,
          ],
          [workshopPhase + "_titles"]: [
            ...(result[workshopPhase + "_titles"]
              ? result[workshopPhase + "_titles"]
              : []),
            { subject: title, score: value },
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
              newComputedTitlesObject.subject === originalTitlesObject.subject
          ) || originalTitlesObject
        );
      });
    };

    const newCapacities = initialCapacities.map(
      ({ subject, score, titles }) => {
        return {
          subject,
          score: newResult[subject]?.length
            ? average(newResult[subject])
            : score,
          title: getTitles(titles, newResult[subject + "_titles"]),
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
    note,
  }) => {
    const newAnsweredQuestions = {
      ...answeredQuestions,
      [questionNumber]: {
        workshopPhase,
        title,
        text,
        value,
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
