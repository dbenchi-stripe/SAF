import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import { Link } from "react-router-dom";

export const mainListItems = (
  <>
    {/* <ListSubheader component="div" inset>
      SAF Sections
    </ListSubheader> */}
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
      <ListItemText primary="Assessments" />
    </ListItemButton>
  </>
);
