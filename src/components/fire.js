import * as firebase from "firebase";

  var config = {
        apiKey: "Change this to your key",
        authDomain: "testfirebase-18283.firebaseapp.com",
        databaseURL: "https://testfirebase-18283.firebaseio.com",
        projectId: "testfirebase-18283",
        storageBucket: "testfirebase-18283.appspot.com",
        messagingSenderId: "1018589989421"
      };
  var fire = firebase.initializeApp(config);

export default fire;
