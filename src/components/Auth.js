import React, { useState, useEffect } from 'react';
import { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import firebase from 'firebase';
import auth from 'firebase/auth';
import {Button, TextInput} from 'react-native';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID
} from '@env';
const firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DB_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID,
};


if(!firebase.apps.length){
    firebase.initializeApp(firebase_config);
}

const firebaseAuth = firebase.auth();

const signUp = (email, password) => {

    firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & s igned in!');
      //this.setState({signedIn:true});
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

const signIn = (email, password) =>{
    firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account signed in!');
      //this.setState({signedIn:true});
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

const signOut = ()=>{

    firebaseAuth
    .signOut()
    .then(() => {
      console.log('User signed out!');
      //this.setState({signedIn:false});
    });
}

export default class Auth extends Component {

    //setting the state to be empty since we want the input for the user to be in
    constructor(props){
        super(props);
        this.state = ({
            email: '',
            password: '',
            signedIn: false
        })
    }


    render(){
        return(
            <View style ={styles.container}>

               <TextInput
                placeholder = 'Enter Email'
                onChangeText = {(email) => {this.setState({email})}}
                />

                <TextInput
                placeholder = 'Enter Password'
                onChangeText = {(password) => this.setState({password})}
                /> 
                <View style = {{marginTop: 50, flexDirection: 'row'}}>

                    <Button
                        style= {{color:"white"}}
                        title='Sign In'
                        onPress= {() => signIn(this.state.email, this.state.password)}
                    />
                    <Button
                        title='Sign Up'
                        onPress= {() => signUp(this.state.email, this.state.password)}
                    />
                    <Button
                        title='Sign Out'
                        onPress= {() => signOut()}
                    />

                </View> 

            </View>
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
        backgroundColor: "dodgerblue",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
    /*function App() {
      // Set an initializing state whilst Firebase connects
      const [initializing, setInitializing] = useState(true);
      const [user, setUser] = useState();


      // Handle user state changes
      function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);

      if (initializing) return null;

      if (!user) {
        return (
          <View>
            <Text>Login</Text>
          </View>
        );
      }

      return (
        <View>
          <Text>Welcome {user.email}</Text>
        </View>
      );
    }*/
