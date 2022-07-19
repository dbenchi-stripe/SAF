import { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import StepLabel from "@mui/material/StepLabel";

import { CapabilityAssessment } from "../../CapacityAssessment/CapabilityAssessment";
import { DashboardContext } from "../Dashboard";
import { isDevMode } from "../../CapacityAssessment/utils";

const steps = [
  "Welcome & Introduction",
  "Stripe Adoption Framework",
  "Project Outcomes & Success Criteria",
  "Project Backlog & Deliverables",
  "High Level Roadmap & Execution Plan",
  "Next Steps & Feedback",
];

export const ActualStep = () => {
  const { activeStep } = useContext(DashboardContext);

  if (!isDevMode()) {
    return <CapabilityAssessment />;
  }

  switch (activeStep) {
    case 0:
      return (
        <>
          <h1>What is your name?</h1>
          <h1>Where are you based in?</h1>
          <h1>What is your role?</h1>
          <h1>What is your expectation for today?</h1>
        </>
      );
    case 1:
      return <CapabilityAssessment />;
    case 2:
      return (
        <>
          <h1>What are the desired project outcomes?</h1>
          <h1>What are the success criteria for a big celebration party?</h1>
        </>
      );
    case 3:
      return <h1> Project Backlog & Deliverables </h1>;
    case 4:
      return <h1> High Level Roadmap & Execution Plan </h1>;
    case 5:
      return <h1> Next Steps & Feedback </h1>;
    default:
      throw new Error("Unknown step");
  }
};

export const StepChanger = () => {
  const { activeStep, setActiveStep } = useContext(DashboardContext);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      {activeStep !== 0 && (
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      )}

      {activeStep < steps.length - 1 && (
        <Button variant="contained" onClick={handleNext} sx={{ mx: 3 }}>
          Next
        </Button>
      )}
    </Box>
  );
};

export const DeliveryGuide = () => {
  const { activeStep } = useContext(DashboardContext);
  return (
    <Stepper activeStep={activeStep} sx={{ py: 3, mx: 2 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
