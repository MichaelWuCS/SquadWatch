import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View, StatusBar,TouchableWithoutFeedback,Keyboard, Alert} from "react-native";
import {Button,Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/Ionicons';
import {swNavy, swOrange,swWhite} from '../styles/Colors'
import {signIn} from "../components/Auth"
import firebase from 'firebase';


const firebaseAuth = firebase.auth();

function showEror(error){
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed')
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
}
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            date:''
        }
    }
    async componentDidMount () {
        const year = new Date().getFullYear();
        this.setState({ date:year })
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
                    }}
                />
                <Text style={styles.header}>LOGIN</Text>
                <StatusBar
                barStyle='light-content'
                />
                <Input
                inputContainerStyle={styles.input}
                placeholder='email/username'
                inputStyle={{color:swWhite}}
                leftIcon={
                    <Icon
                    name='md-person'
                    size={24}
                    color='white'
                    />
                }
                leftIconContainerStyle={styles.leftIconStyle}
                placeholderTextColor={'#d4d4d4'}
                onChangeText = {(email) => this.setState({email})}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='password'
                    secureTextEntry={true}
                    inputStyle={{color:swWhite}}
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
                    onChangeText = {(password) => this.setState({password})}
                />
                    </View>
                </TouchableWithoutFeedback>
                <Button type='clear' title='forgot password?'
                icon={<Icon
                    name="md-information-circle"
                    size={20} color={swWhite}
                    style={{marginRight:5}}
                />}
                titleStyle={{color:swWhite, fontWeight:'200', fontSize:15}}
                leftIcon
                onPress= {() => {
                    //(firebaseAuth.sendPasswordResetEmail(this.state.email));
                    Alert.alert(
                        'Password reset email has been sent!',
                        'please wait some minutes',
                        [
                          { text: 'OK', onPress: () => console.log('OK Pressed') }
                        ],
                        { cancelable: false }
                      );}}
                />
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
                    onPress= {() => {
                        let valid = (signIn(this.state.email, this.state.password));
                        valid.then((data) =>{
                            console.log(data);
                            if(data == true){
                                
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Dashboard' }],
                                  });
                            }
                            else {
                                Alert.alert(
                                    'Error Logging In',
                                    data,
                                    [
                                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                                    ],
                                    { cancelable: false }
                                  );
                            }
                        });
                    }}
                />

            </View>
            <Text style={{bottom:25, position:'absolute',color:'rgba(255, 255, 255, 0.25)',  alignSelf:'center'}}>SquadWatch Inc. {this.state.date}</Text>
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
