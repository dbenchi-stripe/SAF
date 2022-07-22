import { useContext } from "react";

import { CapabilityAssessment } from "../CapacityAssessment/CapabilityAssessment";
import { useFeature } from "flagged";
import { WelcomeAndIntroduction } from "../WelcomeAndIntroduction/WelcomeAndIntroduction";
import { DeliveryGuideContext } from "./DeliveryGuide";
import { ProjectOutcomesAndSuccessCriteria } from "../ProjectOutcomesAndSuccessCriteria/ProjectOutcomesAndSuccessCriteria";

export const ActualStep = () => {
  const { activeStep } = useContext(DeliveryGuideContext);
  const hasDeliveryGuide = useFeature("deliveryGuide");

  if (!hasDeliveryGuide) {
    return <CapabilityAssessment />;
  }

  switch (activeStep) {
    case 0:
      return <WelcomeAndIntroduction />;
    case 1:
      return <CapabilityAssessment />;
    case 2:
      return <ProjectOutcomesAndSuccessCriteria />;
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
