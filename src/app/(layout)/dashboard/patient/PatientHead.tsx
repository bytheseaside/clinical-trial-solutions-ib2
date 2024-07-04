'use client';

import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Container from 'shared/layout/Container';

// Helper function to convert hex to RGB
const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

// Function to generate RGBA values from a theme color and an opacity
const getRGBA = (hexColor: string, opacity: number): string => {
  const [r, g, b] = hexToRgb(hexColor);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

type Props = {
  name: string;
  dni: string;
  trialName: string;
  sx?: SxProps<Theme>;
};

const PatientHead: React.FC<Props> = ({ name, dni, trialName, sx = [] }) => (
  <Box
    sx={(theme) => ({
      position: 'relative',
      borderBottom: '1px solid',
      borderColor: theme.palette.secondary.dark,
      '-webkit-box-shadow': `${getRGBA(theme.palette.secondary.main, 0.4)} 0px 5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px 10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px 15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px 20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px 25px`,
      '-moz-box-shadow': `${getRGBA(theme.palette.secondary.main, 0.4)} 0px 5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px 10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px 15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px 20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px 25px`,
      boxShadow: `${getRGBA(theme.palette.secondary.main, 0.4)} 0px 5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px 10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px 15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px 20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px 25px`,
    })}
  >
    <Container
      component="header"
      sx={[
        {
          py: 2,
          top: 0,
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xxs: 'column', sm: 'row' },
          alignItems: { xxs: 'flex-start', sm: 'center' },
          gap: { xxs: 1, sm: 3 },
          textAlign: { xxs: 'center', sm: 'left' },
        }}
      >
        <Typography
          sx={{
            typography: { xxs: 'hSmall', sm: 'hMid' },
            textTransform: 'uppercase',
          }}
          component="h2"
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xxs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            color="text.secondary"
            variant="small"
            sx={{ display: { xxs: 'none', xs: 'block' } }}
          >
            DNI:
            {' '}
            {dni}
          </Typography>
          <Typography
            color="text.secondary"
            variant="small"
          >
            Trial:
            {' '}
            {trialName}
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" color="secondary" href="/api/auth/logout">
        <LogoutIcon sx={{ color: 'common.white' }} />
      </Button>
    </Container>
  </Box>
);

export default PatientHead;
