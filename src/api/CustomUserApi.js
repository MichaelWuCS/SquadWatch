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

export async function getAllCustomUsers(){

    var userList = [];

    var snapshot = await firestore
    .collection("customUser")
    .get()

    snapshot.forEach(element => {
         userList.push(element.data());
    });

    return userList
}


export async function getCustomUser(key){

    var customUser = await firestore
    .collection("customuser")
    .doc(key)
    .get()

   return customUser;
}

export async function updateCustomUser(key, customUser){
    firestore.collection("customUser")
    .doc(key)
    .update(customUser);

}