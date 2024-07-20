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

const WrongPage: React.FC<Props> = ({ sx = [] }) => (
  <Container>
    <Box
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
      </Box>
      <Button variant="contained" color="primary" href="/api/auth/logout">
        <LogoutIcon sx={{ fontSize: '1.5rem', color: 'common.white', mr: 1 }} />
        <Typography variant="captionSmall" sx={{ display: { xxs: 'none', xs: 'block' } }}>
          Logout
        </Typography>
      </Button>
    </Box>
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <Typography
        color="secondary.dark"
        component="h1"
        sx={{ typography: { xxs: 'h2', sm: 'h1' }, mb: 2 }}
      >
        Wrong page !
      </Typography>
      <Typography variant="caption" color="text.secondary">
        You&apos;re not supposed to be here.
        {' '}
        <br />
        Please
        {' '}
        <a
          href="/dashboard"
        >
          go back to the main dashboard.
        </a>
      </Typography>
    </Box>
  </Container>
);

export default WrongPage;
