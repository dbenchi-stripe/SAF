import React from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import _ from "lodash";
import "handsontable/dist/handsontable.full.css";

registerAllModules();

export const AllAnswersTable = ({ allAnswers, height, rowHeaders }) => {
  const columns = Object.keys(allAnswers[0]).map((key) => _.startCase(key));

  return (
    <HotTable
      data={allAnswers}
      colHeaders={columns}
      rowHeaders={rowHeaders || true}
      // width="100vw"
      colWidths={"150"}
      height={height || "50vh"}
      readOnly
      manualColumnResize
      autoColumnSize
      autoRowSize
      autoWrapRow
      autoWrapCol
      // stretchH="all"
      licenseKey="non-commercial-and-evaluation"
    />
  );
};
