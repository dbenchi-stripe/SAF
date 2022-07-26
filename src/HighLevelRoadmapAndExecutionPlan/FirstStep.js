import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import FlagIcon from "@mui/icons-material/Flag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import moment from "moment";

const startingDate = moment();
const inOneMonth = moment(startingDate).add(1, "months").format("MMMM YYYY");
const inThreeMonths = moment(startingDate).add(3, "months").format("MMMM YYYY");
const inSixMonths = moment(startingDate).add(6, "months").format("MMMM YYYY");
const inOneYear = moment(startingDate).add(1, "years").format("YYYY");
const inTwoYears = moment(startingDate).add(2, "years").format("YYYY");

const BacklogItemList = ({ justifyContent, color }) => (
  <Box display="flex" justifyContent={justifyContent}>
    <List dense align="right">
      <ListItem sx={{ py: 0 }}>
        <ListItemIcon sx={{ minWidth: 22 }}>
          <CircleSharpIcon fontSize="1" color={color} />
        </ListItemIcon>
        <ListItemText
          primary="Backlog item"
          primaryTypographyProps={{
            color,
          }}
        />
      </ListItem>
      <ListItem sx={{ py: 0 }}>
        <ListItemIcon sx={{ minWidth: 22 }}>
          <CircleSharpIcon fontSize="1" color={color} />
        </ListItemIcon>
        <ListItemText
          primary="Backlog item"
          primaryTypographyProps={{
            color,
          }}
        />
      </ListItem>
    </List>
  </Box>
);
export const FirstStep = () => (
  <>
    <Typography variant="subtitle2" color="primary" mt={5}>
      High Level Roadmap & Execution Plan
    </Typography>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          <BacklogItemList justifyContent="flex-end" />
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FlagIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "error.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "50px", px: 2 }}>
          <Typography variant="h6" component="span">
            {inOneMonth}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          <BacklogItemList justifyContent="flex-start" color="error" />
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "error.main" }} />
          <TimelineDot color="error">
            <DirectionsRunIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "50px", px: 2 }}>
          <Typography variant="h6" component="span" color="error">
            {inThreeMonths} - {inSixMonths}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          <BacklogItemList justifyContent="flex-end" color="primary" />
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary" variant="outlined">
            <DirectionsWalkIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "50px", px: 2 }}>
          <Typography variant="h6" component="span" color="primary">
            {inOneYear}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          <BacklogItemList justifyContent="flex-start" color="secondary" />
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot color="secondary">
            <SportsScoreIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "50px", px: 2 }}>
          <Typography variant="h6" component="span" color="secondary">
            {inTwoYears} and later
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  </>
);
