import { useState, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { Routes, Route } from "react-router-dom";
import { Introduction } from "../Introduction/Introduction";
import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer/Drawer";
import { ActualStep, DeliveryGuide } from "./DeliveryGuide/DeliveryGuide";
import { isDevMode } from "../CapacityAssessment/utils";

const mdTheme = createTheme();

export const DashboardContext = createContext({
  activeStep: null,
  setActiveStep: null,
});

export const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <DashboardContext.Provider
      value={{
        activeStep,
        setActiveStep,
      }}
    >
      <ThemeProvider theme={mdTheme}>
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
            {isDevMode() && (
              <Paper
                variant="outlined"
                sx={{ px: 2, m: 1, display: "flex", flexDirection: "column" }}
              >
                <DeliveryGuide />
              </Paper>
            )}
            <Paper
              sx={{ p: 2, m: 1, display: "flex", flexDirection: "column" }}
            >
              <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/saf" element={<ActualStep />} />
              </Routes>
            </Paper>
          </Box>
        </Box>
      </ThemeProvider>
    </DashboardContext.Provider>
  );
};
