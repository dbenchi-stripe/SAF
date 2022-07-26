import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { isDevMode } from "helper/utils";
import { useBeforeunload } from "react-beforeunload";
import { Route, Routes } from "react-router-dom";

import packageJson from "../package.json";
import { Dashboard } from "./Dashboard/Dashboard";
import { Introduction } from "./Introduction/Introduction";
import { CapabilityAssessment } from "./StripeAdoptionFramework/CapacityAssessment/CapabilityAssessment";

function App() {
  useBeforeunload((event) => event.preventDefault());

  console.log("You are using the version number: ", packageJson.version);

  if (isDevMode()) {
    return (
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/saf" element={<Dashboard />} />
      </Routes>
    );
  } else {
    return <CapabilityAssessment />;
  }
}

export default App;
