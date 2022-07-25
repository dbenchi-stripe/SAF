import Paper from "@mui/material/Paper";
import { createContext, useState } from "react";

import { ActualStep } from "./ActualStep";
import { DeliveryGuideStepper } from "./DeliveryGuideStepper";

export const DeliveryGuideContext = createContext({
  stepsLabels: null,
  activeStep: null,
  activeNestedStep: null,
  handleNext: null,
  handleBack: null,
  hasBack: null,
  hasNext: null,
  finalCapacities: null,
  setFinalCapacities: null,
});

const steps = [
  { label: "Welcome & Introduction", nestedTotal: 4 },
  { label: "Stripe Adoption Framework", nestedTotal: 8 },
  { label: "Project Outcomes & Success Criteria", nestedTotal: 2 },
  { label: "Project Backlog & Deliverables", nestedTotal: 1 },
  { label: "High Level Roadmap & Execution Plan", nestedTotal: 1 },
  { label: "Next Steps & Feedback", nestedTotal: 1 },
];

export const DeliveryGuide = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeNestedStep, setActiveNestedStep] = useState(0);
  const [finalCapacities, setFinalCapacities] = useState({});
  const handleNext = () => {
    if (activeNestedStep + 1 < steps[activeStep].nestedTotal) {
      setActiveNestedStep(activeNestedStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setActiveNestedStep(0);
    }
  };

  const handleBack = () => {
    if (activeNestedStep > 0) {
      setActiveNestedStep(activeNestedStep - 1);
    } else {
      setActiveStep(activeStep - 1);
      setActiveNestedStep(steps[activeStep - 1].nestedTotal - 1);
    }
  };

  const hasNext = () =>
    activeStep < steps.length - 1 ||
    activeNestedStep < steps[activeStep].nestedTotal - 1;
  const hasBack = () => activeStep > 0 || activeNestedStep > 0;

  return (
    <DeliveryGuideContext.Provider
      value={{
        stepsLabels: steps.map((step) => step.label),
        activeStep,
        activeNestedStep,
        handleNext,
        handleBack,
        hasBack,
        hasNext,
        finalCapacities,
        setFinalCapacities,
      }}
    >
      <Paper
        variant="outlined"
        sx={{ px: 2, m: 1, display: "flex", flexDirection: "column" }}
      >
        <DeliveryGuideStepper />
      </Paper>
      <Paper sx={{ p: 2, m: 1, display: "flex", flexDirection: "column" }}>
        <ActualStep />
      </Paper>
    </DeliveryGuideContext.Provider>
  );
};
