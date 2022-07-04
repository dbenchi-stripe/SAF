import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import "./Answers.css";

export const Answers = () => {
  const {
    currentQuestion,
    questions,
    answerClicked,
    answers,
    answeredQuestions,
  } = useContext(CapabilityAssessmentContext);

  return (
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
                answer.value === answeredQuestions[currentQuestion + 1]?.value
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
  );
};
