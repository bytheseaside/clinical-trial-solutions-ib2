'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type ThresholdData = {
  group: string;
  value: number | 'NC';
};

type Props = {
  data: ThresholdData[];
  title: string;
  colors: string[];
};

const ThresholdChart: React.FC<Props> = ({ data, title, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const [counterNonCompleted, setCounterNonCompleted] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createTrace = (info: ThresholdData[], groupIndex: number) => ({
    x: info.map((_, index) => index),
    y: info.map((item) => item.value || 0.05), // default value for 0
    name: info[0].group,
    type: 'bar',
    marker: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color: info.map((_, idx) => colors[groupIndex]),
      opacity: 0.7,
    },
  });

  useEffect(() => {
    const dataPerGroup: Record<string, ThresholdData[]> = {};
    let auxCounter = 0;
    data.forEach((item) => {
      if (item.value === 'NC') {
        auxCounter = +1;
      } else {
        if (!dataPerGroup[item.group]) {
          dataPerGroup[item.group] = [];
        }
        dataPerGroup[item.group].push(item);
      }
    });
    setCounterNonCompleted(auxCounter);

    const traceData = Object.values(dataPerGroup).map((group, index) => createTrace(group, index));
    setTrace(traceData as PlotData[]);
  }, []);

  const layout = {
    title,
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.05,
  };

  return (isUpSm
    && (
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
    )
  );
};

export default ThresholdChart;
