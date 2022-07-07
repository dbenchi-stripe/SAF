import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { Answers } from "../Answers/Answers";
import { AllAnswersTable } from "../Results/AllAnswersTable/AllAnswersTable";
import "./Questions.css";

export const Questions = (
  { showMoreInformation } = { showMoreInformation: false }
) => {
  const { currentQuestion, questions } = useContext(
    CapabilityAssessmentContext
  );
  return (
    <div>
      <div className="question-card">
        <div className="question-wrapper">
          <div className="question-count">
            Question <span> {currentQuestion + 1}</span> of{" "}
            <span>{questions.length}</span>
          </div>
          <h2 className="question">{questions[currentQuestion].question}</h2>
        </div>

        <Answers />
      </div>
      {showMoreInformation && (
        <div className="question-table">
          <AllAnswersTable
            height="auto"
            rowHeaders={currentQuestion + 1}
            allAnswers={[questions[currentQuestion]]}
          />
        </div>
      )}
    </div>
  );
};
