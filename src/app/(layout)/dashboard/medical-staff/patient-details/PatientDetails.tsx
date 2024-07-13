'use client';

import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

import Container from 'shared/layout/Container';
import { useLayoutContext } from 'shared/layout/LayoutContext';

type Props = {

  sx?: SxProps<Theme>;
};

const PatientDetails: React.FC<Props> = ({ sx = [] }) => {
  const { addSection, removeSection } = useLayoutContext();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    addSection('PatientDetails', formRef);
    return () => removeSection('PatientDetails');
  }, [addSection, removeSection]);

  return (
    <Container
      component="header"
      ref={formRef}
      sx={{
        mt: -10,
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <Box
        component={Link}
        sx={{ typography: 'caption', mb: 10, display: 'block' }}
        href="/dashboard/medical-staff"
      >
        Go back to today&apos;s appointments
      </Box>
      PATIENT DETAILS
    </Container>
  );
};

export default PatientDetails;
