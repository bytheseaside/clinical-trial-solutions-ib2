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
        if (!dataPerGroup[item.group]) {
          dataPerGroup[item.group] = { sum: 0, count: 0 };
        }
        dataPerGroup[item.group].sum += item.value;
        dataPerGroup[item.group].count += 1;
      }
    });

    setCounterNonCompleted(nonCompletedCount);

    const traceData = Object.entries(dataPerGroup).map(([group, { sum, count }], index) => ({
      x: [group],
      y: [count > 0 ? sum / count : 0], // Average value per group
      name: group,
      type: 'bar',
      marker: {
        color: colors[index],
        opacity: 0.7,
      },
    }));

    setTrace(traceData as PlotData[]);
  }, [data, colors]);

  const layout = {
    title,
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.05,
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
        patients with an
        empty field of
        {' '}
        {data.length}
        {' '}
        participants total (
        {((counterNonCompleted / data.length) * 100).toFixed(2)}
        %).
      </Typography>
    </>
  ) : null
  );
};

export default NumericChart;
