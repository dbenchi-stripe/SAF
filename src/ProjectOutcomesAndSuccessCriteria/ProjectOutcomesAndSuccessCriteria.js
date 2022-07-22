import { useContext } from "react";
import { DeliveryGuideContext } from "../DeliveryGuide/DeliveryGuide";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";

export const ProjectOutcomesAndSuccessCriteria = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <FirstStep />;
    case 1:
      return <SecondStep />;
    default:
      throw new Error("Unknown step");
  }
};
