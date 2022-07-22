import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import saf from "../assets/SAFArchitecture.svg";
import { Box } from "@mui/material";

export const SAF = () => (
  <>
    <List>
      <ListSubheader color="primary">Stripe Adoption Framework</ListSubheader>
      <ListItem>
        <ListItemText primary="A holistic approach for digital transformation using Stripe financial services infrastructure" />
      </ListItem>
    </List>
    <Box display="flex" justifyContent="center">
      <img alt="SAF Architecture" src={saf} width="80%" />
    </Box>
  </>
);
