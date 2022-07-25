import { useState, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { FlagsProvider } from "flagged";

import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer/Drawer";
import { DeliveryGuide } from "../DeliveryGuide/DeliveryGuide";
import { GlobalConfiguration } from "GlobalConfiguration/GlobalConfiguration";
import { isDevMode } from "../helper/utils";

const mdTheme = createTheme();

export const DashboardContext = createContext({
  setFeatures: null,
});

export const Dashboard = () => {
  const [features, setFeatures] = useState({
    allowGlobalResults: isDevMode(),
  });
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <DashboardContext.Provider
      value={{
        toggleFeature: (feature) => {
          setFeatures({
            ...features,
            [feature]: !features[feature],
          });
        },
      }}
    >
      <FlagsProvider features={features}>
        <ThemeProvider theme={mdTheme}>
          <GlobalConfiguration>
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <AppBar open={open} toggleDrawer={toggleDrawer} />
              <Drawer open={open} toggleDrawer={toggleDrawer} />
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                <Toolbar />
                <DeliveryGuide />
              </Box>
            </Box>
          </GlobalConfiguration>
        </ThemeProvider>
      </FlagsProvider>
    </DashboardContext.Provider>
  );
};
