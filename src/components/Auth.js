import React, { useState, useEffect } from 'react';
import { Component } from "react";
import firebase from 'firebase';
//import {addCustomUser} from "./CustomUser.js";
//import CustomUser from "../components/CustomUser.js";
import {connect} from "react-redux";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID
} from '@env';

// const navigation = useNavigation();
class Auth extends Component {

  //setting the state to be empty since we want the input for the user to be in
  constructor(props){
      super(props);
      this.state = ({
          email: '',
          password: '',
          signedIn: false
      })
  }
}
const firebase_config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

if(!firebase.apps.length){
  var app = firebase.initializeApp(firebase_config);
}

const db = firebase.firestore(app);
const firebaseAuth = firebase.auth();

//New classes
class CustomUser{

  constructor(first, last, watchListID){
      this.first = first,
      this.last = last
      this.watchListID = watchListID
  }
}

class WatchList{

  constructor(creatorID, movies){
      this.creatorID = creatorID;
      this.movies = movies;
  }
}

// Firestore data converters
var customUserConverter = {
  toFirestore: function(customUser) {
      return {
          first: customUser.first,
          last: customUser.last,
          watchListID: customUser.watchListID
          }
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new CustomUser(data.first, data.last, data.watchListID);
  }
}

var watchListConverter = {
  toFirestore: function(watchList) {
      return {
          creatorID: watchList.creatorID,
          movies: watchList.movies
          }
  },
  fromFirestore: function(snapshot, options){
      const data = snapshot.data(options);
      return new WatchList(data.creatorID, data.movies);
  }
}


//functions
const addCustomUser = (firstName, lastName) =>{
  db.collection("customUser").withConverter(customUserConverter)
      .doc(firebaseAuth.currentUser.uid)
      .set({
        first: firstName,
        last: lastName,
        watchListID: firebaseAuth.currentUser.uid
      })
  .then(function() {
      addWatchList();
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

const addWatchList = () => {
  db.collection("watchList").withConverter(watchListConverter)
      .doc(firebaseAuth.currentUser.uid)
      .set({
        creatorID: firebaseAuth.currentUser.uid,
        movies: []
      })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}



async function signUp(email, password, first, last){

    var works;
    var not = "not";
    await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      addCustomUser(first, last);
      works = true;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        not = "That email address is already in use!"
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        not = "That email address is invalid!";
      }

      if (error.code === 'auth/weak-password') {
        console.log('The password must be at least 6 characters!');
        not = 'The password must be at least 6 characters!';
      }
      works = false;
      //console.error(error);
    });

    if(works){
      return works;
    }
    else{
      return not;
    }
}

async function signIn(email, password){
    var works;
    var not = "not";

    await firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account signed in!');
      works = true;
      //this.setState({signedIn:true});
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        not = "That email address is already in use!"
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        not = "That email address is invalid!";
      }

      if (error.code === 'auth/wrong-password') {
        console.log('Incorrect password!');
        not = "Incorrect password!";
      }

      if (error.code === 'auth/weak-password') {
        console.log('The password must be at least 6 characters!');
        not = 'The password must be at least 6 characters!';
      }
      works = false;

    });

    if(works){
      return works;
    }
    else{
      return not;
    }

}

const signOut = ()=>{

    firebaseAuth
    .signOut()
    .then(() => {
      console.log('User signed out!');
      //this.setState({signedIn:false});
    });
}

export{
  signIn,
  signOut,
  signUp
}
/*
function mapStateToProps(state){
  return {
      customUser: state.customUser
  }
}

function mapDispatchToProps(dispatch){
  return {
     addCustomUserToRedux: (customUser) => dispatch({
         type: "ADDCUSTOMUSER",
         payload: customUser
     })
  }
}


export default connect (mapStateToProps, mapDispatchToProps)(Auth)




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
                secureTextEntry = {true}
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
});*/
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
