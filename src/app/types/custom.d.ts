// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommonColors, PaletteColor, SimplePaletteColorOptions, TypeText } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CommonColors {
    transparent: string;
  }

  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface TypeText {
    contrast: string;
  }
}
