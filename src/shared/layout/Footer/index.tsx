import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BrandLogo from '../BrandLogo';
import Container from '../Container';

type Props = {
  sx?: SxProps<Theme>;
};

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

const Footer: React.FC<Props> = ({ sx }) => (
  <Box
    sx={(theme) => ({
      borderTop: '1px solid',
      borderColor: theme.palette.secondary.dark,
      '-webkit-box-shadow': `${getRGBA(theme.palette.secondary.main, 0.4)} 0px -5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px -10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px -15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px -20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px -25px`,
      '-moz-box-shadow': `${getRGBA(theme.palette.secondary.main, 0.4)} 0px -5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px -10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px -15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px -20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px -25px`,
      boxShadow: `${getRGBA(theme.palette.secondary.main, 0.4)} 0px -5px, ${getRGBA(theme.palette.secondary.main, 0.3)} 0px -10px, ${getRGBA(theme.palette.secondary.main, 0.2)} 0px -15px, ${getRGBA(theme.palette.secondary.main, 0.1)} 0px -20px, ${getRGBA(theme.palette.secondary.main, 0.05)} 0px -25px`,
    })}
  >
    <Container
      component="footer"
      sx={[
        {
          py: 3,
          color: 'tertiary.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack direction="row" alignItems="center" gap={4}>
        <BrandLogo />
        <Typography variant="caption" display="block" color="tertiary.main">
          Clinical Trial Solutions
        </Typography>
      </Stack>
      <Typography variant="caption" color="secondary.dark" sx={{ justifySelf: 'flex-end' }}>
        ©
        {' '}
        {new Date().getFullYear()}
        {' '}
        - IB2
      </Typography>
    </Container>
  </Box>
);

export default Footer;
