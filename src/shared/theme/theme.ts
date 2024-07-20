import { createTheme } from '@mui/material/styles';

import BASE from './base';
import BUTTON from './button';
import INPUT from './input';
import PALETTE from './palette';
import TYPOGRAPHY from './typography';

export const THEME = createTheme(
  BASE,
  BUTTON,
  INPUT,
  PALETTE,
  TYPOGRAPHY,
);
