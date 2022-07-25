import html2canvas from "html2canvas";

export const handleDownloadDiv = async (ref, name, configuration) => {
  const element = ref.current;
  const canvas = await html2canvas(element, configuration);

  const data = canvas.toDataURL("image/png");
  const link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = data;
    link.download = name + ".png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
};
