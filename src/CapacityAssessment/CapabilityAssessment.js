import React, { useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { questions } from "./questions";
import { answers } from "./answers";
import { average } from "./utils";

function CapabilityAssessment() {
  // Properties
  const [showResults, setShowResults] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const initialCapacities = [
    {
      subject: "Business",
      score: 0,
      results: [],
    },
    {
      subject: "People & Governance",
      score: 0,
      results: [],
    },
    {
      subject: "Risk & Reg",
      score: 0,
      results: [],
    },
    {
      subject: "Tech",
      score: 0,
      results: [],
    },
    {
      subject: "Operations",
      score: 0,
      results: [],
    },
    {
      subject: "Security",
      score: 0,
      results: [],
    },
  ];
  const [capacities, setCapacities] = useState(initialCapacities);

  // Helper Functions
  const setCapacityAssessment = (category, value) => {
    const newCapacities = capacities.map((capacity) => {
      if (capacity.subject === category) {
        const newResult = [...capacity.results, value];
        console.log(capacity, newResult);
        return {
          subject: category,
          results: newResult,
          score: average(newResult),
        };
      }

      return capacity;
    });

    setCapacities(newCapacities);
  };

  /* A possible answer was clicked */
  const answerClicked = (category, value) => {
    // Increment the score
    console.log({ category, value });
    setCapacityAssessment(category, value);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setCapacities(initialCapacities);
  };

  const toggleShowResult = () => {
    console.log(showResults);
    setShowResults((showResults) => !showResults);
  };

  return (
    <div className="container">
      <h1 className="title">SAF Capability Assessment</h1>
      {showResults && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={capacities}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
      <div className="question-card">
        <div className="questionCount">
          Question <span> {currentQuestion + 1}</span> of{" "}
          <span>{questions.length}</span>
        </div>
        {/* Current Question  */}
        <h2 className="question">{questions[currentQuestion].text}</h2>
        <h3 className="question-text">
          {questions[currentQuestion].defination}
        </h3>

        {/* List of possible answers  */}
        <ul className="answerOptions">
          {answers.map((answer) => {
            return (
              <li
                key={answer.id}
                className={`answerOption ${answer.text}`}
                onClick={() =>
                  answerClicked(
                    questions[currentQuestion].category,
                    answer.value
                  )
                }
              >
                {answer.text}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="buttonContainer">
        <button onClick={() => restartCapacityAssessment()}>
          Restart Capacity Assessment
        </button>
        <button onClick={() => toggleShowResult()}>
          {showResults ? "Hide Results" : "Show Results"}
        </button>
      </div>
    </div>
  );
}

export default CapabilityAssessment;
