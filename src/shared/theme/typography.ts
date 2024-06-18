import { ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles';
import { Roboto, Inter } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const removeValue = undefined;
const fontFamily = removeValue;
const letterSpacing = removeValue;
const interFontFamily = `${inter.style.fontFamily}, ${roboto.style.fontFamily}, Helvetica, Arial, sans-serif`;
const robotoFontFamily = `${roboto.style.fontFamily}, Helvetica, Arial, sans-serif`;

export {
  interFontFamily as fontFamily,
  robotoFontFamily,
};

export const typographySchema: Partial<TypographyVariantsOptions> = {
  fontFamily: robotoFontFamily,
  htmlFontSize: 10,
  fontSize: 18,
  hBig: {
    fontFamily: interFontFamily,
    fontSize: '4rem',
    lineHeight: '56px',
    fontWeight: 600,
    letterSpacing: 'normal',
  },
  hMid: {
    fontFamily: interFontFamily,
    letterSpacing,
    fontSize: '2.4rem',
    lineHeight: '32px',
    fontWeight: 600,
  },
  hSmall: {
    fontFamily: interFontFamily,
    fontSize: '2rem',
    lineHeight: '32px',
    fontWeight: 600,
    letterSpacing: 'normal',
  },
  lead: {
    fontFamily,
    fontSize: '2rem',
    lineHeight: '32px',
    fontWeight: 400,
  },
  body1: {
    fontFamily,
    fontSize: '1.8rem',
    lineHeight: '28px',
    fontWeight: 400,
    letterSpacing: 'normal',
  },
  body2: {
    fontFamily,
    fontSize: '1.6rem',
    lineHeight: '24px',
    fontWeight: 400,
    letterSpacing: 'normal',
  },
  body3: {
    fontFamily,
    fontSize: '1.4rem',
    lineHeight: '24px',
    fontWeight: 400,
  },
  small: {
    fontFamily,
    fontSize: '1.2rem',
    lineHeight: '16px',
    fontWeight: 400,
  },
  caption: {
    fontFamily,
    fontSize: '1.4rem',
    lineHeight: '24px',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  captionSmall: {
    fontFamily,
    fontSize: '1.2rem',
    lineHeight: '20px',
    fontWeight: 400,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  overline: { fontFamily },
  subtitle1: { fontFamily },
  subtitle2: { fontFamily },
  button: { fontFamily },
};

export const inheritTypographySchema: Partial<TypographyVariantsOptions> = {
  hBigBold: {
    ...typographySchema.hBig,
    fontWeight: 700,
  },
  hMidBold: {
    ...typographySchema.hMid,
    fontWeight: 700,
  },
  hSmallBold: {
    ...typographySchema.hSmall,
    fontWeight: 700,
  },
  captionBold: {
    ...typographySchema.caption,
    fontWeight: 700,
  },
};

const TYPOGRAPHY = <ThemeOptions>{
  typography: {
    ...typographySchema,
    ...inheritTypographySchema,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          hBigBold: 'h3',
          hMidBold: 'h5',
          hSmallBold: 'h6',
          hSmall: 'h6',
          hMid: 'h5',
          hBig: 'h3',
        },
      },
    },
  },
};

export default TYPOGRAPHY;
