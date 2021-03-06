import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID
} from '@env';
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID,
};

!firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();

const firestore = firebase.firestore();



export async function getRatings(key){

    console.log("API")

    var snapshot = await firestore
    .collection("ratings")
    .doc(key)
    .get()
    .catch((error)=> console.log(error));

    console.log(snapshot);

    return snapshot.data().ratings;
    
}

export async function updateRatings(key, ratinglist){

    firestore.collection("ratings")
    .doc(key)
    .update({ratings: ratinglist})
    .catch((error)=> console.log(error));


}

export async function deleteRatings(key){
    firestore.collection("ratings")
    .doc(key)
    .delete()
    .catch((error)=> console.log(error));

}



