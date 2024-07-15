import React from 'react';

import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AnalystHead from './AnalystHead';
import AssesmentsResultsReport, { AssessmentData } from './AssesmentsResultsReport';
import SecondaryEffectsReport from './SecondaryEffecstReport';

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
  const mockAssesmentsData: AssessmentData[] = [
    {
      type: 'threshold',
      title: 'Assessment 1',
      data: [
        { group: 'Group A', value: 10 },
        { group: 'Group A', value: 'NC' }, // Asegurando que 'NC' sea del tipo 'NC'
        { group: 'Group A', value: 15 },
        { group: 'Group B', value: 20 },
        { group: 'Group B', value: 'NC' },
        { group: 'Group B', value: 18 },
        { group: 'Group C', value: 5 },
        { group: 'Group C', value: 7 },
      ],
    },
    {
      type: 'threshold',
      title: 'Assessment 2',
      data: [
        { group: 'Group A', value: 8 },
        { group: 'Group A', value: 12 },
        { group: 'Group B', value: 'NC' },
        { group: 'Group B', value: 25 },
        { group: 'Group C', value: 10 },
        { group: 'Group C', value: 'NC' },
        { group: 'Group C', value: 14 },
      ],
    },
    {
      type: 'threshold',
      title: 'Assessment 3',
      data: [
        { group: 'Group A', value: 'NC' },
        { group: 'Group A', value: 11 },
        { group: 'Group B', value: 22 },
        { group: 'Group B', value: 'NC' },
        { group: 'Group C', value: 9 },
        { group: 'Group C', value: 'NC' },
        { group: 'Group C', value: 13 },
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
      <AssesmentsResultsReport
        assesmentsData={mockAssesmentsData}
        colors={colors}
      />
    </>
  );
}

export default withPageAuthRequired(AnalystDashboard, { returnTo: '/dashboard' });
