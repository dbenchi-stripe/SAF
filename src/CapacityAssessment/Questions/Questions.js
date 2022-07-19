import { useContext } from "react";
import Typography from "@mui/material/Typography";

import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { Answers } from "../Answers/Answers";
import { AllAnswersTable } from "../Results/AllAnswersTable/AllAnswersTable";
import "./Questions.css";

export const Questions = (
  { showMoreInformation } = { showMoreInformation: false }
) => {
  const { currentQuestion, questions } = useContext(
    CapabilityAssessmentContext
  );
  return (
    <div>
      <div className="question-card">
        <div className="question-wrapper">
          <Typography variant="subtitle2" p="1.5rem 2.5rem 0" color="primary">
            Question <span> {currentQuestion + 1}</span> of{" "}
            <span>{questions.length}</span>
          </Typography>
          <Typography
            variant="h5"
            p="0.5rem 2.5rem 1.5rem 2.5rem"
            m={0}
            color="primary"
          >
            {questions[currentQuestion].question}
          </Typography>
        </div>

        <Answers />
      </div>
      {showMoreInformation && (
        <div className="question-table">
          <AllAnswersTable
            height="auto"
            rowHeaders={currentQuestion + 1}
            allAnswers={[questions[currentQuestion]]}
          />
        </div>
      )}
    </div>
  );
};
