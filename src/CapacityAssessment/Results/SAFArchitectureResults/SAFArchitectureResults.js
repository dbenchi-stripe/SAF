import { useContext } from "react";
import _ from "lodash";
import Typography from "@mui/material/Typography";

import { CapabilityAssessmentContext } from "../../CapabilityAssessment";
import { WorkshopPhases } from "../../../assets/WorkshopPhases";
import "./SAFArchitectureResults.css";
import { DeliveryGuideContext } from "../../../DeliveryGuide/DeliveryGuide";

export const SAFArchitectureResults = ({ className, global }) => {
  const {
    capacities,
    printLocalSAFArchitectureResultsRef,
    printGlobalSAFArchitectureResultsRef,
  } = useContext(CapabilityAssessmentContext);

  const { finalCapacities } = useContext(DeliveryGuideContext);

  const capacitiesToBeUsed = capacities || finalCapacities;

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
      <Typography variant="subtitle2" color="primary" align="left" width="12vw">
        {WorkshopPhases[workshopPhase]}:
      </Typography>
      <div className={getClassNames(workshopPhase)}>
        {capacitiesToBeUsed.map((capacity, index) => {
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
      <Typography variant="h5" color="primary" align="center" mb={2}>
        {global ? "Global SAF Results" : "Local SAF Results"}
      </Typography>
    </div>
  );
};
