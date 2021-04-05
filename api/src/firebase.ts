import firebase from 'firebase-admin';
const serviceAccount = require('./serviceAccount.json');

export default firebase.initializeApp(serviceAccount);
