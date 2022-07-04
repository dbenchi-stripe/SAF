import { questions } from "../assets/questions";
const requiredKeys = ["question", "workshopPhase"];
const acceptedWorkshopDefinations = [
  "Business",
  "People & Governance",
  "Risk, Regulatory and Compliance",
  "Technology",
  "Operations",
];

export const getInvalideQuestions = () => {
  const invalideQuestions = questions.reduce((result, question, index) => {
    if (
      !requiredKeys.every((requiredKey) =>
        Object.keys(question).includes(requiredKey)
      )
    ) {
      return [...result, question];
    }

    if (
      !acceptedWorkshopDefinations.some(
        (acceptedWorkshopDefination) =>
          question.workshopPhase === acceptedWorkshopDefination
      )
    ) {
      return [...result, question];
    }

    return result;
  }, []);

  return invalideQuestions;
};
