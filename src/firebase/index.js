import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDB1iJESEd5i402vYWfzhFW6PuWuB38ymI',
  authDomain: 'esports-platform-20d82.firebaseapp.com',
  databaseURL: 'https://esports-platform-20d82.firebaseio.com',
  projectId: 'esports-platform-20d82',
  storageBucket: 'esports-platform-20d82.appspot.com',
  messagingSenderId: '519254861088',
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.database();
    // this.auth.onAuthStateChanged((user) => { this.user = user; });
  }
}

export default Firebase;
