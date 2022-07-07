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

export const SAFRadar = forwardRef(
  ({ data, dataKey, name, className, angle }, ref) => {
    return (
      <ResponsiveContainer className={className}>
        <RadarChart ref={ref} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={dataKey} />
          <PolarRadiusAxis angle={90 - 360 / data?.length} domain={[0, 100]} />
          <Radar
            dataKey="score"
            stroke="#5469D4"
            fill="#8884d8"
            fillOpacity={0.6}
            name={name}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
);
