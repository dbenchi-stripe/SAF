import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import "./Questions.css";

export const Questions = () => {
  const { currentQuestion, questions, answerClicked, answers } = useContext(
    CapabilityAssessmentContext
  );
  return (
    <div>
      <div className="question-card">
        <div className="question-count">
          Question <span> {currentQuestion + 1}</span> of{" "}
          <span>{questions.length}</span>
        </div>
        {/* Current Question  */}
        <h2 className="question">{questions[currentQuestion].question}</h2>
        <h3 className="question-text">
          {questions[currentQuestion].ratingDefinition}
        </h3>

        <ul className="answer-options">
          {answers.map((answer) => {
            return (
              <li
                key={answer.id}
                className={`answer-option ${answer.text}`}
                onClick={() =>
                  answerClicked(
                    questions[currentQuestion].workshopPhase,
                    answer.value
                  )
                }
              >
                {answer.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
