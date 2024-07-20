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
  colors: string[];
};

const BooleanChart: React.FC<Props> = ({ data, title, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalNC, setTotalNC] = useState(0);
  const isUpSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  useEffect(() => {
    const dataPerGroup: Record<string, { yes: number; no: number }> = {};
    let patientCount = 0;
    let ncCount = 0;

    data.forEach((item) => {
      if (item.value === 'NC' || item.value == null) {
        ncCount += 1;
      }
      patientCount += 1;

      if (!dataPerGroup[item.group]) {
        dataPerGroup[item.group] = { yes: 0, no: 0 };
      }

      if (item.value === 'NC' || item.value == null) {
        // Count NC separately
      } else {
        dataPerGroup[item.group][item.value ? 'yes' : 'no'] += 1;
      }
    });

    setTotalPatients(patientCount);
    setTotalNC(ncCount);

    const labels: string[] = [];
    const values: number[] = [];
    const colorArray: string[] = [];

    Object.entries(dataPerGroup).forEach(([group, counts], index) => {
      labels.push(`Yes-${group}`, `No-${group}`);
      values.push(counts.yes, counts.no);
      colorArray.push(colors[index * 2], colors[index * 2 + 1]);
    });

    labels.push('Not completed');
    values.push(ncCount);
    colorArray.push(colors[colors.length - 1]); // Last color for 'No Contesta'

    const traceData: PlotData = {
      labels,
      values,
      type: 'pie',
      marker: {
        colors: colorArray,
      },
      textinfo: 'label+percent',
      insidetextorientation: 'radial',
    };

    setTrace([traceData]);
  }, [data, colors]);

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

  const ncPercentage = ((totalNC / totalPatients) * 100).toFixed(2);

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
            mt: 2,
          }}
        >
          The chart displays the distribution of responses for each group.
          &apos;Yes&apos; and &apos;No&apos; are counted along with entries
          marked as &apos;Not completed&apos;.
          There are
          {' '}
          {totalNC}
          {' '}
          patients with an empty field out of
          {' '}
          {totalPatients}
          {' '}
          participants total (
          {ncPercentage}
          %).
        </Typography>
      </Box>
    ) : null
  );
};

export default BooleanChart;
