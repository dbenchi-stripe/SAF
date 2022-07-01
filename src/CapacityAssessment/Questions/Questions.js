import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import "./Questions.css";

export const Questions = () => {
  const {
    currentQuestion,
    questions,
    answerClicked,
    answers,
    answeredQuestions,
  } = useContext(CapabilityAssessmentContext);

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

        <ul className="answer-options">
          {answers.map((answer) => {
            return (
              <li
                key={answer.id}
                className={`answer-option ${answer.text}`}
                onClick={() =>
                  answerClicked(
                    currentQuestion + 1,
                    questions[currentQuestion].workshopPhase,
                    answer.value
                  )
                }
              >
                <input
                  type="radio"
                  className="radioCustomButton"
                  name="radioGroup"
                  checked={
                    answer.value ===
                    answeredQuestions[currentQuestion + 1]?.value
                  }
                  value={answer.text}
                  id={answer.id}
                  onChange={() => {
                    answerClicked(
                      currentQuestion + 1,
                      questions[currentQuestion].workshopPhase,
                      answer.value
                    );
                  }}
                />
                <label className={`radioCustomLabel ${answer.text}`}>
                  {answer.text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
