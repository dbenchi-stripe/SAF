import DifferenceIcon from "@mui/icons-material/Difference";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import { DashboardContext } from "Dashboard/Dashboard";
import { prefillAnswers } from "assets/prefillAnswers";
import { useFeatures } from "flagged";
import { useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const FeatureFlagsListItems = () => {
  const { toggleFeature } = useContext(DashboardContext);
  // no unused vars should be disabled cause I only need to access second parameter
  const [_, setStorage] = useLocalStorageState("saf"); // eslint-disable-line no-unused-vars

  const features = useFeatures();

  return (
    <>
      <ListSubheader component="div" inset>
        Gated Features
      </ListSubheader>

      <ListItem>
        <ListItemIcon>
          <DifferenceIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-global" primary="Global Results" />
        <Switch
          edge="end"
          onChange={() => toggleFeature("allowGlobalResults")}
          checked={features.allowGlobalResults}
          inputProps={{
            "aria-labelledby": "switch-list-label-global",
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemButton
          sx={{ p: 0 }}
          onClick={() => setStorage(prefillAnswers)}
        >
          <ListItemIcon>
            <DriveFileRenameOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Pre-fill Answers" />
        </ListItemButton>
      </ListItem>
    </>
  );
};
