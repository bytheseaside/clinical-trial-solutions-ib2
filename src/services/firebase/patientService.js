import { get, getDatabase, ref, set } from 'firebase/database';

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
    try {
      const db = getDatabase();
      const observationRef = ref(db, `/users/${id}/observations`);

      // Retrieve existing observations
      const snapshot = await get(observationRef);
      const existingObservations = snapshot.exists() ? snapshot.val() : [];

      // Ensure observations is an array and add the new observation
      const updatedObservations = Array.isArray(existingObservations)
        ? [...existingObservations, observation]
        : [observation];

      // Save the updated list back to Firebase
      await set(observationRef, updatedObservations);

      console.log('Observation added successfully');
    } catch (error) {
      console.error('Error adding observation:', error);
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
  updateKeyVariable: async (patientId, studyIndex, keyVariable) => {
    if (!patientId || !studyIndex || !keyVariable || !keyVariable.name) {
      throw new Error('Faltan datos necesarios para actualizar la variable clave.');
    }

    const database = getDatabase();
    const keyVariableRef = ref(database, `patients/${patientId}/assessments/${studyIndex}/keyVariables/${keyVariable.name}`);

    try {
      await set(keyVariableRef, keyVariable);
      console.log(`Variable clave ${keyVariable.name} actualizada correctamente.`);
    } catch (error) {
      console.error('Error al actualizar la variable clave:', error);
    }
  },
};

export default PatientService;
