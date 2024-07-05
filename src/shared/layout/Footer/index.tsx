import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import BrandLogo from '../BrandLogo';
import Container from '../Container';

type Props = {
  sx?: React.CSSProperties;
};

const Footer: React.FC<Props> = ({ sx }) => (
  <Box
    sx={{
      borderTop: '1px solid',
      borderColor: 'grey.400', // Adjust border color as needed
    }}
  >
    <Container
      component="footer"
      sx={{
        py: 3,
        color: 'text.secondary', // Adjust text color as needed
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        ...sx, // Allow custom styles to override defaults
      }}
    >
      <BrandLogo sx={{ width: 32, height: 30 }} />
      {' '}
      {/* Keep the BrandLogo sizes */}
      <Typography variant="caption" display="block" color="text.secondary">
        Clinical Trial Solutions
      </Typography>
    </Container>
  </Box>
);

export default Footer;
