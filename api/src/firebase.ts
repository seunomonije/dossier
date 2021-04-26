import firebase from 'firebase-admin';
const serviceAccount = require('../serviceAccount.json');

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}

export default firebase;
