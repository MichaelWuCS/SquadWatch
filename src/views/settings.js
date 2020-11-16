import React, { Component } from "react";
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import  { swGrey,swWhite } from "../styles/Colors";
import firebase from 'firebase';
import { signOut } from "../components/Auth";

export default class Settings extends Component {
    render() {
       
        return (
            <SafeAreaView style={{backgroundColor:swGrey,flex:1}}>
                <View style={styles.container}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.props.navigation.navigate('Profile')} >
                    <Icon  name='ios-brush' color={swWhite} size={30}/>
                    <Text style={styles.text}>Edit Profile</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row'}}>
                <Icon  name='ios-finger-print' color={swWhite} size={30}/>
                    <Text style={styles.text}>Privacy</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row'}}>
                <Icon  name='ios-help-buoy' color={swWhite} size={30}/>
                    <Text style={styles.text}>Get Help</Text>
                    </TouchableOpacity>
                <TouchableOpacity
                style={{flexDirection:'row'}} 
                onPress={async() => {
                        try {
                            await(signOut());
                            
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Starter' }],
                                  });
                
                        } catch (error) {
                            console.log(err);
                        }
                        
                        
                }}>
                    <Icon  name='md-log-out' color={'red'} size={30}/>
                    <Text style={styles.logout}>Logout</Text></TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        width:'100%',
        height:'100%',
        marginTop:'40%',
        padding:10,
        paddingLeft:20,

    },
    text:{
        fontSize:25,
        color:swWhite,
        marginBottom:'10%',
        marginLeft:'5%'
     
    },
    logout:{
        fontSize:24,
        color:'red',
        marginLeft:'5%'
   
    },

});
