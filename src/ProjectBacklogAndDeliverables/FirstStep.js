import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { DeliveryGuideContext } from "DeliveryGuide/DeliveryGuide";
import { GlobalConfigurationContext } from "GlobalConfiguration/GlobalConfiguration";
import { SAFArchitectureResults } from "charts/SAFArchitectureResults/SAFArchitectureResults";
import _ from "lodash";
import { useContext } from "react";

export const FirstStep = () => {
  const { finalCapacities } = useContext(DeliveryGuideContext);
  const { allowGlobalResults } = useContext(GlobalConfigurationContext);

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
            <SAFArchitectureResults capacities={finalCapacities} />
            {allowGlobalResults && (
              <SAFArchitectureResults global capacities={finalCapacities} />
            )}
          </>
        )}
      </List>
    </>
  );
};
