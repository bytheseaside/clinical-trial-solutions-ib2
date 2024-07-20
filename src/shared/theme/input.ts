import { ThemeOptions } from '@mui/material/styles';

export default <ThemeOptions> {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          '&.input-with-icon': {
            '& .MuiInputLabel-root': {
              ...theme.typography.body2,
              transform: 'translate(46px, 9px) scale(0.75)',
            },
            '& .MuiInputLabel-sizeSmall': {
              ...theme.typography.body3,
              fontSize: '15px',
              lineHeight: '19px',
              transform: 'translate(42px, 6px) scale(0.75)',
            },
            '& .MuiInputBase-root .MuiInputBase-input': {
              padding: theme.spacing(0, 2),
            },
            '& .MuiInputLabel-root + .MuiInputBase-root .MuiInputBase-input': {
              paddingTop: theme.spacing(5),
            },
            '& .MuiInputLabel-sizeSmall + .MuiInputBase-root .MuiInputBase-input': {
              paddingTop: theme.spacing(4),
            },
            '& .MuiInputBase-sizeSmall .MuiInputBase-input': {
              padding: theme.spacing(0, 1),
            },
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.lead,
          color: theme.palette.text.secondary,
          '& + .MuiInputBase-root .MuiInputBase-input': {
            padding: theme.spacing(4, 0, 0),
          },
          '&.MuiFormLabel-filled, &.Mui-focused': {
            ...theme.typography.body2,
            transform: 'translate(13px, 9px) scale(0.75)',
          },
          '&.Mui-focused': {
            color: theme.palette.text.secondary,
          },
          '&.Mui-error': {
            color: theme.palette.error[700],
          },
        }),
        sizeSmall: ({ theme }) => ({
          ...theme.typography.body3,
          transform: 'translate(14px, 12px) scale(1)',
          '& + .MuiInputBase-root .MuiInputBase-input': {
            padding: theme.spacing(2.5, 0, 0),
          },
          '&.MuiFormLabel-filled, &.Mui-focused': {
            fontSize: '15px',
            lineHeight: '19px',
            transform: 'translate(12px, 4px) scale(0.75)',
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.lead,
          width: '100%',
          border: 'none',
          height: '64px',
          background: theme.palette.common.white,
          padding: theme.spacing(2, 3),
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.07), 0px 1.20588px 3.61765px rgba(0, 0, 0, 0.0317), 0px 0.500862px 1.50259px rgba(0, 0, 0, 0.035), 0px 0.181152px 0.543456px rgba(0, 0, 0, 0.0083)',
          transition: theme.transitions.create('box-shadow'),
          '@media (hover: hover) and (pointer: fine)': {
            '&:not(.Mui-disabled):hover': {
              boxShadow: '0px 11px 27px rgba(0, 0, 0, 0.07), 0px 2.71324px 8px rgba(0, 0, 0, 0.05), 0px 1.12694px 2.75474px rgba(0, 0, 0, 0.05)',
            },
          },
          '&.MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
          '&.MuiInputBase-multiline': {
            height: 'unset',
            padding: theme.spacing(2, 3),
            '& .MuiInputBase-inputMultiline': {
              padding: theme.spacing(4, 0, 0),
            },
            '& + .MuiFormHelperText-root': {
              top: 'unset',
              bottom: -26,
              height: 24,
            },
          },
          '& .MuiSvgIcon-root': {
            width: '24px',
            height: '24px',
            color: theme.palette.text.secondary,
          },
          '& .MuiInputBase-input': {
            padding: 0,
            color: theme.palette.secondary[900],
            '&::placeholder': {
              color: theme.palette.text.secondary,
              opacity: 1,
            },
          },
          '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, &.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline, &.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
            height: '100%',
            top: 0,
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '&.MuiOutlinedInput-root.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.primary[500]}`,
              '&:hover': {
                border: `1px solid ${theme.palette.primary[500]}`,
              },
            },
            '& legend': {
              display: 'none',
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.dark,
            },
            '& .MuiInputBase-input': {
              caretColor: theme.palette.primary.dark,
            },
          },
          '&.Mui-error': {
            background: theme.palette.error[100],
            '& .MuiSvgIcon-root': {
              color: theme.palette.error[700],
            },
            '& .MuiInputBase-input': {
              color: theme.palette.error[700],
            },
            '&.Mui-focused': {
              '& .MuiInputBase-input': {
                caretColor: theme.palette.error[700],
              },
              '& .MuiSvgIcon-root': {
                color: theme.palette.error[700],
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            },
          },
          '&.Mui-disabled': {
            '& .MuiSvgIcon-root': {
              color: theme.palette.secondary[300],
            },
            '& .MuiInputBase-input.Mui-disabled': {
              textFillColor: 'unset',
              color: theme.palette.secondary[300],
              '&::placeholder': {
                color: theme.palette.secondary[300],
              },
            },
          },
        }),
        sizeSmall: ({ theme }) => ({
          ...theme.typography.body3,
          height: '48px',
          padding: theme.spacing(1, 3),
          '& .MuiInputBase-input': {
            padding: 0,
          },
          '&.MuiInputBase-adornedStart .MuiInputBase-input, &.MuiInputBase-adornedEnd .MuiInputBase-input': {
            padding: theme.spacing(0, 1),
          },
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body3,
          textTransform: 'unset',
          letterSpacing: 0,
          margin: theme.spacing(0.5, 1, 0),
          position: 'absolute',
          top: 64,
          display: 'flex',
          alignItems: 'center',
          '&.Mui-error': {
            color: theme.palette.error[700],
          },
          '& svg': {
            marginRight: theme.spacing(1),
            height: 16,
            width: 16,
          },
        }),
        sizeSmall: ({ theme }) => ({
          ...theme.typography.captionSmall,
          textTransform: 'unset',
          marginTop: 0,
          top: 48,
          alignItems: 'flex-start',
        }),
      },
    },
  },
};
