import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBQpoZT9AvAB9doT0VCuoEI4o_9iCxoVrs",
    authDomain: "e-shop-60c31.firebaseapp.com",
    databaseURL: "https://e-shop-60c31.firebaseio.com",
    projectId: "e-shop-60c31",
    storageBucket: "e-shop-60c31.appspot.com",
    messagingSenderId: "612271992108",
    appId: "1:612271992108:web:04dc6337c627d88ccad089",
    measurementId: "G-G8WZR457DV",
};
// get userAuth after authentication then store it to our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const craetedAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                craetedAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("Vreate user error");
        }
    }
    console.log(snapShot);
    return userRef;
};
// initialize firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propt: "select_account" });
// pop up window
export const signInWithGoogleAuth = () => auth.signInWithPopup(provider);

export default firebase;
