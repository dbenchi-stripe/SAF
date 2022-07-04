import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { Answers } from "../Answers/Answers";
import "./Questions.css";

export const Questions = () => {
  const { currentQuestion, questions } = useContext(
    CapabilityAssessmentContext
  );

  return (
    <div>
      <div className="question-card">
        <div className="question-count">
          Question <span> {currentQuestion + 1}</span> of{" "}
          <span>{questions.length}</span>
        </div>
        <h2 className="question">{questions[currentQuestion].question}</h2>
        <h3 className="question-text">
          {questions[currentQuestion].ratingDefinition}
        </h3>
        {questions[currentQuestion].pathToGreen && (
          <div className="path-to-green-container">
            <h3 className="path-to-green">
              {questions[currentQuestion].pathToGreen}
            </h3>
          </div>
        )}

        <Answers />
      </div>
    </div>
  );
};
