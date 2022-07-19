import React, { useState, createContext, useEffect, useCallback } from "react";
import useLocalStorageState from "use-local-storage-state";
import _ from "lodash";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { DisasterRecoveryDialog } from "./DisasterRecoveryDialog/DisasterRecoveryDialog";
import { questions } from "../assets/questions";
import { WorkshopPhases } from "../assets/WorkshopPhases";
import { answers } from "../assets/answers";
import { average, isDevMode } from "./utils";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";

export const CapabilityAssessmentContext = createContext({
  answerClicked: null,
  done: null,
  currentQuestion: null,
  questions: null,
  answers: null,
  initialCapacities: null,
  capacities: null,
  answeredQuestions: null,
  printLocalSAFArchitectureResultsRef: null,
  printGlobalSAFArchitectureResultsRef: null,
  removeItem: null,
  allowGlobalResults: false,
  hasPreviousQuestion: null,
  previousQuestion: null,
  hasNextQuestion: null,
  nextQuestion: null,
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [allowGlobalResults, setAllowGlobalResults] = useState(isDevMode());
  const [recoveredFromLocalStage, setRecoveredFromLocalStage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const printLocalSAFArchitectureResultsRef = React.useRef();
  const printGlobalSAFArchitectureResultsRef = React.useRef();
  const [storage, setStorage, { removeItem, isPersistent }] =
    useLocalStorageState("saf");

  useEffect(() => {
    if (!_.isEmpty(storage) && _.isEmpty(answeredQuestions)) {
      setOpenDialog(true);
    }
  }, []);

  const getNumberOfAlreadyAnsweredQuestions = () =>
    parseInt(Object.keys(storage || {})[Object.keys(storage || {}).length - 1]);

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
        printLocalSAFArchitectureResultsRef,
        printGlobalSAFArchitectureResultsRef,
        removeItem,
        allowGlobalResults,
        hasPreviousQuestion,
        previousQuestion,
        hasNextQuestion,
        nextQuestion,
      }}
    >
      <div className="container">
        {showResults && <Results />}
        {!done && (
          <>
            <Questions showMoreInformation={showMoreInformation} />
            <Stack
              spacing={2}
              direction="row"
              justifyContent="space-around"
              marginTop={2}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => restartCapacityAssessment()}
              >
                Restart Capacity Assessment
              </Button>
              <Button variant="contained" onClick={() => toggleShowResult()}>
                {showResults ? "Hide Results" : "Show Results"}
              </Button>
              {isDevMode() && (
                <Button
                  variant="contained"
                  onClick={() => toggleAllowGlobalResults()}
                >
                  {allowGlobalResults
                    ? "Hide Global Results"
                    : "Show Global Results"}
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => toggleShowMoreInformation()}
              >
                {showMoreInformation
                  ? "Hide Question Information"
                  : "Show Question Information"}
              </Button>
            </Stack>
          </>
        )}
      </div>
      <DisasterRecoveryDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        numberOfAlreadyAnsweredQuestions={getNumberOfAlreadyAnsweredQuestions()}
        cancelOnClick={() => {
          removeItem("saf");
          setOpenDialog(false);
        }}
        restoreOnClick={() => {
          setAnsweredQuestions(storage);
          setCurrentQuestion(getNumberOfAlreadyAnsweredQuestions());
          setRecoveredFromLocalStage(true);
          setOpenDialog(false);
        }}
      />
    </CapabilityAssessmentContext.Provider>
  );
}

export default CapabilityAssessment;
