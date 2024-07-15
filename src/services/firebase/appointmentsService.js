import { get, ref, update } from 'firebase/database';

import firebaseDB from './firebaseDB';

const AppointmentService = {
  getAppointmentsForToday: async () => {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayEnd = new Date(today.setHours(23, 59, 59, 999));

    const startTimestamp = todayStart.getTime();
    const endTimestamp = todayEnd.getTime();

    try {
      // Obtener todos los usuarios
      const usersRef = ref(firebaseDB, 'users');
      const usersSnapshot = await get(usersRef);
      const usersData = usersSnapshot.val();

      if (!usersData) {
        return [];
      }

      // Filtrar pacientes que tienen citas hoy
      const appointmentsData = Object.values(usersData)
        .filter((userData) => userData.usertype === 'patient' && userData.appointments)
        .flatMap((patient) => {
          const todayAppointments = patient.appointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.date).getTime();
            return appointmentDate >= startTimestamp && appointmentDate <= endTimestamp;
          });

          return todayAppointments.map((appointment) => ({ patient, appointment }));
        });

      return appointmentsData;
    } catch (error) {
      console.error('Error getting appointments:', error);
      return [];
    }
  },
  addAppointmentToPatient: async (patientId, newAppointment) => {
    try {
      const patientRef = ref(firebaseDB, `/users/${patientId}`);
      const snapshot = await get(patientRef);

      if (snapshot.exists()) {
        const patientData = snapshot.val();
        const existingAppointments = patientData.appointments || [];
        const updatedAppointments = [...existingAppointments, newAppointment];

        await update(patientRef, { appointments: updatedAppointments });

        console.log('Appointment added successfully');
      } else {
        console.error(`Patient with ID ${patientId} not found.`);
        throw new Error('Patient not found');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      throw error;
    }
  },

};

export default AppointmentService;
