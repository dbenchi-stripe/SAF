import React, { useContext, useState, useEffect } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import TextareaAutosize from "react-textarea-autosize";
import "./Answers.css";

export const Answers = () => {
  const {
    currentQuestion,
    questions,
    answerClicked,
    answers,
    answeredQuestions,
  } = useContext(CapabilityAssessmentContext);
  const [note, setNote] = useState();

  useEffect(() => {
    const note = answeredQuestions[currentQuestion + 1]
      ? answeredQuestions[currentQuestion + 1].note
      : "";
    setNote(note);
  }, [answeredQuestions, currentQuestion]);

  // console.log({
  //   answeredQuestion: answeredQuestions[currentQuestion + 1],
  //   note,
  //   notR: answeredQuestions[currentQuestion + 1]?.note,
  // });

  return (
    <div className="answer-wrapper">
      <div className="answer-wrapper-text-area">
        <h3>Notes:</h3>
        <TextareaAutosize
          minRows={13}
          maxRows={13}
          style={{ width: "94%", marginLeft: 20 }}
          cacheMeasurements
          value={note}
          onChange={(event) => {
            console.log("onchange ", event.target.value);
            setNote(event.target.value);
          }}
        />
      </div>
      <ul className="answer-wrapper-answer-options answer-options">
        {answers.map((answer) => {
          return (
            <li
              key={answer.id}
              className={`answer-option ${answer.text}`}
              onClick={() => {
                setNote("");
                answerClicked({
                  questionNumber: currentQuestion + 1,
                  workshopPhase: questions[currentQuestion].workshopPhase,
                  title: questions[currentQuestion].title,
                  value: answer.value,
                  note,
                });
              }}
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
                onChange={() => {}}
              />
              <label className={`radioCustomLabel ${answer.text}`}>
                {answer.text}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
