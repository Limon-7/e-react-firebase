import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();
firestore
    .collection("users")
    .doc("a9bXkZhne265UQT6WUTg")
    .collection("cartItem")
    .doc("KJcKWyhyTfUkbK4eq3yp");

firestore.doc("/users/a9bXkZhne265UQT6WUTg/cartItem/KJcKWyhyTfUkbK4eq3yp");
firestore.collection("/users/a9bXkZhne265UQT6WUTg/cartItem");
