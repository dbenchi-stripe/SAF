import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { WorkshopPhases } from "../../assets/WorkshopPhases";
import "./SAFArchitectureResults.css";

export const SAFArchitectureResults = ({ className }) => {
  const { capacities } = useContext(CapabilityAssessmentContext);

  const getClassNames = (className) =>
    `saf-item inner-item-content active ${className}`;

  const getClassColor = (score) => {
    if (score < 30) {
      return "red";
    }

    if (score < 60) {
      return "amber";
    }

    return "green";
  };

  const SAFArchitectureResultsItem = ({ workshoPhase }) => (
    <div className="inner-item">
      <span className="inner-item-header">
        {WorkshopPhases[workshoPhase]}:{" "}
      </span>{" "}
      <div className={getClassNames(workshoPhase)}>
        {capacities.map((capacity, index) => {
          if (capacity.subject === WorkshopPhases[workshoPhase]) {
            return capacity.title.map((title) => (
              <div
                key={`SAFArchitectureResultsItem_${title.subject}_${index}`}
                className={`${getClassColor(title.score)} inner-capacity-name`}
              >
                {title.subject}
              </div>
            ));
          }
        })}
      </div>
    </div>
  );

  return (
    <div className={`${className ? className : ""} saf`}>
      <SAFArchitectureResultsItem workshoPhase="business" />
      <SAFArchitectureResultsItem workshoPhase="people" />
      <SAFArchitectureResultsItem workshoPhase="tech" />
      <SAFArchitectureResultsItem workshoPhase="risk" />
      <SAFArchitectureResultsItem workshoPhase="operation" />
    </div>
  );
};
