import { DeliveryGuideContext } from "DeliveryGuide/DeliveryGuide";
import { useContext } from "react";

import { CapabilityAssessment } from "./CapacityAssessment/CapabilityAssessment";
import { Overall } from "./SAFRatingResults/Overall";
import { SAFRatingResultsBuilder } from "./SAFRatingResults/SAFRatingResultsBuilder";
import { StripesLocalAndGlobal } from "./SAFRatingResults/StripesLocalAndGlobal";

export const StripeAdoptionFramework = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <CapabilityAssessment />;
    case 1:
      return <Overall />;
    case 2:
      return <SAFRatingResultsBuilder workshopPhase="Business" />;
    case 3:
      return (
        <SAFRatingResultsBuilder workshopPhase="Risk, Regulatory and Compliance" />
      );
    case 4:
      return <SAFRatingResultsBuilder workshopPhase="Technology" />;
    case 5:
      return <SAFRatingResultsBuilder workshopPhase="People & Governance" />;
    case 6:
      return <SAFRatingResultsBuilder workshopPhase="Operations" />;
    case 7:
      return <StripesLocalAndGlobal />;
    default:
      throw new Error("Unknown step");
  }
};
