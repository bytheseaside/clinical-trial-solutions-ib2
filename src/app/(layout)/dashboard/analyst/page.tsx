import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Container from 'shared/layout/Container';

import AnalystHead from './AnalystHead';
import SecondaryEffectsReport from './SecondaryEffecstReport';
import SecondaryEffectChart, { Data } from './SecondaryEffectChart';

async function AnalystDashboard() {
  const colors = ([
    '#CCABD8', // azul
    '#ff7f0e', // naranja
    '#D0E6A5', // verde
    '#d62728', // rojo
    '#9467bd', // morado
    '#8c564b', // marron
    '#e377c2', // rosa
    '#7f7f7f', // gris
    '#bcbd22', // amarillo
    '#17becf', // celeste
    '#aec7e8', // azul claro
    '#ffbb78', // naranja claro
    '#98df8a', // verde claro
    '#86E3C3', // rojo claro
    '#c5b0d5', // morado claro
    '#c49c94', // marron claro
    '#f7b6d2', // rosa claro
    '#c7c7c7', // gris claro
    '#dbdb8d', // amarillo claro
    '#9edae5', // celeste claro
  ]);

  const mockEffectsData = [
    {
      title: 'Effect 1',
      data: [
        { group: 'Group 1', value: 10 },
        { group: 'Group 2', value: 15 },
        { group: 'Group 3', value: 7 },
        { group: 'Group 1', value: 12 },
        { group: 'Group 2', value: 18 },
        { group: 'Group 3', value: 9 },
      ],
    },
    {
      title: 'Effect 2',
      data: [
        { group: 'Group 1', value: 20 },
        { group: 'Group 2', value: 25 },
        { group: 'Group 3', value: 12 },
        { group: 'Group 1', value: 22 },
        { group: 'Group 2', value: 28 },
        { group: 'Group 3', value: 15 },
      ],
    },
    {
      title: 'Effect 3',
      data: [
        { group: 'Group 1', value: 5 },
        { group: 'Group 2', value: 8 },
        { group: 'Group 3', value: 4 },
        { group: 'Group 1', value: 6 },
        { group: 'Group 2', value: 10 },
        { group: 'Group 3', value: 5 },
      ],
    },
  ];

  return (
    <>
      <AnalystHead
        name="BRISA ROJAS"
      />
      <SecondaryEffectsReport
        effectsData={mockEffectsData}
        colors={colors}
      />
    </>
  );
}

export default withPageAuthRequired(AnalystDashboard, { returnTo: '/dashboard' });
