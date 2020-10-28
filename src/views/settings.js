import React, { Component } from "react";
import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu } from 'react-native-paper';
import  { swGrey,swWhite } from "../styles/Colors";
import firebase from 'firebase';
import { signOut } from "../components/Auth";

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
                <Menu.Item titleStyle={styles.text} onPress={() => {}} title="Edit Profile" />
                <Menu.Item titleStyle={styles.text} onPress={() => {}} title="Privacy" />
                <Menu.Item titleStyle={styles.text} onPress={() => {}} title="Get Help" />
                <Menu.Item  titleStyle={styles.logout} onPress={async() => {
                        try {
                            let logout= await(signOut());
                            
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Starter' }],
                                  });
                
                        } catch (error) {
                            console.log(err);
                        }
                        
                        
                }} title="Logout" />

                
            
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
        width:"90%",
       
    },
    cardDivider:{
        marginBottom:0,
    }

});
