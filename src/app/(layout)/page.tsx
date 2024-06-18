import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Footer from 'shared/layout/Footer';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
        outline: '1px solid red',
      }}
    >
      {/* to do */}
      {/*  map one of each variant to see them */}
      <Typography variant="hSmallBold">hSmallBold</Typography>
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
      <Box sx={{ mb: 2 }} />
      <Footer />
    </Box>
  );
}
