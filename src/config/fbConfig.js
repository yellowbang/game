import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const config = {
  apiKey: "AIzaSyAEnh2MyG1XYcVD0xrwV_KujIHhMEslW4Y",
  authDomain: "game-0823.firebaseapp.com",
  databaseURL: "https://game-0823.firebaseio.com",
  projectId: "game-0823",
  storageBucket: "",
  messagingSenderId: "205192768031",
  appId: "1:205192768031:web:a04d63a6fb495f63"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
