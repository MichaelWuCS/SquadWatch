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

export async function getWatchList(onWatchListsRecieved){

    var watchList = [];

    var snapshot = await firestore
    .collection("watchList")
    .get()

    snapshot.forEach(element => {
         watchList.push(element.data());
         console.log("-----------------------------------------")

    });

    onWatchListsRecieved(watchList);
}

/*
import firebase from "react-native-firebase";
import WatchList from "../views/WatchList";

export function addWatchList(watchList, addComplete){
    
    firebase.firestore()
    .collection("watchList")
    .add({
        
    }).then((data) => addComplete(data))
    .catch((error)=> console.log(error));


}

export async function getWatchList(watchListsRecieved){

    var watchList = [];

    var snapshot = await firebase.firestore()
    .collection("watchList")
    .get()

    snapshot.array.forEach(element => {
        watchList.push(element.data());
    });

    watchListsRecieved(WatchList);
}
*/



