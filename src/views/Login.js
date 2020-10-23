import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar,TouchableWithoutFeedback,Keyboard, Alert} from "react-native";
import {Button,Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import {swGrey, swOrange,swWhite} from '../styles/Colors'
import {signIn} from "../components/Auth.js"

export default class Login extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                    <View
                    style={{
                    height: 50,
                    width: '75%',
                    }}
                />
                <Text style={styles.header}>LOGIN</Text>
                <StatusBar
                barStyle='light-content'
                />
                <Input
                inputContainerStyle={styles.input}
                placeholder='email/username'
                leftIcon={
                    <Icon
                    name='md-person'
                    size={24}
                    color='white'
                    />
                }
                leftIconContainerStyle={styles.leftIconStyle}
                placeholderTextColor={'#d4d4d4'}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                        name='md-key'
                        size={24}
                        color={swWhite}
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    inputStyle={{color:swWhite}}
                    placeholderTextColor={'#d4d4d4'}
                />
                    </View>
                </TouchableWithoutFeedback>
                <View style= {styles.buttonContainer}>
                
                <Button
                    type={'clear'}
                    title= ""
                    containerStyle={{alignSelf:"center"}}
                    icon={
                        <Icon
                         name="ios-arrow-forward" size={50} color={swWhite} style={{alignItems:'center',opacity:1}}
                        />
                    }
                    titleStyle={{color:swOrange}}
                    onPress= {() => Alert.alert('not impremented yet')}
                />
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
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 80,
        marginTop:80,
        width: 65,
        height:65,
    },
    header: {
        color:swWhite,
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:30,
        marginTop:"20%",
        marginBottom:70,
    },
    input:{
        alignSelf:'center',
        width:'70%',
        borderBottomColor:swWhite,
    },
    leftIconStyle:{
        marginRight:20,
    }
});