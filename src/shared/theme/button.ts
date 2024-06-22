import { ThemeOptions } from '@mui/material/styles';

import { fontFamily } from './typography';

export default <ThemeOptions> {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        color: 'primary',
      },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid #1A6EEB',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
          fontFamily,
          fontWeight: 500,
          textTransform: 'none',
          minWidth: '80px',
          minHeight: '32px',
          outline: 'none',
          color: theme.palette.common.white,
          letterSpacing: 0,
          padding: theme.spacing(0, 5),
          '& .MuiButton-startIcon svg, & .MuiButton-endIcon svg': {
            fontSize: '2.4rem',
          },
          transition: theme.transitions.create(['background-color', 'border-color', 'color']),
        }),
        containedPrimary: ({ theme }) => ({
          background: theme.palette.primary[500],
          '&:not(.Mui-disabled)': {
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                background: theme.palette.primary[600],
              },
            },
            '&:active': {
              background: theme.palette.primary[800],
            },
          },
          '&:hover': {
            color: theme.palette.common.white,
          },
          '&.Mui-disabled': {
            background: theme.palette.secondary[300],
            color: theme.palette.common.white,
          },
        }),
        outlined: {
          border: '1px solid',
        },
        outlinedPrimary: ({ theme }) => ({
          color: theme.palette.primary[500],
          background: theme.palette.common.white,
          borderColor: theme.palette.primary[500],
          '&:not(.Mui-disabled)': {
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                background: theme.palette.primary[100],
              },
            },
            '&:active': {
              borderColor: theme.palette.primary[700],
              color: theme.palette.primary[700],
            },
          },
          '&:hover': {
            color: theme.palette.primary[500],
          },
          '&.Mui-disabled': {
            background: theme.palette.secondary[300],
            color: theme.palette.secondary[400],
            borderColor: 'transparent',
          },
        }),
        textPrimary: ({ theme }) => ({
          background: theme.palette.common.white,
          color: theme.palette.primary[500],
          border: `1px solid ${theme.palette.common.white}`,
          '&:not(.Mui-disabled)': {
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                border: `1px solid ${theme.palette.primary[100]}`,
                background: theme.palette.primary[100],
              },
            },
            '&:active': {
              border: `1px solid ${theme.palette.primary[500]}`,
              color: theme.palette.primary[500],
            },
          },
          '&:hover': {
            color: theme.palette.primary[500],
          },
          '&.Mui-disabled': {
            background: theme.palette.secondary[300],
            color: theme.palette.secondary[400],
          },
        }),
        sizeSmall: ({ theme }) => ({
          ...theme.typography.body3,
          height: '40px',
          padding: theme.spacing(2, 4),
        }),
        sizeMedium: ({ theme }) => ({
          height: '48px',
          padding: theme.spacing(2, 4),
        }),
        sizeLarge: ({ theme }) => ({
          height: '56px',
          padding: theme.spacing(3, 6),
        }),
      },
    },
  },
};
