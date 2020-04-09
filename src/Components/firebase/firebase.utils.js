import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDzYJUVE8xEhFlMu2Q6sjOKMLVcMhxGJvk",
    authDomain: "ecommerce-6698.firebaseapp.com",
    databaseURL: "https://ecommerce-6698.firebaseio.com",
    projectId: "ecommerce-6698",
    storageBucket: "ecommerce-6698.appspot.com",
    messagingSenderId: "686312149297",
    appId: "1:686312149297:web:661b36cb4cd588a1cae010",
    measurementId: "G-FF4CNXZL7P"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
          console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;