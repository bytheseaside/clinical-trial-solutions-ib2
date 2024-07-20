'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
  const [trace, setTrace] = useState<PlotData[]>([]);
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    const dataPerGroup: Record<string, { yes: number; no: number; nonCompleted: number }> = {};

    data.forEach((item) => {
      if (item.value === 'NC' || item.value == null) {
        if (!dataPerGroup[item.group]) {
          dataPerGroup[item.group] = { yes: 0, no: 0, nonCompleted: 0 };
        }
        dataPerGroup[item.group].nonCompleted += 1;
      } else {
        if (!dataPerGroup[item.group]) {
          dataPerGroup[item.group] = { yes: 0, no: 0, nonCompleted: 0 };
        }
        dataPerGroup[item.group][item.value ? 'yes' : 'no'] += 1;
      }
    });

    const traceData = Object.entries(dataPerGroup).map(([group, counts]) => ({
      labels: ['Yes', 'No', 'Not completed'],
      values: [counts.yes, counts.no, counts.nonCompleted],
      type: 'pie',
      name: group,
      marker: {
        colors: ['#00C49F', '#FF8042', '#D0D0D0'], // Colors for Yes, No, and Not Completed
      },
      textinfo: 'label+percent',
      insidetextorientation: 'radial',
    }));

    setTrace(traceData as PlotData[]);
  }, [data]);

  const layout: Partial<PlotLayout> = {
    title: {
      text: title,
    },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
    },
    margin: {
      t: 40,
      b: 40,
      l: 40,
      r: 40,
    },
  };

  return (
    isUpSm ? (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box
          component={Plot}
          data={trace}
          layout={layout}
          sx={{
            width: '100%',
            maxWidth: 800,
          }}
        />
        <Typography
          sx={{
            color: 'text.secondary',
            textAlign: 'justify',
          }}
        >
          The chart displays the distribution of responses for each group.
          &apos;Yes&apos; and &apos;No&apos; are counted along with entries
          marked as &apos;Not Completed&apos;.
        </Typography>
      </Box>
    ) : null
  );
};

export default BooleanChart;
