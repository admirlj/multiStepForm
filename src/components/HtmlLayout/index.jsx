import { Box, Button } from "@mui/material";
import html2PDF from "jspdf-html2canvas";
import { useEffect, useRef, useState } from "react";
import { stepsConstant } from "../FormWrapper/constants";

export default function HtmlLayout() {
  const htmlNode = useRef();
  const [localData, setLocalData] = useState("");
  useEffect(() => {
    const local = stepsConstant.map((step) =>
      localStorage.getItem(step.name)
        ? JSON.parse(localStorage.getItem(step.name))
        : undefined
    );
    setLocalData(local);
  }, [setLocalData]);

  const handleExportPdf = async () => {
    await html2PDF(htmlNode.current, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      output: "./pdf/generate.pdf",
    });
  };
  console.log("localData",localData);
  return (
    <Box>
      <Box id={"layoutHtml"} ref={htmlNode}>
        {localData && <p>Name: { localData[0]['first-name']}</p>}
      </Box>
      <Box>
        <Button onClick={handleExportPdf}>Export (PDF)</Button>
      </Box>
    </Box>
  );
}
