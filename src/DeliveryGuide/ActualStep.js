import { useContext } from "react";

import { WelcomeAndIntroduction } from "../WelcomeAndIntroduction/WelcomeAndIntroduction";
import { DeliveryGuideContext } from "./DeliveryGuide";
import { ProjectOutcomesAndSuccessCriteria } from "../ProjectOutcomesAndSuccessCriteria/ProjectOutcomesAndSuccessCriteria";
import { NextStepsAndFeedback } from "../NextStepsAndFeedback/NextStepsAndFeedback";
import { HighLevelRoadmapAndExecutionPlan } from "../HighLevelRoadmapAndExecutionPlan/HighLevelRoadmapAndExecutionPlan";
import { ProjectBacklogAndDeliverables } from "../ProjectBacklogAndDeliverables/ProjectBacklogAndDeliverables";
import { StripeAdoptionFramework } from "StripeAdoptionFramework/StripeAdoptionFramework";

export const ActualStep = () => {
  const { activeStep } = useContext(DeliveryGuideContext);

  switch (activeStep) {
    case 0:
      return <WelcomeAndIntroduction />;
    case 1:
      return <StripeAdoptionFramework />;
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
