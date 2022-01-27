var firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");


try {
    firebase.initializeApp({
        apiKey:'AIzaSyAYLyTobq32G5EADwOcwyStnb_tlRo-FEg',
    });
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

// exports.addUser = (email, password) =>
//   firebase.auth().createUserWithEmailAndPassword(email, password);

// exports.authenticate = (email, password) =>
//   firebase.auth().signInWithEmailAndPassword(email, password);


const fire = firebase;
export default fire;