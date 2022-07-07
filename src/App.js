import { Routes, Route } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";

import { Introduction } from "./Introduction/Introduction";
import CapabilityAssessment from "./CapacityAssessment/CapabilityAssessment";

import "./App.css";

function App() {
  useBeforeunload((event) => event.preventDefault());
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/saf" element={<CapabilityAssessment />} />
    </Routes>
  );
}

export default App;
