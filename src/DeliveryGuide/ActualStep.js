import { HighLevelRoadmapAndExecutionPlan } from "HighLevelRoadmapAndExecutionPlan/HighLevelRoadmapAndExecutionPlan";
import { NextStepsAndFeedback } from "NextStepsAndFeedback/NextStepsAndFeedback";
import { ProjectBacklogAndDeliverables } from "ProjectBacklogAndDeliverables/ProjectBacklogAndDeliverables";
import { ProjectOutcomesAndSuccessCriteria } from "ProjectOutcomesAndSuccessCriteria/ProjectOutcomesAndSuccessCriteria";
import { StripeAdoptionFramework } from "StripeAdoptionFramework/StripeAdoptionFramework";
import { WelcomeAndIntroduction } from "WelcomeAndIntroduction/WelcomeAndIntroduction";
import { useContext } from "react";

import { DeliveryGuideContext } from "./DeliveryGuide";

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
