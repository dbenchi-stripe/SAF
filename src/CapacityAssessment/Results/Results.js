import React, { useContext, useCallback, useMemo } from "react";
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
import html2canvas from "html2canvas";
import { parse } from "json2csv";
import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { SAFArchitecture } from "../SAFArchitecture/SAFArchitecture";
import "./Results.css";
import { SAFArchitectureResults } from "../SAFArchitectureResults/SAFArchitectureResults";

/*
 * the recharts-to-png is internally based on html2canavas
 * all html2canavas configuration is supported: https://html2canvas.hertzen.com/configuration
 */
const html2CanavsConfiguration = { scale: 5 };

export const Results = () => {
  const {
    initialCapacities,
    capacities,
    answeredQuestions,
    questions,
    done,
    printSAFArchitectureResultsRef,
  } = useContext(CapabilityAssessmentContext);
  const [getTotalAreaPng, { ref: ref_total }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const [getBusinessAreaPng, { ref: ref_business }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const [getPeopleAreaPng, { ref: ref_people }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const [getRiskAreaPng, { ref: ref_risk }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const [getTechAreaPng, { ref: ref_tech }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const [getOperationAreaPng, { ref: ref_operation }] = useCurrentPng(
    html2CanavsConfiguration
  );
  const refs = [ref_business, ref_people, ref_risk, ref_tech, ref_operation];
  const getPngs = useMemo(
    () => [
      { getPng: getTotalAreaPng, title: "saf-total.png" },
      { getPng: getBusinessAreaPng, title: "saf-business.png" },
      { getPng: getPeopleAreaPng, title: "saf-people.png" },
      { getPng: getRiskAreaPng, title: "saf-risk.png" },
      { getPng: getTechAreaPng, title: "saf-tech.png" },
      { getPng: getOperationAreaPng, title: "saf-operation.png" },
    ],
    [
      getTotalAreaPng,
      getBusinessAreaPng,
      getPeopleAreaPng,
      getRiskAreaPng,
      getTechAreaPng,
      getOperationAreaPng,
    ]
  );

  const allResults = questions.map((question, index) => {
    if (answeredQuestions[index]) {
      return {
        ...question,
        answerText: answeredQuestions[index].text,
        answerValue: answeredQuestions[index].value,
        note: answeredQuestions[index].note,
      };
    }

    return question;
  });

  const handleAreaDownload = useCallback(async () => {
    const handleDownloadImage = async () => {
      const element = printSAFArchitectureResultsRef.current;
      const canvas = await html2canvas(element, html2CanavsConfiguration);

      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      if (typeof link.download === "string") {
        link.href = data;
        link.download = "saf-stripes.png";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    };

    const handleDownloadCsv = async () => {
      const link = document.createElement("a");
      const csv = parse(allResults, {
        quote: "",
        delimiter: "\t",
        eol: "\r\n",
        transforms: (item) => {
          return Object.entries(item).reduce((result, [key, value]) => {
            return {
              ...result,
              [key]: String(value).replaceAll?.("\n", "\\n"),
            };
          }, {});
        },
      });

      link.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
      link.target = "_blank";
      link.download = "saf-csv.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    handleDownloadImage();
    handleDownloadCsv();

    for await (const { getPng, title } of getPngs) {
      let png = await getPng();
      if (png) {
        FileSaver.saveAs(png, title);
      }
    }
  }, [getPngs, printSAFArchitectureResultsRef, allResults]);

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

          {capacities.map((capacity, index) => (
            <ResponsiveContainer className={"div" + (index + 2)} key={index}>
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
          ))}
        </div>
        {!done && <SAFArchitecture />}
      </div>
      {done && <SAFArchitectureResults />}
      {done && (
        <div className="button-container">
          <button onClick={() => handleAreaDownload()}>Download All</button>
        </div>
      )}
    </div>
  );
};
