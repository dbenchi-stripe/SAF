import { DeliveryGuideContext } from "DeliveryGuide/DeliveryGuide";
import { useContext } from "react";

import { FirstStep } from "./FirstStep";

export const NextStepsAndFeedback = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <FirstStep />;
    default:
      throw new Error("Unknown step");
  }
};
