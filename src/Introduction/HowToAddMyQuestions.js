import Looks3RoundedIcon from "@mui/icons-material/Looks3Rounded";
import LooksOneRoundedIcon from "@mui/icons-material/LooksOneRounded";
import LooksTwoRoundedIcon from "@mui/icons-material/LooksTwoRounded";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

export const HowToAddMyQuestions = () => {
  return (
    <>
      <Typography variant="h6" color="primary" mt={5}>
        How can I add my own set of questions to this tool?
      </Typography>
      <Typography variant="body1">
        You can begin by making a copy of
        <Link
          href="https://docs.google.com/spreadsheets/d/16pSzo9eWDg0BJJ6w_o0cnS6a9EdOO1cigAL0JH7l8BI/copy"
          target="_blank"
          rel="noopener noreferrer"
          ml={1}
        >
          this google spreadsheet
        </Link>
        . Please copy the google spreadsheet along with the embedded
        <Typography component="span" sx={{ fontStyle: "italic", ml: 1 }}>
          Apps Script file
        </Typography>
        . Once done, you can start editing, adding, and deleting questions on
        your own Google spreadsheet.
      </Typography>
      <Typography variant="body1" mt={1}>
        To be able to import these questions into the tool, the following
        requirements must be fulfilled:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <LooksOneRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Columns cannot be renamed." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LooksTwoRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="All cells need to be populated." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks3RoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Each Workshop Phase may have up to 10 unique Titles" />
        </ListItem>
      </List>

      <Typography variant="body1" mt={1}>
        Once done, please feel free to:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <LooksOneRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <span>
                Share this spreadsheet with me:
                <Link ml={1}>dbenchi@stripe.com</Link>
              </span>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LooksTwoRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <span>
                Schedule a 30 mins session with me
                <Link mx={1}>dbenchi@stripe.com</Link>
                while giving me edit rights and add in the title
                <Typography component="span" sx={{ fontWeight: 600, ml: 1 }}>
                  [SAF] Question List Request
                </Typography>
              </span>
            }
          />
        </ListItem>
      </List>
    </>
  );
};
