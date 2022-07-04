import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import "./SAFArchitecture.css";

export const SAFArchitecture = () => {
  const { currentQuestion, questions } = useContext(
    CapabilityAssessmentContext
  );

  const getClassNames = (className, workshopPhase) =>
    `saf-item ${className} ${
      questions[currentQuestion].workshopPhase === workshopPhase ? "active" : ""
    }`;

  return (
    <div className="saf">
      <div className={getClassNames("business", "Business")}>Business</div>
      <div className={getClassNames("people", "People & Governance")}>
        People & Governance
      </div>
      <div className={getClassNames("tech", "Tech")}>Technology Platform</div>
      <div className={getClassNames("risk", "Risk & Reg")}>
        Risk, Regulatory & Compliance
      </div>
      <div className={getClassNames("operation", "Operations")}>
        Operations Readiness
      </div>
    </div>
  );
};
