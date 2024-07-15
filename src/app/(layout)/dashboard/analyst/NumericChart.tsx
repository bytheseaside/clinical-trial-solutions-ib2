'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type NumericData = {
  group: string;
  value: number;
};

type Props = {
  data: NumericData[];
  title: string;
  colors: string[];
};

const NumericChart: React.FC<Props> = ({ data, title, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  // Function to create a trace for each group
  const createTrace = (groupData: NumericData[], groupName: string, color: string) => ({
    x: groupData.map((_, index) => index), // Use index as x-axis value
    y: groupData.map((item) => item.value), // Use actual value as y-axis value
    name: groupName,
    mode: 'lines+markers', // Line chart with markers
    marker: {
      color,
      size: 10,
    },
    line: {
      color,
      width: 2,
    },
    opacity: 0.7,
  });

  useEffect(() => {
    // Organize data by group
    const groupedData: Record<string, NumericData[]> = {};
    data.forEach((item) => {
      if (!groupedData[item.group]) {
        groupedData[item.group] = [];
      }
      groupedData[item.group].push(item);
    });

    // Create traces for each group
    const traceData = Object.keys(groupedData).map((group, index) =>
      createTrace(groupedData[group], group, colors[index % colors.length]));

    setTrace(traceData as PlotData[]);
  }, [data, colors]);

  const layout: PlotLayout = {
    title,
    xaxis: {
      title: 'Index',
    },
    yaxis: {
      title: 'Value',
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.05,
  };

  return isUpSm ? (
    <Box
      component={Plot}
      data={trace}
      layout={layout}
    />
  ) : null;
};

export default NumericChart;
