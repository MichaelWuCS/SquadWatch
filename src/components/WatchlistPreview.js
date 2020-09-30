import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Alert,
    TouchableHighlight
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import ThumbnailList from "./ThumbnailList";

// Set the configuration for your app
const config = {
    apiKey: "AIzaSyDRW8Lh0Mn2Dv7PZfLkaPFmtXBZEaLpMgw",
    authDomain: "squadwatch-e2133.firebaseapp.com",
    databaseURL: "https://squadwatch-e2133.firebaseio.com",
    storageBucket: "squadwatch-e2133.appspot.com",
    projectId: "squadwatch-e2133",
    appId: "squadwatch"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const firestore = firebase.firestore();

export default class WatchlistPreview extends Component {
    render() {
        return (
            <ThumbnailList listTitle={"MY WATCHLIST"} movieList={test_watchlist.movies}/>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "aquamarine",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
