import React from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Container from 'shared/layout/Container';

import BooleanChart, { BooleanData } from './BooleanChart';
import NumericChart, { NumericData } from './NumericChart';

export type AssessmentData = {
  type: 'threshold' | 'boolean' | 'numeric';
  data: (BooleanData | NumericData)[];
  title: string;
};

type Props = {
  assesmentsData: AssessmentData[];
  colors: string[];
  sx?: SxProps<Theme>;
};

const AssesmentsResultsReport: React.FC<Props> = ({ assesmentsData, colors, sx = [] }) => (
  <Container
    sx={[
      {
        display: { xxs: 'none', sm: 'block' },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Typography
      color="text.primary"
      sx={{
        typography: { xxs: 'h4', sm: 'h3' },
        mb: 3,
      }}
    >
      Study assesments results
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
      Below, all the results of the assesments are displayed per group
      (if relevant), per study, and per assesment.
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {assesmentsData.map((data) => {
        if (data.type === 'threshold') {
          return (
            <NumericChart
              key={data.title}
              title={data.title}
              data={data.data as NumericData[]}
              colors={colors}
            />
          );
        }
        if (data.type === 'boolean') {
          return (
            <BooleanChart
              key={data.title}
              title={data.title}
              data={data.data as BooleanData[]}
              colors={colors}
            />
          );
        }
        if (data.type === 'numeric') {
          return (
            <NumericChart
              key={data.title}
              title={data.title}
              data={data.data as NumericData[]}
              colors={colors}
            />
          );
        }
        return null;
      })}
    </Box>
  </Container>
);

export default AssesmentsResultsReport;
