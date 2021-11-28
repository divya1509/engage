import 'firebase/firestore'
import firebase from "firebase/app" 
import "firebase/auth"
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9NDgR_EQR3ioIH_9L_xyhNGNkohm5ak4",
    authDomain: "engage-2a04c.firebaseapp.com",
    projectId: "engage-2a04c",
    storageBucket: "engage-2a04c.appspot.com",
    messagingSenderId: "1023896254846",
    appId: "1:1023896254846:web:8bbb7a3c6b0d530f6edb2f"
};


firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const dataBase = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



export { auth, provider, storage}
export default dataBase