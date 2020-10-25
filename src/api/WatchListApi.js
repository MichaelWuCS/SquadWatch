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

export function addWatchList(watchList, addComplete){
    
    firestore
    .collection("watchList")
    .add({
        
    }).then((data) => addComplete(data))
    .catch((error)=> console.log(error));

}


export async function getAllWatchLists(){

    var watchList = [];

    var snapshot = await firestore
    .collection("watchList")
    .get()
    .catch((error)=> console.log(error));


    snapshot.forEach(element => {
         watchList.push(element.data());
    });

    return watchList
}


export async function getWatchList(key){

    var snapshot = await firestore
    .collection("watchList")
    .doc(key)
    .get()
    .catch((error)=> console.log(error));

    return snapshot.data().movies;
}

export async function updateWatchList(key, watchlist){

    firestore.collection("watchList")
    .doc(key)
    .update(watchlist)
    .catch((error)=> console.log(error));


}

export async function deleteWatchList(key){
    firestore.collection("watchList")
    .doc(key)
    .delete()
    .catch((error)=> console.log(error));

}



