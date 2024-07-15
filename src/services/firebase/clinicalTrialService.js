import { get, ref, set } from 'firebase/database';

import firebaseDB from './firebaseDB';

const updateTrialContactInfo = async (trialId, contactInfo) => {
  try {
    const trialRef = ref(firebaseDB, `/clinical-trials/${trialId}/contacts`);
    await set(trialRef, contactInfo);
    console.log('Trial contact info updated successfully');
  } catch (error) {
    console.error('Error updating trial contact info:', error);
  }
};

const getAllTrials = async () => {
  try {
    const trialsRef = ref(firebaseDB, '/clinical-trials');
    const snapshot = await get(trialsRef);

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
  } catch (error) {
    console.error('Error adding trial:', error);
  }
};

const getClinicalTrialById = async (trialId) => {
  try {
    const trialRef = ref(firebaseDB, `/clinical-trials/${trialId}`);
    const snapshot = await get(trialRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }
    throw new Error('Clinical trial not found');
  } catch (error) {
    console.error('Error getting clinical trial:', error);
    throw error;
  }
};

const ClinicalTrialService = {
  getAllTrials,
  addTrial,
  updateTrialContactInfo,
  getClinicalTrialById,
};

export default ClinicalTrialService;
