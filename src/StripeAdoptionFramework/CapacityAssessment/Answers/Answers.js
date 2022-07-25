import TextareaAutosize from "@mui/base/TextareaAutosize";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { GlobalConfigurationContext } from "GlobalConfiguration/GlobalConfiguration";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";

import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { AnswerOptions } from "./AnswerOptions/AnswerOptions";

export const Answers = () => {
  const {
    currentQuestion,
    questions,
    answerClicked,
    answers,
    answeredQuestions,
    hasPreviousQuestion,
    previousQuestion,
    done,
    hasNextQuestion,
    nextQuestion,
  } = useContext(CapabilityAssessmentContext);

  const { allowGlobalResults } = useContext(GlobalConfigurationContext);

  const [note, setNote] = useState();
  const [whyRedAmberGreen, setWhyRedAmberGreen] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [currentGlobalAnswer, setCurrentGlobalAnswer] = useState();

  useEffect(() => {
    const note = answeredQuestions[currentQuestion]
      ? answeredQuestions[currentQuestion].note
      : "";
    const whyRedAmberGreen = answeredQuestions[currentQuestion]
      ? answeredQuestions[currentQuestion].whyRedAmberGreen
      : "";

    setNote(note);
    setWhyRedAmberGreen(whyRedAmberGreen);
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
      <Box display="flex">
        <IconButton
          aria-label="back"
          size="large"
          color="primary"
          disabled={!hasPreviousQuestion() || done}
          onClick={() => previousQuestion()}
        >
          <Tooltip title="Skip Backward">
            <ArrowBackIcon />
          </Tooltip>
        </IconButton>
        <Box sx={{ flexGrow: 4 }}>
          <Typography variant="subtitle2" color="primary" align="center" p={2}>
            General Notes:
          </Typography>

          <TextareaAutosize
            minRows={14}
            maxRows={14}
            style={{ width: "99%" }}
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
          />
        </Box>
        <Box sx={{ flexGrow: 4 }}>
          <Typography variant="subtitle2" color="primary" align="center" p={2}>
            Why Red/Amber/Green?
          </Typography>

          <TextareaAutosize
            minRows={14}
            maxRows={14}
            style={{ width: "99%" }}
            value={whyRedAmberGreen}
            onChange={(event) => {
              setWhyRedAmberGreen(event.target.value);
            }}
          />
        </Box>
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
          <Tooltip title="Skip Forward">
            <ArrowForwardIcon />
          </Tooltip>
        </IconButton>
      </Box>
      <Box margin={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          disabled={_.isNil(currentAnswer?.value)}
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => {
            setNote("");
            setWhyRedAmberGreen("");
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
              whyRedAmberGreen,
            });
          }}
        >
          Save and Next
        </Button>
      </Box>
    </div>
  );
};
