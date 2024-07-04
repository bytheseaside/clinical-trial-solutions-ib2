import React from 'react';

import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import BrandLogo from 'shared/layout/BrandLogo';
import Container from 'shared/layout/Container';

export default async function Home() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { sm: 'row' },
        justifyContent: { xxs: 'center', sm: 'space-around' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mt: 7,
          display: { xxs: 'none', sm: 'block' },
          width: { sm: '50%', md: 600 },
          aspectRatio: 900 / 1080,
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '20%',
            background: { sm: 'linear-gradient(to bottom, transparent, #f0f0f0)' },
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            width: '20%',
            zIndex: 1,
            height: '100%',
            background: { sm: 'linear-gradient(to left, transparent, #f0f0f0)' },
          },
        }}
      >
        <Box
          component={Image}
          src="/images/backgrounds/home.png"
          alt="Clinical Trial Solutions"
          fill
          sizes="100vw"
          sx={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: { xxs: 4, sm: 0 },
          textAlign: 'center',
        }}
      >
        <BrandLogo
          sx={{
            width: { xxs: 200, sm: 150 },
            height: { xxs: 185, sm: 120 },
            mb: { xxs: 2, sm: 4 },
          }}
        />
        <Typography
          variant="hMidBold"
          component="h1"
          color="text.primary"
          sx={{ mb: 2 }}
        >
          Clinical trial solutions
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          href="/api/auth/login?returnTo=/dashboard"
          sx={{
            width: { xxs: '100%', sm: 343 },
            mx: 4,
            color: 'common.white',
            ':hover': { color: 'common.white' },
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <LoginIcon sx={{ color: 'inherit', fontSize: 20 }} />
          Log in or sign in
        </Button>
      </Box>
    </Container>
  );
}
