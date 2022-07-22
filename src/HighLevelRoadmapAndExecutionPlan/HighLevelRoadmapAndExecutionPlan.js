import { useContext } from "react";
import { DeliveryGuideContext } from "../DeliveryGuide/DeliveryGuide";
import { FirstStep } from "./FirstStep";

export const HighLevelRoadmapAndExecutionPlan = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <FirstStep />;
    default:
      throw new Error("Unknown step");
  }
};
