'use client';

import React, { PropsWithChildren } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import BaseLayout from 'shared/layout/BaseLayout';
import { LayoutContextProvider } from 'shared/layout/LayoutContext';
import customTheme from 'shared/theme';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalStyles
          styles={(theme) => ({
            html: {
              fontSize: 'calc(10em / 16)', // IE do not understand percents correctly, so this is the fix
              minHeight: '100%',
              display: 'flex',
            },
            body: {
              color: theme.palette.common.black,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize,
              background: theme.palette.background.default,
              flexGrow: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              margin: 0,
            },
            a: {
              color: theme.palette.primary.main,
              fontSize: 'inherit',
              transition: theme.transitions.create('color'),
              textDecoration: 'none',
              '&._visited:visited': {
                color: theme.palette.primary.dark,
              },
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  color: theme.palette.primary.main,
                  textDecoration: 'underline',
                },
              },
              '&.secondary': {
                color: theme.palette.secondary[500],
                fontSize: 'inherit',
                transition: 'color .3s ease-out',
                textDecoration: 'underline',
                '&._visited:visited': {
                  color: theme.palette.secondary[400],
                },
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': {
                    color: theme.palette.secondary.light,
                  },
                },
              },
              '&.warning': {
                color: theme.palette.error.dark,
                fontSize: 'inherit',
                transition: 'color .3s ease-out',
                textDecoration: 'none',
                '&:visited': {
                  color: '#7F0000',
                },
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': {
                    textDecoration: 'underline',
                    color: theme.palette.error.dark,
                  },
                },
              },
            },
          })}
        />
        <LayoutContextProvider>
          <BaseLayout>
            {children}
          </BaseLayout>
        </LayoutContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
