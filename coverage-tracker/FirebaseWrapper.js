import * as firebase from 'firebase';  
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAPrNKgIXjjAIPjlkKKTovhSeaEXZP1uBI",
    authDomain: "coverage-tracker-ead27.firebaseapp.com",
    databaseURL: "https://coverage-tracker-ead27.firebaseio.com",
    projectId: "coverage-tracker-ead27",
    storageBucket: "coverage-tracker-ead27.appspot.com",
    messagingSenderId: "796357536375",
    appId: "1:796357536375:web:33baa8ce20dde3a885f472",
    measurementId: "G-ER1PYWPS11"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();