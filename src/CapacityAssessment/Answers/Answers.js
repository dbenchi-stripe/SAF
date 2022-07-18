import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { AnswerOptions } from "./AnswerOptions/AnswerOptions";
import "./Answers.css";

export const Answers = () => {
  const {
    currentQuestion,
    questions,
    answerClicked,
    answers,
    answeredQuestions,
    allowGlobalResults,
    hasPreviousQuestion,
    previousQuestion,
    done,
    hasNextQuestion,
    nextQuestion,
  } = useContext(CapabilityAssessmentContext);

  const [note, setNote] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [currentGlobalAnswer, setCurrentGlobalAnswer] = useState();

  useEffect(() => {
    const note = answeredQuestions[currentQuestion]
      ? answeredQuestions[currentQuestion].note
      : "";
    setNote(note);
  }, [answeredQuestions, currentQuestion]);

  useEffect(() => {
    setCurrentAnswer({
      value: answeredQuestions[currentQuestion]?.value,
      text: answeredQuestions[currentQuestion]?.text,
    });

    setCurrentGlobalAnswer({
      value: answeredQuestions[currentQuestion]?.value_global,
      text: answeredQuestions[currentQuestion]?.text_global,
    });
  }, [answeredQuestions, currentQuestion]);

  return (
    <div>
      <div className="answer-wrapper">
        <IconButton
          aria-label="back"
          size="large"
          color="primary"
          disabled={!hasPreviousQuestion() || done}
          onClick={() => previousQuestion()}
        >
          <ArrowBackIcon />
        </IconButton>
        <div className="answer-wrapper-text-area">
          <h5 style={{ textAlign: "center" }}>Notes:</h5>

          <TextareaAutosize
            minRows={14}
            maxRows={14}
            style={{ width: "94%", marginLeft: 20 }}
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>
        <AnswerOptions
          label="Local"
          name="localRadioGroup"
          answers={answers}
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
        />
        {allowGlobalResults && (
          <AnswerOptions
            label="Global"
            name="globalRadioGroup"
            answers={answers}
            currentAnswer={currentGlobalAnswer}
            setCurrentAnswer={setCurrentGlobalAnswer}
          />
        )}
        <IconButton
          aria-label="next"
          size="large"
          color="primary"
          disabled={!hasNextQuestion() || done}
          onClick={() => nextQuestion()}
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <Box margin={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          disabled={_.isNil(currentAnswer?.value)}
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            setNote("");
            answerClicked({
              questionNumber: currentQuestion,
              workshopPhase: questions[currentQuestion].workshopPhase,
              title: questions[currentQuestion].title,
              value: currentAnswer.value,
              text: currentAnswer.text,
              value_global: !_.isNil(currentGlobalAnswer.value)
                ? currentGlobalAnswer.value
                : currentAnswer.value,
              text_global: currentGlobalAnswer.text
                ? currentGlobalAnswer.text
                : currentAnswer.text,
              note,
            });
          }}
        >
          Save and Next
        </Button>
      </Box>
    </div>
  );
};
