import React, { Component } from "react";
import { StyleSheet, Text, View,SafeAreaView,TouchableWithoutFeedback,Keyboard} from "react-native";
import {Avatar,Input,Button} from  'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {swNavy,swOrange,swWhite} from '../styles/Colors';
import {connect} from 'react-redux';
import {updateCustomUser,changePassword} from '../api/CustomUserApi'
import * as firebase from "firebase";

class  Profile extends Component{
    constructor(props){
        super(props);
        this.state={
           first:this.props.customUser.first,
           last:this.props.customUser.last,
           oldPswd:'',
           newPswd:'',

        }
    }


updateFields=(first,last,currentpwd,newpswd,key)=>{
    let user = {
        first: first,
        last:last,
        watchListId:key
    }
    
    updateCustomUser(key,user);
    var newInfo = {...this.props.customUser}
    newInfo.first=user.first;
    newInfo.last =user.last;
    this.props.updateCustomUser(newInfo);
    if(currentpwd!='' || newpswd!=''){
        changePassword(currentpwd,newpswd);
    }
    
}

    render(){
        return(
            <SafeAreaView style={{backgroundColor:swOrange}}>
                
                <View  style={{backgroundColor:'swOrange', height:'100%', width:'100%'}}>
                <Avatar
                rounded
                size="large"
                title={this.props.customUser.first.charAt(0)+this.props.customUser.last.charAt(0)}
                source={{
                    showAccessory:true,
                    uri:'http://identicon-1132.appspot.com/random?/p=7'

                }}
                containerStyle={{alignSelf:'center', marginTop:70,marginBottom:10, backgroundColor:swWhite}}
                />
                <Text style={{alignSelf:'center', color:swWhite, fontSize:18, fontWeight:'700'}}>{this.props.customUser.first} {this.props.customUser.last}</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{marginTop:60,alignContent:"center"}}>
                    <Input
                        containerStyle={styles.inputs}
                        placeholder={this.props.customUser.first}
                        placeholderTextColor={swWhite}
                        label='First Name'
                        value={this.state.first}
                        inputStyle={{color:swWhite,fontSize:16}}
                        labelStyle={{fontSize:12,fontWeight:'300',color:swWhite}}

                        onChangeText={first => this.setState({first})}
                    />
                    <Input
                    containerStyle={styles.inputs}
                    placeholder={this.props.customUser.last}
                    placeholderTextColor={swWhite}
                    label='Last Name'
                    value={this.state.last}
                    inputStyle={{color:swWhite,fontSize:16}}
                    labelStyle={{fontSize:12,fontWeight:'300',color:swWhite}}

                    onChangeText={last => this.setState({last})}
                    />
                    <Input
                    containerStyle={styles.inputs}
                    secureTextEntry={true}
                    placeholderTextColor={swWhite}
                    label='Old Password'
                    inputStyle={{color:swWhite,fontSize:16}}
                    labelStyle={{fontSize:12,fontWeight:'300',color:swWhite}}

                    onChangeText={oldPswd => this.setState({oldPswd})}
                    />
                    <Input
                    containerStyle={styles.inputs}
                    secureTextEntry={true}
                    placeholderTextColor={swWhite}
                    label='New password'
                    inputStyle={{color:swWhite,fontSize:16}}
                    labelStyle={{fontSize:12,fontWeight:'300',color:swWhite}}

                    onChangeText={newPswd => this.setState({ newPswd })}
                    />
                    </View>
                    </TouchableWithoutFeedback>
                    <Button
                    title="Update"
                    titleStyle={{color:swOrange}}
                    containerStyle={{width:90, alignSelf:'center', marginTop:50}}
                    buttonStyle={{backgroundColor:swWhite, borderRadius:30}}
                    onPress={()=> {
                    this.updateFields(this.state.first,this.state.last,this.state.oldPswd,this.state.newPswd,this.props.customUser.watchListId);
                    this.props.navigation.goBack(null);}}
                    />

                
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
    }
})


function mapStateToProps(state){
    return {
        customUser: state.customUser
    }
}

function mapDispatchToProps(dispatch){
    return{
        updateCustomUser: (customUser)=> dispatch({
            type:"ADDCUSTOMUSER",
            payload: customUser
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)