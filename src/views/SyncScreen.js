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
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import { swBlue, swGreen, swGrey, swPink, swPurple } from "../styles/Colors";

export default class SyncScreen extends Component{
    render(){
        return (
            <View style={{backgroundColor:swGrey, height:"100%", width:"100%", flex:1}}>
                <View height="25%"/>
                <TouchableOpacity>
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