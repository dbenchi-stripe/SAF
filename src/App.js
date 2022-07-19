import { useBeforeunload } from "react-beforeunload";

import packageJson from "../package.json";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Dashboard } from "./Dashboard/Dashboard";

function App() {
  useBeforeunload((event) => event.preventDefault());

  console.log("You are using the version number: ", packageJson.version);

  return <Dashboard />;
}

export default App;
