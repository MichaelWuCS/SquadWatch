import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View,StatusBar, Alert } from "react-native";
import* as Font from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {swOrange,swNavy,swWhite} from '../styles/Colors';
import {Login} from '../views/Login'
import {SignUp} from '../views/SignUp'

export default class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            date:''
        }
    }
    async componentDidMount () {
        const year = new Date().getFullYear();
        await Font.loadAsync({
            OpenSansBold: require('../../assets/fonts/OpenSans-Bold.ttf'),
            OpenSans:require('../../assets/fonts/OpenSans-Regular.ttf'),
            OpenSansLight: require('../../assets/fonts/OpenSans-Light.ttf'),
        });
        this.setState({ loading: false,date:year })
      }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={{
                marginTop:130}} >
                <Text style={styles.header1}>squad</Text>
                <Text style={styles.header2}>watch</Text>
                </View>
                <Button
                type='clear'
                titleStyle={{fontSize:20, color:swWhite,fontWeight:'bold'}}
                containerStyle={styles.loginbtn}
                title="LOGIN"
                onPress={()=> this.props.navigation.navigate('Login') }
                />
                <Text style={{marginTop:"30%",color:swWhite,fontSize:18,
                opacity:0.8,fontFamily:'OpenSansLight', width:'50%', textAlign:'center'}}> Don't have an Account?
                        Let's create one!
                </Text>
                <Button
                    title=""
                    containerStyle={styles.createBtn}
                    type='clear'
                    icon={
                        <Icon
                        name='md-create' size={40} color={swOrange}
                        />
                    }
                    onPress={()=> this.props.navigation.navigate('SignUp') }
                />
    <Text style={{bottom:0, position:'absolute',color:'rgba(255, 255, 255, 0.25)'}}>SquadWatch Inc. {this.state.date}</Text>
            </SafeAreaView>
        );
    }
};
const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor:swNavy,
        },
        header1:{
            textTransform:'capitalize',
            fontFamily:'OpenSansBold',
            fontSize:30,
            color:swOrange,
            marginBottom:"-3%",
        },
        header2:{
            textTransform:'capitalize',
            fontFamily:'OpenSansLight',
            fontSize:30,
            color:swOrange,
            marginLeft:"10%",
        },

        loginbtn:{
            marginTop:"40%",
            backgroundColor:"rgba(214, 86, 0, 0.35)",
            width:"30%",
            fontSize:23,
            borderRadius:30,

        },
        createTxt:{

        },
        createBtn:{
            marginTop:'10%', width:60,height:60,
            borderRadius:60,
            backgroundColor:swWhite,
        }
})