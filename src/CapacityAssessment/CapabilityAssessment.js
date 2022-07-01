import React, { useState, createContext, useEffect } from "react";

import { questions } from "../assets/questions";
import { answers } from "../assets/answers";
import { average } from "./utils";
import { Questions } from "./Questions/Questions";
import { Results } from "./Results/Results";
import "./CapacityAssessment.css";

export const CapabilityAssessmentContext = createContext();

const initialCapacities = [
  {
    subject: "Business",
    score: 0,
    results: [],
  },
  {
    subject: "People & Governance",
    score: 0,
    results: [],
  },
  {
    subject: "Risk & Reg",
    score: 0,
    results: [],
  },
  {
    subject: "Tech",
    score: 0,
    results: [],
  },
  {
    subject: "Operations",
    score: 0,
    results: [],
  },
];

function CapabilityAssessment() {
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [capacities, setCapacities] = useState(initialCapacities);

  console.log(answeredQuestions);
  useEffect(() => {
    setCapacityAssessment();
  }, [capacities]);

  const setCapacityAssessment = () => {
    if (!hasPreviousQuestion()) {
      return;
    }
    const newCapacities = capacities.map((capacity) => {
      const workshopPhase = questions[currentQuestion - 1].workshopPhase;

      if (capacity.subject === workshopPhase) {
        console.log(answeredQuestions);
        const newResult = Object.values(answeredQuestions).map(
          ({ workshopPhase: internalWorkshopPhase, value }) => {
            console.log({ internalWorkshopPhase, workshopPhase });
            if (internalWorkshopPhase === workshopPhase) {
              return value;
            }
          }
        );
        console.log(capacity, newResult);
        return {
          subject: workshopPhase,
          results: newResult,
          score: average(newResult),
        };
      }

      return capacity;
    });

    setCapacities(newCapacities);
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
    setAnsweredQuestions((answeredQuestions) => ({
      ...answeredQuestions,
      questionNumber: {
        workshopPhase,
        value,
      },
    }));
    nextQuestion();
  };

  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setCapacities(initialCapacities);
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
        capacities,
      }}
    >
      <div className="container">
        <h1 className="title">SAF Capability Assessment</h1>
        <button disabled={!hasNextQuestion()} onClick={() => nextQuestion()}>
          Next Question
        </button>
        <button
          disabled={!hasPreviousQuestion()}
          onClick={() => previousQuestion()}
        >
          previousQuestion
        </button>
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
