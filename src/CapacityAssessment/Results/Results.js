import React, { useContext, useCallback } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import "./Results.css";

export const Results = () => {
  const { initialCapacities, capacities, done, currentQuestion, questions } =
    useContext(CapabilityAssessmentContext);
  const [getAreaPng, { ref }] = useCurrentPng();

  const handleAreaDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "capapility-assessment.png");
    }
  }, [getAreaPng]);

  const getClassNames = (className, workshopPhase) =>
    `saf-item ${className} ${
      questions[currentQuestion].workshopPhase === workshopPhase ? "active" : ""
    }`;

  return (
    <div>
      <div
        className="result-container"
        style={{ width: "100%", height: done ? 700 : 300 }}
      >
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
              stroke="#5469D4"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>

        <div className="saf">
          <div className={getClassNames("business", "Business")}>Business</div>
          <div className={getClassNames("people", "People & Governance")}>
            People & Governance
          </div>
          <div className={getClassNames("tech", "Tech")}>
            Technology Platform
          </div>
          <div className={getClassNames("risk", "Risk & Reg")}>
            Risk, Regulatory & Compliance
          </div>
          <div className={getClassNames("operation", "Operations")}>
            Operations Readiness
          </div>
        </div>
      </div>
      {done && (
        <div className="button-container">
          <button onClick={() => handleAreaDownload()}>Download</button>
        </div>
      )}
    </div>
  );
};
