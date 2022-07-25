import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

export const FirstStep = () => (
  <List>
    <ListSubheader color="primary">
      High Level Roadmap & Execution Plan
    </ListSubheader>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What are the High Level Roadmap & Execution Plan?" />
    </ListItem>
  </List>
);
