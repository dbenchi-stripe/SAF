import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DeliveryGuideContext } from "DeliveryGuide/DeliveryGuide";
import { WorkshopPhases } from "assets/WorkshopPhases";
import { answers } from "assets/answers";
import { questions } from "assets/questions";
import _ from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";

import { DisasterRecoveryDialog } from "./DisasterRecoveryDialog/DisasterRecoveryDialog";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";

export const average = (array, key) =>
  array.reduce((a, b) => a + b[key], 0) / array.length;

export const CapabilityAssessmentContext = createContext({
  answerClicked: null,
  done: null,
  currentQuestion: null,
  questions: null,
  answers: null,
  answeredQuestions: null,
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

export const CapabilityAssessment = () => {
  const { setFinalCapacities } = useContext(DeliveryGuideContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [showMoreInformation, setShowMoreInformation] = useState(false);
  const [recoveredFromLocalStage, setRecoveredFromLocalStage] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const printLocalSAFArchitectureResultsRef = useRef();
  const printGlobalSAFArchitectureResultsRef = useRef();
  const [storage, setStorage, { removeItem }] = useLocalStorageState("saf");

  const getNumberOfAlreadyAnsweredQuestions = () =>
    parseInt(Object.keys(storage || {})[Object.keys(storage || {}).length - 1]);

  const getCapacities = useCallback(() => {
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
  }, [answeredQuestions]);

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
    whyRedAmberGreen,
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
        whyRedAmberGreen,
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
    removeItem();
  };

  const toggleShowResult = () => {
    setShowResults((showResults) => !showResults);
  };

  const toggleShowMoreInformation = () => {
    setShowMoreInformation((showMoreInformation) => !showMoreInformation);
  };

  useEffect(() => {
    if (!_.isEmpty(storage) && _.isEmpty(answeredQuestions)) {
      setOpenDialog(true);
    }
    // This effect is only meant to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (recoveredFromLocalStage) {
      nextQuestion();
      setRecoveredFromLocalStage(false);
    }
  }, [recoveredFromLocalStage, nextQuestion]);

  useEffect(() => {
    if (done) {
      setFinalCapacities?.(getCapacities);
    }
  }, [setFinalCapacities, done, getCapacities]);

  return (
    <CapabilityAssessmentContext.Provider
      value={{
        answerClicked,
        done,
        currentQuestion,
        questions,
        answers,
        answeredQuestions,
        hasPreviousQuestion,
        previousQuestion,
        hasNextQuestion,
        nextQuestion,
      }}
    >
      <div className="container">
        {showResults && (
          <Results
            printLocalSAFArchitectureResultsRef={
              printLocalSAFArchitectureResultsRef
            }
            printGlobalSAFArchitectureResultsRef={
              printGlobalSAFArchitectureResultsRef
            }
            capacities={getCapacities()}
          />
        )}
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
          removeItem();
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
};
