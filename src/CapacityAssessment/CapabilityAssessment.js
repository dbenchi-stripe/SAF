import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { questions } from "../assets/questions";
import { WorkshopPhases } from "../assets/WorkshopPhases";

import { answers } from "../assets/answers";
import { average } from "./utils";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const navigate = useNavigate();

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

  const hasNextQuestion = () => currentQuestion + 1 < questions.length;
  const hasPreviousQuestion = () => currentQuestion >= 1;

  const nextQuestion = () => {
    if (hasNextQuestion()) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setDone(true);
    }
  };

  const previousQuestion = () => {
    if (hasPreviousQuestion()) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const answerClicked = ({ questionNumber, workshopPhase, title, value }) => {
    setAnsweredQuestions({
      ...answeredQuestions,
      [questionNumber]: {
        workshopPhase,
        title,
        value,
      },
    });
    nextQuestion();
  };

  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setAnsweredQuestions({});
    navigate(`/`);
  };

  const toggleShowResult = () => {
    setShowResults((showResults) => !showResults);
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
            <Questions />
            <div className="button-container">
              <button onClick={() => restartCapacityAssessment()}>
                Restart Capacity Assessment
              </button>
              <button onClick={() => toggleShowResult()}>
                {showResults ? "Hide Results" : "Show Results"}
              </button>
            </div>
          </>
        )}
      </div>
    </CapabilityAssessmentContext.Provider>
  );
}

export default CapabilityAssessment;
