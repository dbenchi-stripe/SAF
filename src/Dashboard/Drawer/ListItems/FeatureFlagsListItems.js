import { useContext } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import Switch from "@mui/material/Switch";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useFeatures } from "flagged";
import { DashboardContext } from "../../Dashboard";

export const FeatureFlagsListItems = () => {
  const { toggleFeature } = useContext(DashboardContext);
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
    </>
  );
};
