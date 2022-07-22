import { useContext } from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import saf from "../assets/SAFArchitecture.svg";
import { DeliveryGuideContext } from "../DeliveryGuide/DeliveryGuide";

const FirstPart = () => (
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

const SecondPart = () => (
  <List>
    <ListSubheader color="primary">Why are we here today?</ListSubheader>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What is the project about?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What happened so far?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What are the goals?" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <CircleSharpIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary="What are the success criteria for a big celebration party?" />
    </ListItem>
  </List>
);

const MainQuestion = () => (
  <List>
    <ListSubheader color="primary">
      What are your questions, challenges, concerns or blockers?
    </ListSubheader>
  </List>
);

const SAF = () => (
  <>
    <List>
      <ListSubheader color="primary">Stripe Adoption Framework</ListSubheader>
      <ListItem>
        <ListItemText primary="A holistic approach for digital transformation using Stripe financial services infrastructure" />
      </ListItem>
    </List>
    <img alt="SAF Architecture" src={saf} />
  </>
);
export const WelcomeAndIntroduction = () => {
  const { activeNestedStep } = useContext(DeliveryGuideContext);

  switch (activeNestedStep) {
    case 0:
      return <FirstPart />;
    case 1:
      return <SecondPart />;
    case 2:
      return <MainQuestion />;
    case 3:
      return <SAF />;
    default:
      throw new Error("Unknown step");
  }
};
