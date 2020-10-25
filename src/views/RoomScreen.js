import React, {Component, useEffect, useState} from "react";
import {
    Text,
    Button,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator, NativeEventEmitter,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {TMDB_KEY} from "@env";
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
import { swBlack, swBlue, swGreen, swGrey, swPink, swPurple } from "../styles/Colors";

const firestore = firebase.firestore();

export default class RoomScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            error:false,
            data:{}
        }
        this.id;
    }

    componentDidMount(){
        this.id = this.props.route.params.id.toUpperCase();
        console.log("room view");
        this.fetchRoom(this.id);
    }

    fetchRoom(roomID) {
        this.setState({loading:true});
        firestore
        .collection("squadRoom")
        .doc(roomID)
        .get()
        .then((doc) => {
            let cur_members = doc.data().members;
            cur_members.push(firebase.auth().currentUser.uid);
            let data_store = doc.data();
            console.log(doc.data())
            data_store.members = cur_members;
            // firestore
            //     .collection("squadRoom")
            //     .doc(roomID)
            //     .set({host: doc.data().host, members: cur_members, id:roomID, isActive:true});
            this.setState({
                loading:false,
                data: data_store
            });
        }).catch((error) => {
            this.setState({error:error, loading:false});
            console.warn("Error!: " + error);
        });
    }

    render(){
        if(this.state.loading){
            return <ActivityIndicator/>
        }else if(this.state.error){
            return (
                <View style={styles.container} backgroundColor={"red"}>
                    <Text style={styles.text}>{"An error has occurred. Make sure you entered the name correctly."}</Text>
                </View>
            );
        }else{
            // LOADED ROOM VIEW
            return (<View style={styles.container}>
                <Text style = {styles.text}>
                    {"Room host: "+this.state.data.host}
                </Text>
            </View>)
        }
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: swBlack,
        width: "100%",
        height: undefined,
        alignContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
