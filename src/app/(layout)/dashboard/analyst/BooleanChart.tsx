'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type BooleanData = {
  group: string;
  value: boolean | 'NC';
};

type Props = {
  data: BooleanData[];
  title: string;
};

const BooleanChart: React.FC<Props> = ({ data, title }) => {
  const [percentages, setPercentages] = useState<{ yes: number; no: number; nonCompleted: number }>(
    { yes: 0, no: 0, nonCompleted: 0 },
  );
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    const lenYes = data.filter((item) => item.value === true).length;
    const lenNo = data.filter((item) => item.value === false).length;
    const lenNonCompleted = data.filter((item) => item.value === 'NC').length;

    setPercentages({
      yes: lenYes,
      no: lenNo,
      nonCompleted: lenNonCompleted,
    });
  }, [data]);

  const trace = [
    {
      values: [percentages.yes, percentages.no, percentages.nonCompleted],
      labels: ['Yes', 'No', 'Not completed yet'],
      type: 'pie',
      insidetextorientation: 'radial',
      textinfo: 'label+percent',
    },
  ];

  const layout = { title, xaxis: { tickangle: -45 } };

  return (
    isUpSm ? (
      <Box
        component={Plot}
        data={trace as PlotData[]}
        layout={layout as PlotLayout}
      />
    )
      : null
  );
};

export default BooleanChart;
