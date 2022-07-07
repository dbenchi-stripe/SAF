import React from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import _ from "lodash";
import "handsontable/dist/handsontable.full.css";

registerAllModules();

export const AllAnswersTable = ({ allAnswers }) => {
  const columns = Object.keys(allAnswers[0]).map((key) => _.startCase(key));

  return (
    <HotTable
      data={allAnswers}
      colHeaders={columns}
      rowHeaders={true}
      width="100%"
      height="40vh"
      readOnly
      manualColumnResize
      colWidths={200}
      licenseKey="non-commercial-and-evaluation"
    />
  );
};
