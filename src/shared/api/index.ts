export type Observation = {
  date: string;
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
  birthDate: string;
  sex: 'F' | 'M';
  id: string;
  trialId: string;
  group?: string;
  observations?:Observation[];
  symptoms?: Symptom[];
  assessments?: {
    [key: string]: boolean | number | string;
  }[]; //  each element of the array is study, each pair key-value is the assesment,
  // where the key is the name of the assesment and the value is the value of the assesment
  // example
  // [
  //   {
  //      "study1Assesment1": a,
  //      "study1Assesment2" : b,
  //   },
  //   {
  //      "study2Asessment1": c,
  //   },
  // ]

  appointments: Appointment[];
};

export type Appointment = { date: Date; study: ClinicalStudy };

export type ClinicalStudyKeyVariable = 'boolean' | 'threshold' | 'text' | 'numeric';

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

export type SignUpCodes = {
  analyst: string;
  [key: string]: string; // allow for presence of group patient codes
};

export type Contact = {
  name: string;
  specialty: string;
  phone: string;
};

export type ClinicalTrial = {
  id: string;
  name: string;
  studies: ClinicalStudy[];
  groups?: string[];
  knownPossibleSecondaryEffects?: string[];
  exclusionCriteria?: ExclusionCriteria[];
  signUpCodes: SignUpCodes;
  contacts: Contact[];
};

export type MedicalStaff = {
  usertype: 'medicalStaff';
  mail: string;
  id: string;
};

export type Analyst = {
  usertype: 'analyst';
  mail: string;
  id: string;
  trialId: string;
};

export type Admin = {
  usertype: 'admin';
  mail: string;
  id: string;
};

export type User = Patient | MedicalStaff | Analyst | Admin;
