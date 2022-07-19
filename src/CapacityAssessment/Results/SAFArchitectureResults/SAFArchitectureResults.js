import React, { useContext } from "react";
import _ from "lodash";
import { CapabilityAssessmentContext } from "../../CapabilityAssessment";
import { WorkshopPhases } from "../../../assets/WorkshopPhases";
import "./SAFArchitectureResults.css";

export const SAFArchitectureResults = ({ className, global }) => {
  const {
    capacities,
    printLocalSAFArchitectureResultsRef,
    printGlobalSAFArchitectureResultsRef,
  } = useContext(CapabilityAssessmentContext);

  const getClassNames = (className) =>
    `saf-item inner-item-content active ${className}`;

  const getClassColor = (value) => {
    if (_.isNil(value)) {
      return "gray";
    }

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
            return capacity.titles.map((title) => (
              <div
                key={`SAFArchitectureResultsItem_${title.workshopPhase}_${index}`}
                className={`${getClassColor(
                  global ? title.value_global : title.value
                )} inner-capacity-name`}
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
      ref={
        global
          ? printGlobalSAFArchitectureResultsRef
          : printLocalSAFArchitectureResultsRef
      }
      className={`${className ? className : ""} saf`}
    >
      <SAFArchitectureResultsItem workshopPhase="business" />
      <SAFArchitectureResultsItem workshopPhase="people" />
      <SAFArchitectureResultsItem workshopPhase="tech" />
      <SAFArchitectureResultsItem workshopPhase="risk" />
      <SAFArchitectureResultsItem workshopPhase="operation" />
      <h3>{global ? "Global SAF Results" : "Local SAF Results"}</h3>
    </div>
  );
};