import { get, getDatabase, push, ref, set } from 'firebase/database';

import firebaseDB from './firebaseDB';

const PatientService = {
  getAllPatients: async () => {
    try {
      const usersRef = ref(firebaseDB, 'users');
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        // Convierte el objeto en un array y filtra
        const patients = Object.values(usersData).filter((user) => user.usertype === 'patient');
        return patients;
      }
      return []; // No hay datos
    } catch (error) {
      console.error('Error getting patients:', error);
      return []; // Manejo de errores, devuelve una lista vacía en caso de fallo
    }
  },
  addObservation: async (id, observation) => {
    const db = getDatabase();
    const observationRef = ref(
      db,
      `/users/${id}/observations`,
    );
    try {
      const newObsKey = push(observationRef, observation).key;
      observationRef.push(newObsKey);
    } catch (error) {
      console.log(error);
    }
  },
  updatePatientSymptoms: async (userId, symptom) => {
    try {
      const db = getDatabase();
      const symptomsRef = ref(db, `/users/${userId}/symptoms`);

      const snapshot = await get(symptomsRef);
      const existingSymptoms = snapshot.exists() ? snapshot.val() : [];

      // Ensure symptoms is an array
      const updatedSymptoms = Array.isArray(existingSymptoms)
        ? [...existingSymptoms, symptom] : [symptom];

      await set(symptomsRef, updatedSymptoms);

      console.log('Patient symptoms updated successfully');
    } catch (error) {
      console.error('Error updating patient symptoms:', error);
    }
  },
};

export default PatientService;
