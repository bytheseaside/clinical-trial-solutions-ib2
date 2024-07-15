import { get, getDatabase, push, ref, set, update } from 'firebase/database';

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

};

export default PatientService;
