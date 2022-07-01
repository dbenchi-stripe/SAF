import React, { useState, createContext } from "react";

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
  const [capacities, setCapacities] = useState(initialCapacities);

  const setCapacityAssessment = (workshopPhase, value) => {
    const newCapacities = capacities.map((capacity) => {
      if (capacity.subject === workshopPhase) {
        const newResult = [...capacity.results, value];
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

  const answerClicked = (workshopPhase, value) => {
    console.log({ workshopPhase, value });
    setCapacityAssessment(workshopPhase, value);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setDone(true);
    }
  };

  /* Resets the game back to default */
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
