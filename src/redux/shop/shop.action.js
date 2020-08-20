import shopActionTypes from "./shop.types";
import {
    firestore,
    convertCollectionSnapshotToMap,
} from "../../utils/firebase.utils";

export const fetechCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START,
});
export const fetechCollectionsSuccessfull = (collectionsMap) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});
export const fetechCollectionsFailure = (errorMessage) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

export const fetechCollectionsStartAsync = () => {
    return (dispatch) => {
        dispatch(fetechCollectionsStart());
        const collectionRef = firestore.collection("collections");
        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetechCollectionsSuccessfull(collectionsMap));
            })
            .catch((err) => dispatch(fetechCollectionsFailure(err.message)));
    };
};
