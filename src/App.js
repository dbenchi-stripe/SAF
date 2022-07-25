import { useBeforeunload } from "react-beforeunload";

import packageJson from "../package.json";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Dashboard } from "./Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { Introduction } from "./Introduction/Introduction";

function App() {
  useBeforeunload((event) => event.preventDefault());

  console.log("You are using the version number: ", packageJson.version);

  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/saf" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
