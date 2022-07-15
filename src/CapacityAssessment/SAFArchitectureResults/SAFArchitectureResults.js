import React, { useContext } from "react";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { WorkshopPhases } from "../../assets/WorkshopPhases";
import "./SAFArchitectureResults.css";

export const SAFArchitectureResults = ({ className }) => {
  const { capacities, printSAFArchitectureResultsRef } = useContext(
    CapabilityAssessmentContext
  );

  const getClassNames = (className) =>
    `saf-item inner-item-content active ${className}`;

  const getClassColor = (value) => {
    if (value < 30) {
      return "red";
    }

    if (value < 60) {
      return "amber";
    }

    return "green";
  };

  const SAFArchitectureResultsItem = ({ workshopPhase }) => (
    <div className="inner-item">
      <span className="inner-item-header">
        {WorkshopPhases[workshopPhase]}:{" "}
      </span>{" "}
      <div className={getClassNames(workshopPhase)}>
        {capacities.map((capacity, index) => {
          if (capacity.workshopPhase === WorkshopPhases[workshopPhase]) {
            return capacity.title.map((title) => (
              <div
                key={`SAFArchitectureResultsItem_${title.workshopPhase}_${index}`}
                className={`${getClassColor(title.value)} inner-capacity-name`}
              >
                {title.workshopPhase}
              </div>
            ));
          }

          return undefined;
        })}
      </div>
    </div>
  );

  return (
    <div
      ref={printSAFArchitectureResultsRef}
      className={`${className ? className : ""} saf`}
    >
      <SAFArchitectureResultsItem workshoPhase="business" />
      <SAFArchitectureResultsItem workshoPhase="people" />
      <SAFArchitectureResultsItem workshoPhase="tech" />
      <SAFArchitectureResultsItem workshoPhase="risk" />
      <SAFArchitectureResultsItem workshoPhase="operation" />
    </div>
  );
};
