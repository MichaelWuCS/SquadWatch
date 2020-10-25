import React, { Component } from "react";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import { Card,Divider } from "react-native-elements";
import  { swGrey,swWhite } from "../styles/Colors";
import firebase from 'firebase';

const signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

export default class settings extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         navigator:Navigator
    //     }
    // }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Card containerStyle={styles.card}>
                    <Text style={styles.text}>Edit Profile</Text>
                </Card>
                <Card  containerStyle={styles.card}>
                <Text style={styles.text}>Privacy</Text>
                </Card >
                <Card containerStyle={styles.card}>
                <Text style={styles.text}>Get Help</Text>
                </Card >
                <Card containerStyle={styles.card}>
                    <Text style={styles.logout} >Logout</Text>
                </Card>
                
            
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:swGrey,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    text:{
        fontSize:24,
        color:swWhite,
    },
    logout:{
        fontSize:24,
        color:'red',
    },
    card:{
        backgroundColor:swGrey,
        borderColor:'transparent',
    }

});
