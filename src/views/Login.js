import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar, TextInput} from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import {swGrey, swOrange} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";

export default class Login extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                    height: 70,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <Text style={styles.header}>LOGIN</Text>
                <StatusBar
                barStyle='light-content'
                />
                <View
                    style={{
                    height: 100,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <TextInput style={styles.text} autoCapitalize={"none"} placeholder={"username"}/>
                <View
                    style={{
                    height: 2,
                    width: '75%',
                    backgroundColor: "white",
                    marginLeft: '12.5%'
                    }}
                />
                <View
                    style={{
                    height: 40,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <TextInput style={styles.text} autoCapitalize={"none"} secureTextEntry placeholder="password"/>
                <View
                    style={{
                    height: 2,
                    width: '75%',
                    backgroundColor: "white",
                    marginLeft: '12.5%'
                    }}
                />
            </SafeAreaView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:swOrange,
    },
    text: {
        color:"white",
        textAlign:"left",
        fontWeight:"bold",
        marginLeft:"13%",
        marginBottom:"3%"
    },
    header: {
        color:"white",
        textAlign:"center",
        fontWeight:"bold",
        fontSize:30
    },
});