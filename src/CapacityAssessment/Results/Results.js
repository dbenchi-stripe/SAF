import React, { useContext, useCallback, useMemo } from "react";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import Fab from "@mui/material/Fab";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { CapabilityAssessmentContext } from "../CapabilityAssessment";
import { SAFArchitecture } from "../SAFArchitecture/SAFArchitecture";
import { SAFArchitectureResults } from "../../charts/SAFArchitectureResults/SAFArchitectureResults";
import { AllAnswersTable } from "./AllAnswersTable/AllAnswersTable";
import { handleDownloadCsv } from "./utils/handleDownloadCsv";
import { handleDownloadDiv } from "./utils/handleDownloadDiv";

import "./Results.css";
import { SAFRadar } from "../../charts/SAFRadar/SAFRadar";
import { GlobalConfigurationContext } from "../GlobalConfiguration/GlobalConfiguration";

/*
 * the recharts-to-png is internally based on html2canavas
 * all html2canavas configuration is supported: https://html2canvas.hertzen.com/configuration
 */
const html2CanavsConfiguration = { scale: 5 };

export const Results = () => {
  const {
    capacities,
    answeredQuestions,
    questions,
    done,
    printLocalSAFArchitectureResultsRef,
    printGlobalSAFArchitectureResultsRef,
  } = useContext(CapabilityAssessmentContext);
  const { allowGlobalResults } = useContext(GlobalConfigurationContext);

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

  const allAnswers = questions.map((question, index) => {
    if (answeredQuestions[index]) {
      return {
        ...question,
        answerText: answeredQuestions[index].text,
        answerValue: answeredQuestions[index].value,
        answerTextGlobal: answeredQuestions[index].text_global,
        answerValueGlobal: answeredQuestions[index].value_global,
        note: answeredQuestions[index].note,
        whyRedAmberGreen: answeredQuestions[index].whyRedAmberGreen,
      };
    }

    return question;
  });

  const handleAreaDownload = useCallback(async () => {
    handleDownloadDiv(
      printLocalSAFArchitectureResultsRef,
      "saf-stripes-local",
      html2CanavsConfiguration
    );
    if (allowGlobalResults) {
      handleDownloadDiv(
        printGlobalSAFArchitectureResultsRef,
        "saf-stripes-global",
        html2CanavsConfiguration
      );
    }
    handleDownloadCsv(allAnswers);

    for await (const { getPng, title } of getPngs) {
      let png = await getPng();
      if (png) {
        FileSaver.saveAs(png, title);
      }
    }
  }, [
    getPngs,
    printLocalSAFArchitectureResultsRef,
    printGlobalSAFArchitectureResultsRef,
    allowGlobalResults,
    allAnswers,
  ]);

  return (
    <div>
      <div className="result-container">
        <div className="parent">
          <SAFRadar
            ref={ref_total}
            data={capacities}
            dataKey="workshopPhase"
            name="Overall view"
            className="div1"
            allowGlobalResults={allowGlobalResults}
          />
          {capacities.map((capacity, index) => (
            <SAFRadar
              key={index}
              ref={refs[index]}
              data={capacity.titles}
              dataKey="workshopPhase"
              name={capacity.workshopPhase}
              className={"div" + (index + 2)}
              allowGlobalResults={allowGlobalResults}
            />
          ))}
        </div>
        {!done && <SAFArchitecture />}
      </div>
      {done && (
        <>
          <SAFArchitectureResults
            capacities={capacities}
            printLocalSAFArchitectureResultsRef={
              printLocalSAFArchitectureResultsRef
            }
            printGlobalSAFArchitectureResultsRef={
              printGlobalSAFArchitectureResultsRef
            }
          />
          {allowGlobalResults && (
            <SAFArchitectureResults
              global
              capacities={capacities}
              printLocalSAFArchitectureResultsRef={
                printLocalSAFArchitectureResultsRef
              }
              printGlobalSAFArchitectureResultsRef={
                printGlobalSAFArchitectureResultsRef
              }
            />
          )}
          <AllAnswersTable allAnswers={allAnswers} height="auto" />
          <Fab
            size="large"
            variant="extended"
            color="primary"
            onClick={() => handleAreaDownload()}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              top: "auto",
              left: "auto",
              margin: 0,
            }}
          >
            <FileDownloadIcon />
            Download All
          </Fab>
        </>
      )}
    </div>
  );
};
