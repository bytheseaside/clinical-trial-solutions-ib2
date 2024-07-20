'use client';

import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { Data as PlotData, Layout as PlotLayout } from 'plotly.js';
import Plot from 'react-plotly.js';

export type Data = {
  symptom: string;
  value: number;
  group: string;
};

type Props = {
  data: Data[];
  colors: string[];
};

const TotalAmountChart: React.FC<Props> = ({ data, colors }) => {
  const [trace, setTrace] = useState<PlotData[]>([]);

  // Create traces for each group
  const createTrace = (group: string, symptomData: Data[], groupIndex: number): PlotData => ({
    x: symptomData.map((item) => item.symptom),
    y: symptomData.map((item) => item.value || 0.05), // default value for 0
    name: group,
    type: 'bar',
    marker: {
      color: colors[groupIndex],
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

    const traceData = Object.entries(dataPerGroup)
      .map(([group, symptomData], index) => createTrace(group, symptomData, index));
    setTrace(traceData as PlotData[]);
  }, [data, colors]);

  const layout: Partial<PlotLayout> = {
    title: 'Total count of reported symptoms',
    xaxis: {
      title: 'Symptoms',
      tickmode: 'linear',
    },
    yaxis: {
      title: 'Count',
    },
    barmode: 'group',
    bargap: 0.15,
    bargroupgap: 0.05,
  };

  return (
    <Box
      component={Plot}
      data={trace}
      layout={layout as PlotLayout}
    />
  );
};

export default TotalAmountChart;
