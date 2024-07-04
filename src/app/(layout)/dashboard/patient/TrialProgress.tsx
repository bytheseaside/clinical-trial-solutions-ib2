'use client';

import React, { useMemo } from 'react';

import AdjustIcon from '@mui/icons-material/Adjust';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Container from 'shared/layout/Container';

type Props = {
  steps: { title: string; status: 'toDo' | 'inProgress' | 'done' }[];
  sx?: SxProps<Theme>;
};

const TrialProgress: React.FC<Props> = ({ steps, sx = [] }) => (
  <Container
    component="header"
    sx={[
      {

      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    content...
  </Container>
);

export default TrialProgress;
