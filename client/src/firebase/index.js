import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAw3EdNp0ZsUm4v6LDnaVNUXMm0VDxypAk",
    authDomain: "vutudu-1535457518831.firebaseapp.com",
    databaseURL: "https://vutudu-1535457518831.firebaseio.com",
    projectId: "vutudu-1535457518831",
    storageBucket: "vutudu-1535457518831.appspot.com",
    messagingSenderId: "961387820511",
    appId: "1:961387820511:web:1420115be2f7858804c06a",
    measurementId: "G-NRE4YFBP6C"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const storage = firebase.storage();

  export { storage, firebase as default }

  