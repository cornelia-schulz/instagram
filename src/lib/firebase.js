// import { seedDatabase } from '../seed';

import { FIREBASE_API_KEY, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '../../firebase-env';

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "instagram-cornelia.firebaseapp.com",
  databaseURL: "https://instagram-cornelia-default-rtdb.firebaseio.com",
  projectId: "instagram-cornelia",
  storageBucket: "instagram-cornelia.appspot.com",
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

let firebase;
// because we are using firebase script tags in index.html,
// we can use window.firebase here
if (!window.firebase.apps.length) {
  firebase = window.firebase.initializeApp(config);
}else {
  firebase = window.firebase.app(); // if already initialized, use that one
}

// FieldValue lets you use array methods
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };