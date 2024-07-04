export type Patient = {
  name: string;
  phone: string;
  dni: number;
  clinicalTrialId: string;
  trialGroup?: {
    tag: string;
    name: string;
  };
  birthDate: Date;
  mail: string;
  sex: 'F' | 'M';
  secondaryEffects?: SecondaryEffect[];
};

type SecondaryEffect = {
  comment: string;
  date: Date;
  tag: string;
};
