import { parse } from "json2csv";

export const handleDownloadCsv = async (allAnswers) => {
  const link = document.createElement("a");
  const csv = parse(allAnswers, {
    quote: "",
    delimiter: "\t",
    eol: "\r\n",
    transforms: (item) => {
      return Object.entries(item).reduce((result, [key, value]) => {
        return {
          ...result,
          [key]: String(value)
            .replaceAll?.("\n", "\\n")
            .replaceAll("\r", "\\r"),
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
