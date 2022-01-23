var firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

const apiKey = 'AIzaSyAYLyTobq32G5EADwOcwyStnb_tlRo-FEg'
firebase.initializeApp({
  apiKey: apiKey,
});



exports.addUser = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);