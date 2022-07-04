import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { WorkshopPhases } from "../../assets/WorkshopPhases";
import "./SAFArchitecture.css";

export const SAFArchitecture = () => {
  const { currentQuestion, questions } = useContext(
    CapabilityAssessmentContext
  );

  const getClassNames = (className) =>
    `saf-item ${className} ${
      questions[currentQuestion].workshopPhase === WorkshopPhases[className]
        ? "active"
        : ""
    }`;

  return (
    <div className="saf">
      <div className={getClassNames("business")}>Business</div>
      <div className={getClassNames("people")}>People & Governance</div>
      <div className={getClassNames("tech")}>Technology Platform</div>
      <div className={getClassNames("risk")}>Risk, Regulatory & Compliance</div>
      <div className={getClassNames("operation")}>Operations Readiness</div>
    </div>
  );
};
