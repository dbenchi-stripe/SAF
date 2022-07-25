import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import { Link } from "react-router-dom";
import { Divider, ListItem, ListSubheader, Switch } from "@mui/material";
import { useContext } from "react";
import { GlobalConfigurationContext } from "GlobalConfiguration/GlobalConfiguration";
import { Feature } from "flagged";
import TopicIcon from "@mui/icons-material/Topic";

export const MainListItems = () => {
  const { allowGlobalResults, toggleAllowGlobalResults } = useContext(
    GlobalConfigurationContext
  );

  return (
    <>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </ListItemButton>
      <ListItemButton component={Link} to="/saf">
        <ListItemIcon>
          <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="SAF Assessments" />
      </ListItemButton>
      <Divider sx={{ my: 1 }} />
      <ListSubheader component="div" inset>
        Global Configurations
      </ListSubheader>
      <Feature name="allowGlobalResults">
        <ListItem>
          <ListItemIcon>
            <TopicIcon />
          </ListItemIcon>
          <ListItemText
            id="switch-list-label-global"
            primary="Global Results"
          />
          <Switch
            edge="end"
            onChange={() => toggleAllowGlobalResults()}
            checked={allowGlobalResults}
            inputProps={{
              "aria-labelledby": "switch-list-label-global",
            }}
          />
        </ListItem>
      </Feature>
    </>
  );
};
