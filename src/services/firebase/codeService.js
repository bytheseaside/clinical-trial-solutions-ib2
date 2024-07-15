import { get, getDatabase, onValue, ref, set, update } from 'firebase/database';

import firebaseDB from './firebaseDB';

async function getMedicalStaffCode(id) {
  const medicalStaffCodeRef = ref(firebaseDB, '/medical-staff-code');
  return get(medicalStaffCodeRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    })
    .catch((error) => {
      console.error('Error getting code:', error);
      return null;
    });
}

const CodeService = { getMedicalStaffCode };

export default CodeService;
