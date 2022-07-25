import React, { forwardRef } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const localColor = "#5469D4";
const globalColor = "#d45454";

export const SAFRadar = forwardRef(
  ({ data, dataKey, name, className, allowGlobalResults = false }, ref) => {
    return (
      <ResponsiveContainer className={className}>
        <RadarChart ref={ref} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={dataKey} />
          <PolarRadiusAxis angle={90 - 360 / data?.length} domain={[0, 100]} />
          <Radar
            dataKey="value"
            stroke={localColor}
            fill={localColor}
            fillOpacity={0.6}
            name={`${name}${allowGlobalResults ? ": local" : ""}`}
          />
          {allowGlobalResults && (
            <Radar
              dataKey="value_global"
              stroke={globalColor}
              fill={globalColor}
              fillOpacity={0.6}
              name={name + ": global"}
            />
          )}
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
);
