'use client';

import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ClinicalStudyKeyVariable, ClinicalTrial } from 'shared/api';
import Container from 'shared/layout/Container';

type Props = {
  sx?: SxProps<Theme>;
};

const BASE_TRIAL = {
  id: '',
  name: '',
  studies: [],
  groups: [],
  knownPossibleSecondaryEffects: [],
  exclusionCriteria: [],
};

const CreateNewClinicalTrial: React.FC<Props> = ({ sx = [] }) => {
  const [trial, setTrial] = useState<ClinicalTrial>(BASE_TRIAL);
  const [errorID, setErrorID] = useState(false);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(trial);
  };
  return (
    <Container
      component="header"
      sx={{
        mt: -10,
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      <Typography
        color="text.primary"
        sx={{
          typography: { xxs: 'h4', sm: 'h3' },
          mb: 3,
        }}
      >
        New clinical trial
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        Complete the form below to add a new clinical trial to your clinic.
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}
      >
        {/* id and name of the trial */}
        <Box
          sx={{ display: 'flex', flexDirection: { xxs: 'column', sm: 'row' }, gap: { xxs: 6, sm: 3 } }}
        >
          <TextField
            id="trialId"
            required
            onChange={(e) => setTrial((prevTrial) => ({ ...prevTrial, id: e.target.value }))}
            label="Clinical trial ID"
            variant="outlined"
            helperText={
            errorID
              ? 'The choosen ID is already in use.'
              : 'The ID must be unique per trial.'
          }
            error={errorID}
            value={trial.id}
            size="small"
            fullWidth
            sx={{ flexBasis: { sm: '30%' } }}
          />
          <TextField
            id="trialName"
            required
            onChange={(e) => setTrial((prevTrial) => ({ ...prevTrial, name: e.target.value }))}
            label="Clinical trial name"
            variant="outlined"
            helperText="Input the name of the clinical trial."
            error={errorID}
            value={trial.name}
            size="small"
            fullWidth
            sx={{ flexBasis: { sm: '70%' } }}
          />
        </Box>
        {/* studies */}
        <Box>
          <Typography
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 2,
              typography: { xxs: 'h5', sm: 'h4' },
            }}
          >
            Studies included in the trial
          </Typography>
          <TextField
            id="studiesNumber"
            name="studiesNumber"
            helperText="Input the number of studies included in the trial."
            type="number"
            inputProps={{ min: 1 }}
            required
            label="Number of studies"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              const auxStudies = [...trial.studies];
              const difference = parseInt(e.target.value, 10) - trial.studies.length;
              if (difference > 0) {
                for (let i = 0; i < difference; i += 1) {
                  // as default, we start the type as boolean, then the user can change it
                  auxStudies.push({ name: '', keyVariables: [{ name: '', type: 'boolean' }] });
                }
              } else if (difference < 0) {
                for (let i = 0; i < Math.abs(difference); i += 1) {
                  auxStudies.pop();
                }
              }
              setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
            }}
            value={trial.studies.length}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {Array.isArray(trial.studies) && trial.studies.map((study, studyIndex) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={`${studyIndex}data`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 10,
                  gap: 6,
                }}
              >
                <Typography
                  color="text.primary"
                  variant="body2"
                >
                  Study
                  {' '}
                  {studyIndex + 1}
                </Typography>
                <TextField
                  size="small"
                  id={`studyName${studyIndex + 1}`}
                  label={`Name of the study ${studyIndex + 1}`}
                  variant="outlined"
                  helperText="Input the name of the study."
                  onChange={(event) => {
                    const aux = [...trial.studies];
                    aux[studyIndex].name = event.target.value;
                    setTrial((prevTrial) => ({ ...prevTrial, studies: aux }));
                  }}
                  value={trial.studies[studyIndex].name}

                />
                <TextField
                  size="small"
                  id={`keyVariables${studyIndex + 1}`}
                  name={`KeyVariablesStudy${studyIndex + 1}`}
                  type="number"
                  inputProps={{ min: 0 }}
                  required
                  label={`Number of key variables of the ${studyIndex + 1} study`}
                  variant="outlined"
                  onChange={(event) => {
                    const auxStudies = [...trial.studies];
                    const difference = parseInt(event.target.value, 10)
                      - auxStudies[studyIndex].keyVariables.length;
                    if (difference > 0) {
                      for (let i = 0; i < difference; i += 1) {
                        auxStudies[studyIndex].keyVariables.push({
                          name: '',
                          type: 'boolean', // default type, changed after
                        });
                      }
                    } else {
                      for (let i = 0; i < Math.abs(difference); i += 1) {
                        auxStudies[studyIndex].keyVariables.pop();
                      }
                    }
                    setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
                  }}
                  value={trial.studies[studyIndex].keyVariables.length}
                />
                <Box>
                  {!!trial.studies[studyIndex].keyVariables.length && (
                    <Typography
                      variant="body2"
                    >
                      Key Variables
                    </Typography>
                  )}
                  {trial.studies[studyIndex]?.keyVariables?.map((variable, varIndex) => (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xxs: 'column', sm: 'row' },
                        gap: { xxs: 6, sm: 2 },
                        mb: 4,
                      }}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`study${studyIndex}-var${varIndex}`}
                    >
                      <TextField
                        size="small"
                        label="Name of the key variable"
                        key={`key variable - ${varIndex + 1} of the study`}
                        required
                        placeholder={`Variable ${varIndex + 1}`}
                        id={`variable${varIndex + 1}`}
                        name={`variable${varIndex + 1}`}
                        onChange={(event) => {
                          const auxStudies = [...trial.studies];
                          auxStudies[studyIndex].keyVariables[varIndex].name = event.target.value;
                          setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
                        }}
                        sx={{ flexBasis: { sm: '70%', xs: '100%' } }}
                        value={trial.studies[studyIndex].keyVariables[varIndex].name}
                      />
                      <FormControl
                        sx={{
                          width: '100%',
                          margin: '0 0 0 0.5rem ',
                        }}
                      >
                        <InputLabel htmlFor={`keyVariableType${varIndex + 1}`}>
                          Variable type
                        </InputLabel>
                        <Select
                          size="small"
                          required
                          id={`keyVariableType${varIndex + 1}`}
                          label="Variable type"
                          onChange={(e) => {
                            const auxStudies = [...trial.studies];
                            // eslint-disable-next-line max-len
                            auxStudies[studyIndex].keyVariables[varIndex].type = e.target.value as ClinicalStudyKeyVariable;
                            setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
                          }}
                          value={trial.studies[studyIndex].keyVariables[varIndex].type}
                        >
                          <MenuItem disabled dense value="">
                            Seleccione tipo de variable
                          </MenuItem>
                          <MenuItem dense value="umbral">Umbral 1-10</MenuItem>
                          <MenuItem dense value="siNo">Si/No</MenuItem>
                          <MenuItem dense value="numerica">Numerica</MenuItem>
                          <MenuItem dense value="texto">Texto</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        {/* exclusion criteria */}
        <Box>
          <Typography
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 2,
              typography: { xxs: 'h5', sm: 'h4' },
            }}
          >
            Exclusion criteria for the trial
          </Typography>
          <TextField
            id="exclusionQuestionsNumber"
            name="studiesNumber"
            helperText="Input the number of studies included in the trial."
            type="number"
            inputProps={{ min: 1 }}
            required
            label="Number of studies"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => {
              const auxExcCriteria = [...trial.exclusionCriteria!];
              const difference = parseInt(e.target.value, 10) - auxExcCriteria.length;
              if (difference > 0) {
                for (let i = 0; i < difference; i += 1) {
                  // as default, we start the type as boolean, then the user can change it
                  auxExcCriteria.push(
                    {
                      question: '',
                      answerToExclude: true,
                    },
                  );
                }
              } else if (difference < 0) {
                for (let i = 0; i < Math.abs(difference); i += 1) {
                  auxExcCriteria.pop();
                }
              }
              setTrial((prevTrial) => ({ ...prevTrial, exclusionCriteria: auxExcCriteria }));
            }}
            value={trial.exclusionCriteria!.length || 0}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {Array.isArray(trial.exclusionCriteria)
              && trial.exclusionCriteria.map((criteria, criteriaIndex) => (
                <Box
                // eslint-disable-next-line react/no-array-index-key
                  key={`${criteriaIndex} criteria of exclusion`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 6,
                    gap: 6,
                  }}
                >
                  <Typography
                    color="text.primary"
                    variant="body2"
                  >
                    Criteria of exclusion
                    {' '}
                    {criteriaIndex + 1}
                  </Typography>
                  <TextField
                    size="small"
                    id={`criteria${criteriaIndex + 1}`}
                    label={`Question # ${criteriaIndex + 1}`}
                    variant="outlined"
                    helperText="Input the relevant question."
                    onChange={(event) => {
                      const auxExcCriteria = [...trial.exclusionCriteria!];
                      auxExcCriteria[criteriaIndex].question = event.target.value;
                      setTrial((prevTrial) =>
                        ({ ...prevTrial, exclusionCriteria: auxExcCriteria }));
                    }}
                    value={trial.exclusionCriteria![criteriaIndex].question}
                  />
                  <TextField
                    size="small"
                    id={`exclusion criteria ${criteriaIndex + 1}`}
                    inputProps={{ min: 0 }}
                    required
                    select
                    label={`Answer to exclude from trial # ${criteriaIndex + 1}`}
                    variant="outlined"
                    onChange={(event) => {
                      const auxExcCriteria = [...trial.exclusionCriteria!];
                      const { value } = event.target;
                      auxExcCriteria[criteriaIndex].answerToExclude = value === 'true';
                      setTrial((prevTrial) =>
                        ({ ...prevTrial, exclusionCriteria: auxExcCriteria }));
                    }}
                    value={trial.exclusionCriteria![criteriaIndex].answerToExclude}
                  >
                    <MenuItem disabled dense value="">
                      Select answer to exclude
                    </MenuItem>
                    <MenuItem dense value="true">Yes</MenuItem>
                    <MenuItem dense value="false">No</MenuItem>
                  </TextField>
                  {/* <Box>
                    {!!trial.studies[studyIndex].keyVariables.length && (
                      <Typography
                        variant="body2"
                      >
                        Key Variables
                      </Typography>
                    )}
                    {trial.studies[studyIndex]?.keyVariables?.map((variable, varIndex) => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xxs: 'column', sm: 'row' },
                          gap: { xxs: 6, sm: 2 },
                          mb: 4,
                        }}
                      // eslint-disable-next-line react/no-array-index-key
                        key={`study${studyIndex}-var${varIndex}`}
                      >
                        <TextField
                          size="small"
                          label="Name of the key variable"
                          key={`key variable - ${varIndex + 1} of the study`}
                          required
                          placeholder={`Variable ${varIndex + 1}`}
                          id={`variable${varIndex + 1}`}
                          name={`variable${varIndex + 1}`}
                          onChange={(event) => {
                            const auxStudies = [...trial.studies];
                            auxStudies[studyIndex].keyVariables[varIndex].name = event.target.value;
                            setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
                          }}
                          sx={{ flexBasis: { sm: '70%', xs: '100%' } }}
                          value={trial.studies[studyIndex].keyVariables[varIndex].name}
                        />
                        <FormControl
                          sx={{
                            width: '100%',
                            margin: '0 0 0 0.5rem ',
                          }}
                        >
                          <InputLabel htmlFor={`keyVariableType${varIndex + 1}`}>
                            Variable type
                          </InputLabel>
                          <Select
                            size="small"
                            required
                            id={`keyVariableType${varIndex + 1}`}
                            label="Variable type"
                            onChange={(e) => {
                              const auxStudies = [...trial.studies];
                              // eslint-disable-next-line max-len
                              auxStudies[studyIndex].keyVariables[varIndex].type = e.target.value as ClinicalStudyKeyVariable;
                              setTrial((prevTrial) => ({ ...prevTrial, studies: auxStudies }));
                            }}
                            value={trial.studies[studyIndex].keyVariables[varIndex].type}
                          >
                            <MenuItem disabled dense value="">
                              Seleccione tipo de variable
                            </MenuItem>
                            <MenuItem dense value="umbral">Umbral 1-10</MenuItem>
                            <MenuItem dense value="siNo">Si/No</MenuItem>
                            <MenuItem dense value="numerica">Numerica</MenuItem>
                            <MenuItem dense value="texto">Texto</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    ))}
                  </Box> */}
                </Box>
              ))}
          </Box>
        </Box>
        {/* secondary effects */}
        <Box>
          <Typography
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 2,
              typography: { xxs: 'h5', sm: 'h4' },
            }}
          >
            Possible secondary effects to track
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              margin: 'auto 0',
            }}
          >
            <Typography variant="overline" color="text.secondary">
              In case your trial needs to make sure some secondary effects are tracked,
              input the relevant secondary effects, if not the patients will only have the option
              to report them classified as &quot;other&quot;.
            </Typography>
            <TextField
              required
              sx={{ mb: 6 }}
              id="sec-effects"
              name="sec-effects"
              type="number"
              inputProps={{ min: 0 }}
              label="Secondary effects"
              variant="outlined"
              size="small"
              onChange={(event) => {
                const newSecondaryEffects = [...trial?.knownPossibleSecondaryEffects || []];
                const difference = parseInt(event.target.value, 10) - newSecondaryEffects.length;
                if (difference > 0) {
                  for (let i = 0; i < difference; i += 1) {
                    newSecondaryEffects.push('');
                  }
                } else {
                  for (let i = 0; i < Math.abs(difference); i += 1) {
                    newSecondaryEffects.pop();
                  }
                }
                setTrial((prevTrial) => (
                  { ...prevTrial, knownPossibleSecondaryEffects: newSecondaryEffects }
                ));
              }}
              value={trial?.knownPossibleSecondaryEffects?.length}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {Array.isArray(trial.knownPossibleSecondaryEffects)
                && trial.knownPossibleSecondaryEffects.map((effect, effectIndex) => (
                  <TextField
                    size="small"
                  // eslint-disable-next-line react/no-array-index-key
                    key={`effect ${effectIndex}`}
                    id={`effect ${effectIndex}`}
                    name={`effect ${effectIndex}`}
                    required
                    label={`Effect #${effectIndex + 1} to track`}
                    variant="outlined"
                    onChange={(event) => {
                      // eslint-disable-next-line max-len
                      const auxKnownPossibleSecondaryEffects = [...trial?.knownPossibleSecondaryEffects || []];
                      auxKnownPossibleSecondaryEffects[effectIndex] = event.target.value;
                      // eslint-disable-next-line max-len
                      setTrial((prevTrial) => ({ ...prevTrial, knownPossibleSecondaryEffects: auxKnownPossibleSecondaryEffects }));
                    }}
                  />
                ))}
            </Box>
          </Box>
        </Box>
        {/* trial groups */}
        <Box>
          <Typography
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 2,
              typography: { xxs: 'h5', sm: 'h4' },
            }}
          >
            Trial groups
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              margin: 'auto 0',
            }}
          >
            <Typography variant="overline" color="text.secondary">
              In case your trial divides participants into groups and applies different
              protocols to them, you can enter the number of groups and a label for each.
              This will also generate statistics categorized by group. If groups are not used,
              leave it at 0.
            </Typography>
            <TextField
              required
              sx={{ mb: 6 }}
              id="grupos"
              name="grupos"
              type="number"
              inputProps={{ min: 0 }}
              label="Trial groups"
              variant="outlined"
              size="small"
              onChange={(event) => {
                const newGroups = [...trial?.groups || []];
                const difference = parseInt(event.target.value, 10) - newGroups.length;
                if (difference > 0) {
                  for (let i = 0; i < difference; i += 1) {
                    newGroups.push('');
                  }
                } else {
                  for (let i = 0; i < Math.abs(difference); i += 1) {
                    newGroups.pop();
                  }
                }
                setTrial((prevTrial) => ({ ...prevTrial, groups: newGroups }));
              }}
              value={trial?.groups?.length}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {Array.isArray(trial.groups) && trial.groups.map((group, groupIndex) => (
                <TextField
                  size="small"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`group ${groupIndex}`}
                  id={`group ${groupIndex}`}
                  name={`group ${groupIndex}`}
                  required
                  label={`Name of the group #${groupIndex + 1}`}
                  variant="outlined"
                  onChange={(event) => {
                    const auxGroups = [...trial.groups || []];
                    auxGroups[groupIndex] = event.target.value;
                    setTrial((prevTrial) => ({ ...prevTrial, groups: auxGroups }));
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ alignSelf: 'flex-end', mt: 6 }}
        >
          Create trial
        </Button>
      </Box>
    </Container>
  );
};

export default CreateNewClinicalTrial;
