import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBFkVw3wOoQmbBbB7BFdKPNhTi2Nq90h-o",
    authDomain: "lolprechat.firebaseapp.com",
    databaseURL: "https://lolprechat.firebaseio.com",
    projectId: "lolprechat",
    storageBucket: "lolprechat.appspot.com",
    messagingSenderId: "304451015783"
  };
  firebase.initializeApp(config);

  export default firebase;