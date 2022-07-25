import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { getInvalideQuestions } from "helper/questionsValidation";
import React from "react";
import { useNavigate } from "react-router-dom";

import { HowToAddMyQuestions } from "./HowToAddMyQuestions";
import "./Introduction.css";

export const Introduction = () => {
  const navigate = useNavigate();
  const [questionList, setQuestionList] = React.useState("First");
  const invalideQuestions = getInvalideQuestions();

  const handleChange = (event) => {
    setQuestionList(event.target.value);
  };

  return (
    <Box m={5}>
      <Typography
        variant="h3"
        m={2}
        color="primary"
        style={{ fontWeight: 600 }}
        align="center"
      >
        Stripe Adoption Framework
      </Typography>
      <Typography variant="body1">
        A holistic approach for digital transformation using Stripe financial
        services infrastructure. It is founded on a comprehensive list of
        predefined questions.
      </Typography>
      <HowToAddMyQuestions />
      <Typography variant="h6" color="primary" mt={5}>
        What list of questions would you like to begin?
      </Typography>
      <FormControl color="primary">
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={questionList}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="First"
            control={<Radio />}
            label={
              <a
                href="https://docs.google.com/spreadsheets/d/16pSzo9eWDg0BJJ6w_o0cnS6a9EdOO1cigAL0JH7l8BI"
                target="_blank"
                rel="noopener noreferrer"
              >
                First set
              </a>
            }
          />
        </RadioGroup>
      </FormControl>
      <Box margin={2} display="flex" justifyContent="center">
        <Button
          endIcon={<PlayCircleFilledIcon />}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/saf`)}
          disabled={invalideQuestions.length !== 0}
        >
          Start {questionList} Set
        </Button>
      </Box>

      {invalideQuestions.length !== 0 && (
        <div className="alert">
          <pre>{JSON.stringify(invalideQuestions, null, 2)}</pre>
        </div>
      )}
    </Box>
  );
};
