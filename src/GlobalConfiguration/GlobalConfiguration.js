import { useFeature } from "flagged";
import { createContext, useState } from "react";

export const GlobalConfigurationContext = createContext({
  allowGlobalResults: null,
  toggleAllowGlobalResults: null,
});

export const GlobalConfiguration = ({ children }) => {
  const [allowGlobalResults, setAllowGlobalResults] = useState(
    useFeature("allowGlobalResults")
  );

  const toggleAllowGlobalResults = () => {
    setAllowGlobalResults((allowGlobalResults) => !allowGlobalResults);
  };

  return (
    <GlobalConfigurationContext.Provider
      value={{
        allowGlobalResults,
        toggleAllowGlobalResults,
      }}
    >
      {children}
    </GlobalConfigurationContext.Provider>
  );
};
