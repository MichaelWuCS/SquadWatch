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

export function addRecList(recList, addComplete){

    firestore
    .collection("recommendations")
    .add({

    }).then((data) => addComplete(data))
    .catch((error)=> console.log(error));

}


export async function getAllRecLists(){

    var recList = [];

    var snapshot = await firestore
    .collection("recommendations")
    .get()
    .catch((error)=> console.log(error));


    snapshot.forEach(element => {
         recList.push(element.data());
    });

    return recList
}


export async function getRecList(key){

    var snapshot = await firestore
    .collection("recommendations")
    .doc(key)
    .get()
    .catch((error)=> console.log(error));

    return snapshot.data().movies;
}

export async function updateRecList(key, reclist){

    firestore.collection("recommendations")
    .doc(key)
    .update(reclist)
    .catch((error)=> console.log(error));


}

export async function deleteRecList(key){
    firestore.collection("recommendations")
    .doc(key)
    .delete()
    .catch((error)=> console.log(error));

}



