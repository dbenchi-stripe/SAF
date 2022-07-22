import { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StepLabel from "@mui/material/StepLabel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { DeliveryGuideContext } from "./DeliveryGuide";

export const DeliveryGuideStepper = () => {
  const { activeStep, handleNext, handleBack, stepsLabels, hasBack, hasNext } =
    useContext(DeliveryGuideContext);

  return (
    <Box margin={2} display="flex" justifyContent="center">
      <IconButton
        aria-label="back"
        color="primary"
        disabled={!hasBack()}
        onClick={handleBack}
      >
        <Tooltip title="Step Backward">
          <ArrowBackIosIcon />
        </Tooltip>
      </IconButton>

      <Stepper
        activeStep={activeStep}
        sx={{ py: 3, mx: 1, flexGrow: 1 }}
        alternativeLabel={true}
      >
        {stepsLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <IconButton
        aria-label="next"
        color="primary"
        disabled={!hasNext()}
        onClick={handleNext}
      >
        <Tooltip title="Step Forward">
          <ArrowForwardIosIcon />
        </Tooltip>
      </IconButton>
    </Box>
  );
};
