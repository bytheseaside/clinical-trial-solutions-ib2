import { ThemeOptions } from '@mui/material/styles';
import createSpacing from '@mui/system/createTheme/createSpacing';

const BASE: ThemeOptions = {
  spacing: createSpacing(4),
  breakpoints: {
    values: {
      xxs: 375,
      xs: 480,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 2560,
    },
  },
};

export default BASE;
