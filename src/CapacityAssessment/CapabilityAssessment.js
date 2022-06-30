import React, { useCallback, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import { questions } from "./questions";
import { answers } from "./answers";
import { average } from "./utils";

function CapabilityAssessment() {
  // Properties
  const [showResults, setShowResults] = useState(true);
  const [done, setDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [getAreaPng, { ref }] = useCurrentPng();
  const handleAreaDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "capapility-assessment.png");
    }
  }, [getAreaPng]);
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
  ];
  const [capacities, setCapacities] = useState(initialCapacities);

  // Helper Functions

  const setCapacityAssessment = (workshopPhase, value) => {
    const newCapacities = capacities.map((capacity) => {
      if (capacity.subject === workshopPhase) {
        const newResult = [...capacity.results, value];
        console.log(capacity, newResult);
        return {
          subject: workshopPhase,
          results: newResult,
          score: average(newResult),
        };
      }

      return capacity;
    });

    setCapacities(newCapacities);
  };

  /* A possible answer was clicked */
  const answerClicked = (workshopPhase, value) => {
    // Increment the score
    console.log({ workshopPhase, value });
    setCapacityAssessment(workshopPhase, value);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setDone(true);
    }
  };

  /* Resets the game back to default */
  const restartCapacityAssessment = () => {
    setCurrentQuestion(0);
    setShowResults(true);
    setCapacities(initialCapacities);
  };

  const toggleShowResult = () => {
    setShowResults((showResults) => !showResults);
  };

  return (
    <div className="container">
      <h1 className="title">SAF Capability Assessment</h1>
      {showResults && (
        <div style={{ width: "100%", height: done ? 700 : 300 }}>
          <ResponsiveContainer>
            <RadarChart
              ref={ref}
              cx="50%"
              cy="50%"
              outerRadius="90%"
              data={capacities}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis
                angle={90 - 360 / initialCapacities.length}
                domain={[0, 100]}
              />
              <Radar
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
      {!done && (
        <div>
          <div className="question-card">
            <div className="questionCount">
              Question <span> {currentQuestion + 1}</span> of{" "}
              <span>{questions.length}</span>
            </div>
            {/* Current Question  */}
            <h2 className="question">{questions[currentQuestion].question}</h2>
            <h3 className="question-text">
              {questions[currentQuestion].ratingDefinition}
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
                        questions[currentQuestion].workshopPhase,
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
        </div>
      )}
      {done ? (
        <div className="buttonContainer">
          <button onClick={() => handleAreaDownload()}>Download</button>
        </div>
      ) : (
        <div className="buttonContainer">
          <button onClick={() => restartCapacityAssessment()}>
            Restart Capacity Assessment
          </button>
          <button onClick={() => toggleShowResult()}>
            {showResults ? "Hide Results" : "Show Results"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CapabilityAssessment;
