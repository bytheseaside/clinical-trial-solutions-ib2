// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAO7jjDKM4_7RoUzUTvLT7HdAaImp72Kuc',
  authDomain: 'cts-tpinstrubiomedica2.firebaseapp.com',
  projectId: 'cts-tpinstrubiomedica2',
  storageBucket: 'cts-tpinstrubiomedica2.appspot.com',
  messagingSenderId: '178372599692',
  appId: '1:178372599692:web:4d2847d42c47c57ad640a9',
  measurementId: 'G-CD4BXVRRPC',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(firebaseApp);

export default firebaseDB;
