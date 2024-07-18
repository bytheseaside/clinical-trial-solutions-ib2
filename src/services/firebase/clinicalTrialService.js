import { get, off, ref, set } from 'firebase/database';

import firebaseDB from './firebaseDB';

const updateTrialContactInfo = async (trialId, contactInfo) => {
  try {
    const contactsRef = ref(firebaseDB, `/clinical-trials/${trialId}/contacts`);

    const snapshot = await get(contactsRef);

    off(contactsRef);
    if (snapshot.exists()) {
      const existingContacts = snapshot.val();

      // Asegúrate de que existingContacts sea un array
      const updatedContacts = Array.isArray(existingContacts)
        ? [...existingContacts, contactInfo] : [contactInfo];

      await set(contactsRef, updatedContacts); // Usar set en lugar de update

      console.log('Trial contact info updated successfully');
    } else {
      // Si no existe, se crea el array con el nuevo contacto
      await set(contactsRef, [contactInfo]);

      console.log('Trial contact info created successfully');
    }
  } catch (error) {
    console.error('Error updating trial contact info:', error);
  }
};

const getAllTrials = async () => {
  try {
    const trialsRef = ref(firebaseDB, '/clinical-trials');
    const snapshot = await get(trialsRef);

    off(trialsRef);
    if (snapshot.exists()) {
      const trialsData = snapshot.val();
      // Asegúrate de que se devuelva un array
      return Object.values(trialsData);
    }
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting trials:', error);
    return [];
  }
};

const addTrial = async (trial) => {
  try {
    const trialRef = ref(firebaseDB, `/clinical-trials/${trial.id}`);
    await set(trialRef, trial);
    off(trialRef);
  } catch (error) {
    console.error('Error adding trial:', error);
  }
};

const getClinicalTrialById = async (trialId) => {
  try {
    const trialRef = ref(firebaseDB, `/clinical-trials/${trialId}`);
    const snapshot = await get(trialRef);

    off(trialRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    throw new Error('Clinical trial not found');
  } catch (error) {
    console.error('Error getting clinical trial:', error);
    throw error;
  }
};

const getAllContacts = async (trialId) => {
  try {
    const contactsRef = ref(firebaseDB, `/clinical-trials/${trialId}/contacts`);
    const snapshot = await get(contactsRef);

    off(contactsRef);
    if (snapshot.exists()) {
      const contactsData = snapshot.val();
      // Asegúrate de que se devuelva un array
      return contactsData;
    }
    return [];
  } catch (error) {
    console.error('Error getting contacts:', error);
    return [];
  }
};

const ClinicalTrialService = {
  getAllTrials,
  addTrial,
  updateTrialContactInfo,
  getClinicalTrialById,
  getAllContacts,
};

export default ClinicalTrialService;
