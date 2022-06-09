import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjelUQ9eExcOMKvcnEeUe4aHT2jZiTBnQ",
  authDomain: "doappauth.firebaseapp.com",
  projectId: "doappauth",
  storageBucket: "doappauth.appspot.com",
  messagingSenderId: "963782832610",
  appId: "1:963782832610:web:974a83621b1a4eb15949bb",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
