import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { Typography } from "@mui/material";

export const SecondStep = () => (
  <List>
    <ListSubheader color="primary">
      Project Outcomes & Success Criteria
    </ListSubheader>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What are the desired project outcomes?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What are the success criteria for a big celebration party?" />
    </ListItem>
    <Typography align="left" p={2}>
      In 6 months, we will successfully have...
    </Typography>
  </List>
);
