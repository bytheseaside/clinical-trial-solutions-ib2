'use client';

import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BrandLogo from 'shared/layout/BrandLogo';
import Container from 'shared/layout/Container';

type Props = {
  clinicName: string;
  sx?: SxProps<Theme>;
};

const AdminHead: React.FC<Props> = ({ clinicName, sx = [] }) => (
  <Container
    component="header"
    sx={{
      py: 2,
      borderBottom: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...(Array.isArray(sx) ? sx : [sx]),
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        textAlign: 'left',
      }}
    >
      <BrandLogo />
      <Box
        sx={{
          display: { xxs: 'none', xs: 'flex' },
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            typography: { xxs: 'hSmall', sm: 'hMid' },
            textTransform: 'uppercase',
            color: 'text.primary',
          }}
          component="h2"
        >
          {clinicName}
        </Typography>
      </Box>
    </Box>
    <Button variant="contained" color="primary" href="/api/auth/logout">
      <LogoutIcon sx={{ fontSize: '1.5rem', color: 'common.white', mr: 1 }} />
      <Typography variant="captionSmall" sx={{ display: { xxs: 'none', xs: 'block' } }}>
        Logout
      </Typography>
    </Button>
  </Container>
);

export default AdminHead;
