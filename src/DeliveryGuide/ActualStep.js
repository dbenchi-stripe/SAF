import { useContext } from "react";

import { CapabilityAssessment } from "../CapacityAssessment/CapabilityAssessment";
import { useFeature } from "flagged";
import { WelcomeAndIntroduction } from "../WelcomeAndIntroduction/WelcomeAndIntroduction";
import { DeliveryGuideContext } from "./DeliveryGuide";
import { ProjectOutcomesAndSuccessCriteria } from "../ProjectOutcomesAndSuccessCriteria/ProjectOutcomesAndSuccessCriteria";
import { NextStepsAndFeedback } from "../NextStepsAndFeedback/NextStepsAndFeedback";
import { HighLevelRoadmapAndExecutionPlan } from "../HighLevelRoadmapAndExecutionPlan/HighLevelRoadmapAndExecutionPlan";
import { ProjectBacklogAndDeliverables } from "../ProjectBacklogAndDeliverables/ProjectBacklogAndDeliverables";

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
      return <ProjectBacklogAndDeliverables />;
    case 4:
      return <HighLevelRoadmapAndExecutionPlan />;
    case 5:
      return <NextStepsAndFeedback />;
    default:
      throw new Error("Unknown step");
  }
};
