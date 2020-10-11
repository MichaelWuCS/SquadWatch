import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar, TextInput} from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import {swGrey, swOrange} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";
import{Auth} from "../components/Auth.js";
import {signUp} from "../components/Auth.js"
import { Button } from "react-native-paper";

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = ({
            email: '',
            first: '',
            last:'',
            password:''
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View
                    style={{
                    height: 40,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <Text style={styles.header}>SIGN UP</Text>
                <StatusBar
                barStyle='light-content'
                />
                <TextInput style={styles.text} autoCapitalize={"none"} placeholder={"email"}
                onChangeText = {(email) => this.setState({email})}/>
                <View
                    style={styles.bar}
                />
                <View
                    style={{
                    height: 30,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <TextInput style={styles.text} autoCapitalize={"none"} placeholder="username"/>
                <View
                    style={styles.bar}
                />
                <View
                    style={{
                    height: 30,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <TextInput style={styles.text} autoCapitalize={"none"} secureTextEntry placeholder="password"
                onChangeText = {(password) => this.setState({password})}/>
                <View
                    style={styles.bar}
                />
                <View
                    style={{
                    height: 30,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <TextInput style={styles.text} autoCapitalize={"none"} secureTextEntry placeholder="re-type password"/>
                <View
                    style={styles.bar}
                />
                <View
                    style={{
                    height: 60,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <View>
                
                    <Button
                        style= {styles.buttonContainer}
                        title= "Register"
                        onPress= {() => signUp(this.state.email, this.state.password)}
                    />
                    <Button title = "test"></Button>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:swOrange,
    },
    buttonContainer:{
       
        backgroundColor: "#f6ecd9",
        borderRadius: 30,
        paddingVertical: 8,
        width: '50%',
        marginLeft: '25%'
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
        fontSize:30,
        marginTop:"20%",
        marginBottom:"10%"
    },
    bar: {
        height: 2,
        width: '75%',
        backgroundColor: "white",
        marginLeft: '12.5%'
    }
});