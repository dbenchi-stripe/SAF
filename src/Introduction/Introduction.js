import React from "react";
import { useNavigate } from "react-router-dom";
import saf from "../assets/SAFArchitecture.svg";
import "./Introduction.css";

export const Introduction = () => {
  const navigate = useNavigate();
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
          <img alt="SAF Architecture" src={saf} width="100%" />
          <button
            style={{ height: 70, width: 200, fontSize: 35 }}
            onClick={() => navigate(`/saf`)}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
