'use client';

import React from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Page() {
  const { user, error, isLoading } = useUser();

  return (
    <Box
      sx={{
        m: 5,
        background: 'primary.light',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {user ? `${user?.nickname} is logged in` : 'Welcome stranger, please log in'}
      {/*  login button */}
      <a href="/api/auth/login">
        <Typography
          component="h3"
        >

          LOGIN
        </Typography>
      </a>
      {/*  logout */}
      <a href="/api/auth/logout">
        <Typography
          component="h3"
        >
          LOGOUT
        </Typography>
      </a>
      {/* <Typography
        variant="hSmallBold"
      >
        hSmallBold
      </Typography>
      <Box sx={{ mb: 2 }} />
      <Typography variant="hSmall">hSmall</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="hMidBold">hMidBold</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="hMid">hMid</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="hBigBold">hBigBold</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="hBig">hBig</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="lead">lead</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="small">small</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="captionSmall">captionSmall</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="body3">body3</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="body2">body2</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="body1">body1</Typography>
      <Box sx={{ mb: 2 }} />

      <Typography variant="captionBold">captionBold</Typography>
      <Box sx={{ mb: 2 }} /> */}
    </Box>
  );
}
