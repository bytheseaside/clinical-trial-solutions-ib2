export type Observation = {
  date: Date;
  text: string;
};

export type Symptom = {
  startDate: Date;
  comments: string;
  tag: string;
};

export type Patient = {
  usertype: 'patient';
  mail: string;
  name: string;
  surname: string;
  dni: string;
  birthDate: Date;
  age: number;
  sex: 'F' | 'M';
  id: string;
  trialId: string;
  group?: string;
  observations?: Observation[];
  symptoms?: Symptom[];
  assesments?: {
    [key: string]: boolean | number | string;
  }[];
  appointments: Appointment[];
};

export type Appointment = { date: Date; study: ClinicalStudy };

export type ClinicalStudyKeyVariable = 'boolean' | 'threshold' | 'text' | 'number';

export type ClinicalStudy = {
  name: string;
  keyVariables: {
    name: string;
    type: ClinicalStudyKeyVariable;
  }[];
};

export type ExclusionCriteria = {
  question: string;
  answerToExclude: boolean;
};

export type ClinicalTrial = {
  id: string;
  name: string;
  studies: ClinicalStudy[];
  groups?: string[];
  knownPossibleSecondaryEffects?: string[];
  exclusionCriteria?: ExclusionCriteria[];
  signUpCodes: {
    medicalStaff: string;
    analist: string;
    [key: string]: string; // allow for presence of group patient codes
  };
};
