/* eslint-disable no-console */
import { get, ref, set } from 'firebase/database';

import firebaseDB from './firebaseDB';

async function getUserById(id) {
  const userRef = ref(firebaseDB, `/users/${id}`);
  return get(userRef)
    .then((snapshot) => {
      // promise that returns the user data
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    })
    .catch((error) => {
      console.error('Error getting user:', error);
      return null;
    });
}

async function createUser(id, userData) {
  const userRef = ref(firebaseDB, `/users/${id}`);
  return set(userRef, userData)
    .then(() => {
      console.log('User data saved successfully');
      return true;
    })
    .catch((error) => {
      console.error('Error saving user data:', error);
      return false;
    });
}

const UserService = { getUserById, createUser };

export default UserService;
