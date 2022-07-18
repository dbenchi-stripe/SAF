import { Routes, Route } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";

import packageJson from "../package.json";
import { Introduction } from "./Introduction/Introduction";
import CapabilityAssessment from "./CapacityAssessment/CapabilityAssessment";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

function App() {
  useBeforeunload((event) => event.preventDefault());

  console.log("You are using the version number: ", packageJson.version);

  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/saf" element={<CapabilityAssessment />} />
    </Routes>
  );
}

export default App;
