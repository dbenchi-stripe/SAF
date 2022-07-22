import { useContext } from "react";
import { DeliveryGuideContext } from "../DeliveryGuide/DeliveryGuide";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { MainQuestion } from "./MainQuestion";
import { SAF } from "./SAF";

export const WelcomeAndIntroduction = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <FirstStep />;
    case 1:
      return <SecondStep />;
    case 2:
      return <MainQuestion />;
    case 3:
      return <SAF />;
    default:
      throw new Error("Unknown step");
  }
};
