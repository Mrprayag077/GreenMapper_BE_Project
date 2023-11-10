// // Requiring firebase (as our db)
// const firebase = require("firebase");
// // Importing our configuration to initialize our app
// const config = require("./firebase.config");
// // Creates and initializes a Firebase app instance. Pass options as param
// const db = firebase.initializeApp(config.firebaseConfig);
// module.exports = db;

const firebase = require("firebase");
const config = require("./firebase.config");

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config.firebaseConfig);
}

module.exports = firebase;
