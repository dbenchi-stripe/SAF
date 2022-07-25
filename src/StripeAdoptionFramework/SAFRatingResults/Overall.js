import _ from "lodash";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import { useContext } from "react";
import { DeliveryGuideContext } from "DeliveryGuide/DeliveryGuide";
import { GlobalConfigurationContext } from "GlobalConfiguration/GlobalConfiguration";
import { SAFRadar } from "charts/SAFRadar/SAFRadar";
import { Box } from "@mui/system";

export const Overall = () => {
  const { finalCapacities } = useContext(DeliveryGuideContext);
  const { allowGlobalResults } = useContext(GlobalConfigurationContext);

  return (
    <>
      <List>
        <ListSubheader color="primary">
          SAF Rating Results: Overall
        </ListSubheader>
        {_.isEmpty(finalCapacities) ? (
          <ListItem>
            <ListItemIcon>
              <CircleSharpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Stripe Adoption Framework Rating Results: Overall Radar Results" />
          </ListItem>
        ) : (
          <Box
            width="85vw"
            height="50vh"
            justifyContent="center"
            display="flex"
          >
            <SAFRadar
              data={finalCapacities}
              dataKey="workshopPhase"
              name="Overall view"
              allowGlobalResults={allowGlobalResults}
            />
          </Box>
        )}
      </List>
    </>
  );
};
