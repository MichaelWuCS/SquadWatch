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
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { swBlue, swGreen, swGrey, swPink, swPurple } from "../styles/Colors";
import {connect} from "react-redux";

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
const auth = firebase.auth();

class SyncScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            data:[], //Data here is a list of roomIDs in use
        }
        this.uid;
    }

    makeid(length) {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        while(result=='' && !(this.state.data.includes(result))){
            result = '';
            for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        return result;
    }

    componentDidMount(){
        this.props.addCustomUserToRedux({
            id:"kcnprYOOyDQzT1FYpyTGpaT322u1", 
            first:"Bhargav", 
            last:"Annigeri",
            watchlistID: "WiEkX1WL5XmcYp4jODIb"
        });
        console.log(this.props);
        this.uid = this.props.customUser.id;
        console.log("currentuser:"+this.uid);
        this.fetchData();
    }

    fetchData(){
        this.setState({loading:true});
        firestore
        .collection("squadRoom")
        .get()
        .then((querySnapshot) => { 
            var temp = []
            querySnapshot.forEach((doc)=> {
                // doc.data() is never undefined for query doc snapshots=
                temp.push(doc.id);
            });
            this.setState({loading:false,data:temp});
        })
    }

    createNewRoom(){
        var newRoomID = this.makeid(6);
        console.log("New room id generated: "+newRoomID);
        firestore
        .collection("squadRoom")
        .doc(newRoomID)
        .set({host: this.uid, members: [this.uid], isActive:true});
        this.props.navigation.push('Room',{
            id: newRoomID,
            name: "Room Code: "+newRoomID
        });
    }
    

    render(){
    !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
        if(this.state.loading){
            return <ActivityIndicator/>;
        }
        else{
        return (
            <View style={{backgroundColor:swGrey, height:"100%", width:"100%", flex:1}}>
                <View height="25%"/>
                <TouchableOpacity onPress={() => {
                    this.createNewRoom();
                }}>
                    <View style={styles.button} backgroundColor={swGreen}>
                        <Text style = {styles.buttonText}>
                            Create Room
                        </Text>
                        <MaterialCommunityIcons
                        alignSelf="center" 
                        name="arrow-right-bold-box-outline" 
                        color={"white"}
                        size={60}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button} backgroundColor={swBlue}>
                        <Text style={styles.buttonText}>
                            Join Room
                        </Text>
                        <MaterialCommunityIcons 
                        name="magnify" 
                        color={"white"}
                        size={70}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
        }
    }
}

function mapStateToProps(state){
    return {
        customUser: state.customUser
    }

}

function mapDispatchToProps(dispatch){
    return {
        addCustomUserToRedux: (customUser)=> dispatch({
            type: "ADDCUSTOMUSER",
            payload: customUser
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SyncScreen)

const styles = StyleSheet.create({
    button:{
        borderRadius: 25,
        height :"31%",
        width: "75%",
        alignSelf:"center",
        marginTop:10,
        flexDirection:"row",
        alignItems:"stretch",
        justifyContent:"center",
        padding:"1%"
    },
    buttonText:{
        textAlign:"center",
        color:"white",
        fontSize:30,
        paddingVertical:15,
        paddingHorizontal:"5%"
    },
});

