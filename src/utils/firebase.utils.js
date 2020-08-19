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
// initialize firebase
firebase.initializeApp(config);

// get userAuth after authentication then store it to our database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const collectionRef = firestore.collection(`users`);
    console.log("Documentsnapshot object:", userRef);
    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get();
    console.log("Documentsnapshot object:Exists", snapShot);
    console.log("Querysnapshot object:Exists", collectionSnapshot);
    console.log("Querysnapshot Document", collectionSnapshot.docs);
    console.log({
        Document: collectionSnapshot.docs.map((doc) => doc.data()),
    });
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
            console.log("Create user error");
        }
    }
    return userRef;
};

// create a collection
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectToAdd.forEach((obj) => {
        const newDocuRef = collectionRef.doc();
        batch.set(newDocuRef, obj);
    });
    return await batch.commit();
};
export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// google authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propt: "select_account" });
// pop up window
export const signInWithGoogleAuth = () => auth.signInWithPopup(provider);

export default firebase;
