import React from 'react';

import { getSession } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default async function Home() {
  const session = await getSession();

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
      {session?.user?.nickname ? `${session.user.nickname} is logged in` : 'Welcome stranger, please log in'}
      {/*   login button */}
      { !session?.idToken && (
        <a href="/login">
          <Typography
            component="span"
            variant="hSmallBold"
          >
            * LOGIN *
          </Typography>
        </a>
      )}
      {/*  logout */}

      {session?.idToken && (
        <a href="/logout">
          <Typography
            component="span"
            variant="hSmallBold"
          >
            - LOGOUT -
          </Typography>
        </a>
      )}
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

      {/*  show stringified user */}
      <Box>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </Box>
    </Box>
  );
}
