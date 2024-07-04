'use client';

import React, { Suspense } from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { Next13ProgressBar } from 'next13-progressbar';

import Footer from '../Footer';

export type Props = {
  children?: React.ReactNode;
  mainSx?: SxProps<Theme>;
};

const BaseLayout: React.FC<Props> = ({
  children,
  mainSx,
}) => (
  <>
    <Suspense fallback={null}>
      <Next13ProgressBar height="4px" color="#4eb6ac" options={{ showSpinner: false }} />
    </Suspense>
    <Box
      component="main"
      sx={[{ flexGrow: 1 }, ...(Array.isArray(mainSx) ? mainSx : [mainSx])]}
      aria-label="Content"
    >
      {children}
    </Box>
    <Footer sx={{ flexShrink: 0, boxSizing: 'border-box' }} />
  </>
);

export default BaseLayout;
