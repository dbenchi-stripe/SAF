import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import StartIcon from "@mui/icons-material/Start";
import Typography from "@mui/material/Typography";

import { getInvalideQuestions } from "../helper/questionsValidation";
import saf from "../assets/SAFArchitecture.svg";
import "./Introduction.css";

export const Introduction = () => {
  const navigate = useNavigate();
  const invalideQuestions = getInvalideQuestions();

  return (
    <div>
      <div className="container">
        <Typography
          variant="h3"
          m={2}
          color="primary"
          style={{ fontWeight: 600 }}
          align="center"
        >
          Stripe Adoption Framework
        </Typography>
        <Typography variant="h4" m={2} color="primary">
          A holistic approach for digital transformation using Stripe financial
          services infrastructure
        </Typography>
        <div className="introduction-card">
          <img
            alt="SAF Architecture"
            src={saf}
            className="introduction-image"
          />
          <Box margin={2} display="flex" justifyContent="center">
            <Button
              endIcon={<StartIcon />}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => navigate(`/saf`)}
              disabled={invalideQuestions.length !== 0}
            >
              Start
            </Button>
          </Box>
        </div>
      </div>

      {invalideQuestions.length !== 0 && (
        <div class="alert">
          <pre>{JSON.stringify(invalideQuestions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
