'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type NumericData = {
  group: string;
  value: number | 'NC';
};

type Props = {
  data: NumericData[];
  title: string;
  colors: string[];
};

const NumericChart: React.FC<Props> = ({ data, title, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [counterNonCompleted, setCounterNonCompleted] = useState<number>(0);

  useEffect(() => {
    const dataPerGroup: Record<string, { sum: number; count: number }> = {};
    let nonCompletedCount = 0;

    data.forEach((item) => {
      if (item.value === 'NC' || item.value == null) {
        nonCompletedCount += 1;
      } else {
        // Convert value to a number if it's a string
        const numericValue = typeof item.value === 'string' ? parseFloat(item.value) : item.value;

        if (!dataPerGroup[item.group]) {
          dataPerGroup[item.group] = { sum: 0, count: 0 };
        }
        dataPerGroup[item.group].sum += numericValue;
        dataPerGroup[item.group].count += 1;
      }
    });

    setCounterNonCompleted(nonCompletedCount);

    const traceData: PlotData[] = Object.entries(dataPerGroup)
      .map(([group, { sum, count }], index) => ({
        x: [group],
        y: [count > 0 ? sum / count : 0.1], // Usar 0.1 para altura mínima
        name: group,
        type: 'bar',
        marker: {
          color: colors[index % colors.length],
          // Handle case where there are more groups than colors
          opacity: 0.7,
        },
      }));

    const allGroups = new Set(data.map((item) => item.group));
    allGroups.forEach((group) => {
      if (!dataPerGroup[group]) {
        traceData.push({
          x: [group],
          y: [0.1], // Small bar height
          name: group,
          type: 'bar',
          marker: {
            color: colors[traceData.length % colors.length],
            opacity: 0.7,
          },
        });
      }
    });

    setTrace(traceData);
  }, [data, colors]);

  const layout: Partial<PlotLayout> = {
    title: {
      text: title,
      font: { size: 16 },
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.05,
    xaxis: {
      title: 'Groups',
    },
    yaxis: {
      title: 'Average Value',
    },
  };

  return (isUpSm ? (
    <>
      <Box
        component={Plot}
        data={trace}
        layout={layout as PlotLayout}
      />
      <Typography
        sx={{
          color: 'text.secondary',
        }}
      >
        The chart was made only considering the participants of the trial that have a value
        loaded for the mentioned variable. There are
        {' '}
        {counterNonCompleted}
        {' '}
        participants with missing values out of
        {' '}
        {data.length}
        {' '}
        total participants (
        {((counterNonCompleted / data.length) * 100).toFixed(2)}
        %).
      </Typography>
    </>
  ) : null
  );
};

export default NumericChart;
