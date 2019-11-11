import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDD5e6xEvq7J53_cdj9K2BOrXGs23TTxJU",
    authDomain: "my-awesome-project-7b82d.firebaseapp.com",
    databaseURL: "https://my-awesome-project-7b82d.firebaseio.com",
    projectId: "my-awesome-project-7b82d",
    storageBucket: "my-awesome-project-7b82d.appspot.com",
    messagingSenderId: "1086302413473",
    appId: "1:1086302413473:web:d7d4a96c41ba2608"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;