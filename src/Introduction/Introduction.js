import React from "react";
import { useNavigate } from "react-router-dom";
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
          <button
            style={{ height: 70, width: 200, fontSize: 35 }}
            onClick={() => navigate(`/saf`)}
            disabled={invalideQuestions.length !== 0}
          >
            Start
          </button>
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
