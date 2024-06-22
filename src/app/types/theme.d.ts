// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypographyVariantsOptions } from '@mui/material/styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    hSmallBold: TypographyStyleOptions;
    hSmall: TypographyStyleOptions;
    hMidBold: TypographyStyleOptions;
    hMid: TypographyStyleOptions;
    hBigBold: TypographyStyleOptions;
    hBig: TypographyStyleOptions;
    lead: TypographyStyleOptions;
    small: TypographyStyleOptions;
    captionSmall: TypographyStyleOptions;
    body3: TypographyStyleOptions;
    captionBold: TypographyStyleOptions;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariantsOptions {
    hSmallBold: TypographyStyleOptions;
    hSmall: TypographyStyleOptions;
    hMidBold: TypographyStyleOptions;
    hMid: TypographyStyleOptions;
    hBigBold: TypographyStyleOptions;
    hBig: TypographyStyleOptions;
    lead: TypographyStyleOptions;
    small: TypographyStyleOptions;
    captionSmall: TypographyStyleOptions;
    body3: TypographyStyleOptions;
    captionBold: TypographyStyleOptions;
  }

  // allow configuration using `createTheme`
  interface TypographyOptions {
    hSmallBold?: TypographyStyleOptions;
    hSmall?: TypographyStyleOptions;
    hMidBold?: TypographyStyleOptions;
    hMid?: TypographyStyleOptions;
    hBigBold?: TypographyStyleOptions;
    hBig?: TypographyStyleOptions;
    lead?: TypographyStyleOptions;
    small?: TypographyStyleOptions;
    captionSmall?: TypographyStyleOptions;
    body3?: TypographyStyleOptions;
    captionBold?: TypographyStyleOptions;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    hSmallBold: true;
    hSmall: true;
    hMidBold: true;
    hMid: true;
    hBigBold: true;
    hBig: true;
    lead: true;
    small: true;
    captionSmall: true;
    body3: true;
    captionBold: true;
  }
}
