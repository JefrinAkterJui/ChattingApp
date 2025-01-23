// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUdHskg625HTfmL2ETSAZkwQEL3undtoU",
  authDomain: "tchattingapp-27d60.firebaseapp.com",
  projectId: "tchattingapp-27d60",
  storageBucket: "tchattingapp-27d60.firebasestorage.app",
  messagingSenderId: "778583042917",
  appId: "1:778583042917:web:df88c14ba8d7598c778f8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app