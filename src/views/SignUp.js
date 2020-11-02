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
import {connect} from 'react-redux'

export class SignUp extends Component {
  
    constructor(props){
        super(props);
        this.state = ({
            date:'',
            email: '',
            first: '',
            last:'',
            password:'',
            confirmPassword: '', 
            errorMessage: ''
        })
    }
    async componentDidMount () {
        const year = new Date().getFullYear();
        this.setState({date:year })
      }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
            <View
                    style={{
                    height: 20,
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
                    onChangeText = {(email) => this.setState({email})}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='first'
                    leftIcon={
                        <Icon
                        name='md-person'
                        size={24}
                        color='white'
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    placeholderTextColor={'#d4d4d4'}
                    inputStyle={{color:swWhite}}
                    onChangeText = {(first) => this.setState({first})}
                />
                <Input
                    inputContainerStyle={styles.input}
                    placeholder='last'
                    leftIcon={
                        <Icon
                        name='md-person'
                        size={24}
                        color='white'
                        />
                    }
                    leftIconContainerStyle={styles.leftIconStyle}
                    placeholderTextColor={'#d4d4d4'}
                    inputStyle={{color:swWhite}}
                    onChangeText = {(last) => this.setState({last})}
                />
                <Input
                    inputContainerStyle={styles.input}
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
                    onChangeText = {(password) => this.setState({password})}
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
                    onChangeText = {(confirmPassword) => this.setState({confirmPassword})}
                />
                
            </View>
            </TouchableWithoutFeedback>
                <View>
                
                    <Button
                        type={'clear'}
                        containerStyle= {styles.buttonContainer}
                        title= "REGISTER"
                        titleStyle={{color:swOrange}}
                        onPress= {() => {
                            if(this.state.password.localeCompare(this.state.confirmPassword) == 0){
                            }
                            else{
                                Alert.alert(
                                    'Error Signing Up',
                                    'passwords must match',
                                    [
                                      { text: 'OK', onPress: () => console.log('OK Pressed') }
                                    ],
                                    { cancelable: false }
                                  );
                                  return;
                            }
                            let valid = (signUp(this.state.email, this.state.password, this.state.first, this.state.last));
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
                                        'Error Signing Up',
                                        data,
                                        [
                                          { text: 'OK', onPress: () => console.log('OK Pressed') }
                                        ],
                                        { cancelable: false }
                                      );
                                }
                            });
                            (this.props.addCustomUserToRedux({
                                first: this.state.first,
                                last: this.state.last, 
                                watchListId: ""
                               }));
                        }}
                    />
                </View>
                <Text style={{bottom:25, position:'absolute',color:'rgba(255, 255, 255, 0.25)',alignSelf:'center'}}>SquadWatch Inc. {this.state.date}</Text>
            </SafeAreaView>
        );
    }
}

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

export default connect (mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:swOrange,
    },
    buttonContainer:{
        alignSelf:'center',
        backgroundColor: swWhite,
        borderRadius: 30,
        marginTop:30,
        width: '40%',
    },

    header: {
        color:swWhite,
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:30,
        marginTop:"10%",
        marginBottom:40,
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