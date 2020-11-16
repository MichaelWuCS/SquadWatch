import React, { Component } from "react";
import { StyleSheet, Text, View,SafeAreaView,} from "react-native";
import {Avatar,Input,Button} from  'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {swNavy,swOrange,swWhite,swGreen} from '../styles/Colors';
import {connect} from 'react-redux'

class  Profile extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }


    render(){
        return(
            <SafeAreaView style={{backgroundColor:swOrange}}>
                <View>
                    <View>
                        <Text style={styles.header}>Best Pick</Text>
                        <Icon name="ios-checkmark-circle" color={swGreen} size={40}></Icon>
                    </View>
                    <View>
                        <Text style={styles.hon}>Honorable Mentions</Text>
                        
                    </View>
                </View>
               
            </SafeAreaView>

        );
    }
}

const  styles = StyleSheet.create({
    inputs:{
        width:'80%',
        alignSelf:'center',
       borderColor:'yellow'
    },
    header:{
        fontSize:30,
        fontWeight:800,
        color:swGreen
    },
    hon:{
        fontSize:20,
        fontWeight:100
    }
})
