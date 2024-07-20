'use client';

import React, { forwardRef, PropsWithChildren } from 'react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  sx?: SxProps<Theme>;
  component?: React.ElementType;
  children?: React.ReactNode;
};

const Container = forwardRef<HTMLElement, PropsWithChildren<Props>>(
  ({ sx, children, component: Component = 'section', ...props }, ref) => (
    <Box
      component={Component}
      sx={[
        (theme) => ({
          boxSizing: 'border-box',
          width: '100%',
          minWidth: 320,
          maxWidth: 1800,
          margin: '0 auto',
          [theme.breakpoints.only('xxs')]: {
            px: 4,
          },
          [theme.breakpoints.only('xs')]: {
            px: 6,
          },
          [theme.breakpoints.only('sm')]: {
            px: 8,
          },
          [theme.breakpoints.only('md')]: {
            width: `calc(100% - ${theme.spacing(56)})`,
          },
          [theme.breakpoints.only('lg')]: {
            width: `calc(100% - ${theme.spacing(65)})`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
      {...props}
    >
      {children}
    </Box>
  ),
);

Container.displayName = 'Container';

export default Container;
