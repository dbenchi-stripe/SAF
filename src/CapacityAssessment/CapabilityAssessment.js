import React, { useState, createContext } from "react";

import { questions } from "../assets/questions";
import { WorkshopPhases } from "../assets/WorkshopPhases";

import { answers } from "../assets/answers";
import { average } from "./utils";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";
import "./CapacityAssessment.css";

export const CapabilityAssessmentContext = createContext();

const initialCapacities = [
  {
    subject: WorkshopPhases["business"],
    score: 0,
  },
  {
    subject: WorkshopPhases["people"],
    score: 0,
  },
  {
    subject: WorkshopPhases["risk"],
    score: 0,
  },
  {
    subject: WorkshopPhases["tech"],
    score: 0,
  },
  {
    subject: WorkshopPhases["operation"],
    score: 0,
  },
];

function CapabilityAssessment() {
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const getCapacities = () => {
    const newResult = Object.values(answeredQuestions)?.reduce(
      (result, { workshopPhase, value }) => {
        return {
          ...result,
          [workshopPhase]: [
            ...(result[workshopPhase] ? result[workshopPhase] : []),
            value,
          ],
        };
      },
      {}
    );
    const newCapacities = initialCapacities.map(({ subject, score }) => {
      return {
        subject,
        score: newResult[subject]?.length ? average(newResult[subject]) : score,
      };
    });

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

  const answerClicked = (questionNumber, workshopPhase, value) => {
    setAnsweredQuestions({
      ...answeredQuestions,
      [questionNumber]: {
        workshopPhase,
        value,
      },
    });
    nextQuestion();
  };

  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setAnsweredQuestions({});
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
          <h1 className="title">SAF Capability Assessment</h1>
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
