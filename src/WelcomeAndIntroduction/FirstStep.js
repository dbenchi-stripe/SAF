import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";

export const FirstStep = () => (
  <List>
    <ListSubheader color="primary">Welcome & Introduction</ListSubheader>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What is your name?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="Where are you based in?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What is your role?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What is your expectation for today?" />
    </ListItem>
  </List>
);
