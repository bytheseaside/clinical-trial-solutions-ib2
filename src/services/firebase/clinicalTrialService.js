import { get, getDatabase, push, ref, set, update } from 'firebase/database';

import firebaseDB from './firebaseDB';

const getAllTrials = async () => {
  const trialsRef = ref(firebaseDB, '/clinical-trials');
  return get(trialsRef).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  })
    .catch((error) => {
      console.error('Error getting trials:', error);
      return null;
    });
};

const ClinicalTrialService = { getAllTrials };

export default ClinicalTrialService;
