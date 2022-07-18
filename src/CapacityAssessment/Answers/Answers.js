import React, { useContext, useState, useEffect } from "react";
import { TextareaAutosize } from "@mui/base";
import { Box, Button, IconButton } from "@mui/material";
import { Save, ArrowForward, ArrowBack } from "@mui/icons-material";

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
          <ArrowBack />
        </IconButton>
        <div className="answer-wrapper-text-area">
          <h5 style={{ textAlign: "center" }}>Notes:</h5>

          <TextareaAutosize
            minRows={14}
            maxRows={14}
            style={{ width: "94%", marginLeft: 20 }}
            cacheMeasurements
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </div>
        <AnswerOptions
          name="localRadioGroup"
          answers={answers}
          currentAnswer={currentAnswer}
          setCurrentAnswer={setCurrentAnswer}
        />
        {allowGlobalResults && (
          <AnswerOptions
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
          <ArrowForward />
        </IconButton>
      </div>
      <Box margin={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          size="large"
          startIcon={<Save />}
          onClick={() => {
            setNote("");
            answerClicked({
              questionNumber: currentQuestion,
              workshopPhase: questions[currentQuestion].workshopPhase,
              title: questions[currentQuestion].title,
              value: currentAnswer.value,
              text: currentAnswer.text,
              value_global: currentGlobalAnswer.value
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
