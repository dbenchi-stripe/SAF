import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { Start } from "@mui/icons-material";

import { getInvalideQuestions } from "../helper/questionsValidation";
import saf from "../assets/SAFArchitecture.svg";
import "./Introduction.css";

export const Introduction = () => {
  const navigate = useNavigate();
  const invalideQuestions = getInvalideQuestions();

  return (
    <div>
      <div className="container">
        <div className="header">
          <h1 className="title">Stripe Adoption Framework</h1>
        </div>
        <h2>
          A holistic approach for digital transformation using Stripe financial
          services infrastructure
        </h2>
        <div className="introduction-card">
          <img
            alt="SAF Architecture"
            src={saf}
            className="introduction-image"
          />
          <Box margin={2} display="flex" justifyContent="center">
            <Button
              endIcon={<Start />}
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
