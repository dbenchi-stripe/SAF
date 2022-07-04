import React, { useContext, useCallback } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { SAFArchitecture } from "../SAFArchitecture/SAFArchitecture";
import "./Results.css";

export const Results = () => {
  const { initialCapacities, capacities, done } = useContext(
    CapabilityAssessmentContext
  );
  const [getTotalAreaPng, { ref: ref_total }] = useCurrentPng({ scale: 10 });
  const [getBusinessAreaPng, { ref: ref_business }] = useCurrentPng({
    scale: 10,
  });
  const [getPeopleAreaPng, { ref: ref_people }] = useCurrentPng({ scale: 10 });
  const [getRiskAreaPng, { ref: ref_risk }] = useCurrentPng({ scale: 10 });
  const [getTechAreaPng, { ref: ref_tech }] = useCurrentPng({ scale: 10 });
  const [getOperationAreaPng, { ref: ref_operation }] = useCurrentPng({
    scale: 10,
  });
  const refs = [ref_business, ref_people, ref_risk, ref_tech, ref_operation];
  const getPngs = [
    { getPng: getTotalAreaPng, title: "saf-total.png" },
    { getPng: getBusinessAreaPng, title: "saf-business.png" },
    { getPng: getPeopleAreaPng, title: "saf-people.png" },
    { getPng: getRiskAreaPng, title: "saf-risk.png" },
    { getPng: getTechAreaPng, title: "saf-tech.png" },
    { getPng: getOperationAreaPng, title: "saf-operation.png" },
  ];

  const handleAreaDownload = useCallback(async () => {
    for await (const { getPng, title } of getPngs) {
      let png = await getPng();
      if (png) {
        FileSaver.saveAs(png, title);
      }
    }
  }, [...getPngs]);

  return (
    <div>
      <div className="result-container">
        <div className="parent">
          <ResponsiveContainer className="div1">
            <RadarChart ref={ref_total} data={capacities}>
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
                name="Overall view"
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>

          {capacities.map((capacity, index) =>
            capacity.title?.length > 2 ? (
              <ResponsiveContainer
                // width={400 - numberOfCharts}
                // height="80%"
                className={"div" + (index + 2)}
              >
                <RadarChart ref={refs[index]} data={capacity.title}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis
                    angle={90 - 360 / capacity.title?.length}
                    domain={[0, 100]}
                  />
                  <Radar
                    dataKey="score"
                    stroke="#5469D4"
                    fill="#8884d8"
                    fillOpacity={0.6}
                    name={capacity.subject}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            ) : undefined
          )}
          <SAFArchitecture className="div7" />
        </div>
      </div>
      {done && (
        <div className="button-container">
          <button onClick={() => handleAreaDownload()}>Download All</button>
        </div>
      )}
    </div>
  );
};