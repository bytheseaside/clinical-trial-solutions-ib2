import { get, off, ref } from 'firebase/database';

import firebaseDB from './firebaseDB';

async function getMedicalStaffCode() {
  const medicalStaffCodeRef = ref(firebaseDB, '/medical-staff-code');
  return get(medicalStaffCodeRef)
    .then((snapshot) => {
      off(medicalStaffCodeRef);
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
