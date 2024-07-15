import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BrandLogo from 'shared/layout/BrandLogo';
import Container from 'shared/layout/Container';

type Props = {
  sx?: SxProps<Theme>;
};

const PatientForm: React.FC<Props> = ({ sx = [] }) => (
  <Box
    sx={{
      ...(Array.isArray(sx) ? sx : [sx]),
    }}
  >
    DATAAJDSKBFJDSKA
  </Box>
);

export default PatientForm;
