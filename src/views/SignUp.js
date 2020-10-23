import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar, TextInput,TouchableWithoutFeedback,Keyboard, Alert} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import {swGrey, swOrange, swWhite} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";
import{Auth} from "../components/Auth.js";
import {signUp} from "../components/Auth.js"
import { Button,Input} from "react-native-elements";

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = ({
            email: '',
            first: '',
            last:'',
            password:'',
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <View
                    style={{
                    height: 50,
                    width: '75%',
                    marginLeft: '12.5%'
                    }}
                />
                <Text style={styles.header}>SIGN UP</Text>
                <StatusBar
                barStyle='light-content'
                />
                <Input
                    inputContainerStyle={styles.input}
                    onChangeText={email => this.setState({ email:email})}
                    value={this.state.email}
                    placeholder='email'
                    leftIcon={
                        <Icon
                        name='ios-mail'
                        size={24}
                        color='white'
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    inputStyle={{color:swWhite}}
                    placeholderTextColor={'#d4d4d4'}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='username'
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
                    onChangeText = {password => this.setState({ password:password})}
                    value={this.state.password}
                    placeholder='password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                        name='md-key'
                        size={24}
                        color='white'
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    inputStyle={{color:swWhite}}
                    placeholderTextColor={'#d4d4d4'}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='re-type password'
                    secureTextEntry={true}
                    leftIcon={
                        <Icon
                        name='md-key'
                        size={24}
                        color='white'
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    inputStyle={{color:swWhite}}
                    placeholderTextColor={'#d4d4d4'}
                />
                
            </View>
            </TouchableWithoutFeedback>
                <View>
                
                    <Button
                        type={'clear'}
                        containerStyle= {styles.buttonContainer}
                        title= "REGISTER"
                        titleStyle={{color:swOrange}}
                        onPress= {() => Alert.alert("SignUp","Sign up page")}
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
        backgroundColor: swWhite,
        borderRadius: 30,
        marginTop:70,
        width: '40%',
    },

    header: {
        color:swWhite,
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:30,
        marginTop:"20%",
        marginBottom:80,
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