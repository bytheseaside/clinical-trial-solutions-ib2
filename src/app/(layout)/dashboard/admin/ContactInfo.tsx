import React from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  trials: ClinicalTrial[];
  sx?: SxProps<Theme>;
};

const ContactInfo: React.FC<Props> = ({ trials, sx = [] }) => (
  <Container
    sx={{

      ...(Array.isArray(sx) ? sx : [sx]),
    }}
  >
    <Typography
      color="text.primary"
      sx={{
        typography: { xxs: 'h4', sm: 'h3' },
        mb: 3,
      }}
    >
      Clinical trial contact information
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
      Add here the contact information for the clinical trial for the users to reach out
      in an emergency situation.
    </Typography>
    <Box>
      <Typography variant="h1">Assign Appointments</Typography>
    </Box>
  </Container>
);

export default ContactInfo;
