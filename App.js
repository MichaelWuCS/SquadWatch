import React from "react";
import {StyleSheet, StatusBar,YellowBox} from "react-native";
import {NativeRouter, Switch, Route, Router, Link} from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from "./src/components/BottomTab.js";
import {InitStack,HomeStack } from './src/components/stackNav';
import Auth from "./src/components/Auth.js";
import RoomView from "./src/components/RoomView.js";
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
//import Login from "./src/views/Login.js";
import SignUp from "./src/views/SignUp.js";
import {Provider} from "react-redux";
import {store} from "./src/store/store.js"
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//set up firebase configuration from environment variables
console.log(FIREBASE_API_KEY);
const firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID,
};

console.log(firebase_config);

!firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();

const firestore = firebase.firestore();
const firebaseAuth = firebase.auth();

export default function App() {
    console.disableYellowBox = true;
    return (
        <Provider store={store}>
            <NavigationContainer>
            <StatusBar
                barStyle='light-content'
                />
                <InitStack/>
            </NavigationContainer>
        </Provider>
    );
}

export {firestore};

const styles = StyleSheet.create({});
