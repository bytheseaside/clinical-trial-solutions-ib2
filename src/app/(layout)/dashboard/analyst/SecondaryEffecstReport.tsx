import React from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Container from 'shared/layout/Container';

import TotalAmountChart, { Data } from './TotalAmountChart';

type Props = {
  effectsData: Data[];
  colors: string[];
  sx?: SxProps<Theme>;
};

const SecondaryEffectsReport: React.FC<Props> = ({ effectsData, colors, sx = [] }) => (
  <Container
    sx={[
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
      Reported Secondary Effects
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
      Below, all the secondary effects reported by the patients are displayed per
      group of patients if the clinical trial has more than one group.
      The graphs are interactive, so you can hover over the bars to see the exact values,
      filter per group, and download the desired view.
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >

      <TotalAmountChart
        data={effectsData}
        colors={colors}
      />
    </Box>
  </Container>
);

export default SecondaryEffectsReport;
