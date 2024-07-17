import { Appointment, ClinicalStudy, ClinicalTrial, Patient } from 'shared/api';

const generatePlaceholderDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const getAuxSteps = (trial: ClinicalTrial, patient: Patient): Appointment[] => {
  const auxSteps: Appointment[] = [];

  trial.studies.forEach((study: ClinicalStudy) => {
    // create all studies with a placeholder future date,
    // in case there's no appointment scheduled
    auxSteps.push({ date: generatePlaceholderDate(7), study });
  });

  const isAppointmentScheduled = Array.isArray(patient.appointments)
    && patient.appointments.length > 0;

  if (!isAppointmentScheduled) {
    return auxSteps;
  }

  patient.appointments.forEach((appointment: Appointment) => {
    const studyIndex = auxSteps.findIndex((step) => step.study.name === appointment.study.name);
    if (studyIndex !== -1) {
      auxSteps[studyIndex].date = appointment.date;
    }
  });

  const extraAppointments = patient.appointments.filter((appointment) => {
    const isExtraAppointment = appointment.study.name === 'Extra appointment';
    return isExtraAppointment;
  });

  auxSteps.push(...extraAppointments);

  return auxSteps;
};

export default getAuxSteps;
