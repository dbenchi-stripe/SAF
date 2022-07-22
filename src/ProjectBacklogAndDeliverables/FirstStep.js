import _ from "lodash";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Feature, useFeature } from "flagged";
import { DeliveryGuideContext } from "../DeliveryGuide/DeliveryGuide";
import { SAFArchitectureResults } from "../CapacityAssessment/Results/SAFArchitectureResults/SAFArchitectureResults";

export const FirstStep = () => {
  const { finalCapacities } = useContext(DeliveryGuideContext);
  const [allowGlobalResults, setAllowGlobalResults] = useState(
    useFeature("allowGlobalResults")
  );

  const toggleAllowGlobalResults = () => {
    setAllowGlobalResults((allowGlobalResults) => !allowGlobalResults);
  };
  return (
    <>
      <List>
        <ListSubheader color="primary">SAF Rating Results</ListSubheader>
        {_.isEmpty(finalCapacities) ? (
          <ListItem>
            <ListItemIcon>
              <CircleSharpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="What are the Project Backlog & Deliverables?" />
          </ListItem>
        ) : (
          <>
            <SAFArchitectureResults />
            {allowGlobalResults && <SAFArchitectureResults global />}
          </>
        )}
      </List>
      <Stack spacing={2} direction="row" justifyContent="center" marginTop={2}>
        <Feature name="allowGlobalResults">
          <Button
            variant="contained"
            onClick={() => toggleAllowGlobalResults()}
          >
            {allowGlobalResults ? "Hide Global Results" : "Show Global Results"}
          </Button>
        </Feature>
      </Stack>
    </>
  );
};
