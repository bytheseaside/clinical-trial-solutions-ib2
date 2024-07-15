'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type Data = {
  group: string;
  value: number;
};

type Props = {
  data: Data[];
  title: string;
  colors: string[];
};

const SecondaryEffectChart: React.FC<Props> = ({ data, title, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);
  const isUpSm = useMediaQuery((theme:Theme) => theme.breakpoints.up('sm'));

  const getNumberOfGroups = () => {
    const groups = new Set(data.map((item) => item.group));
    return groups.size;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createTrace = (info: Data[], groupIndex: number) => ({
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
    const dataPerGroup: Record<string, Data[]> = {};
    data.forEach((item) => {
      if (!dataPerGroup[item.group]) {
        dataPerGroup[item.group] = [];
      }
      dataPerGroup[item.group].push(item);
    });

    const traceData = Object.values(dataPerGroup)
      .map((group, index) => createTrace(group, (getNumberOfGroups() - index)));
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
      <Box
        component={Plot}
        data={trace}
        layout={layout as PlotLayout}
      />
    )
  );
};

export default SecondaryEffectChart;
