import React, { Component, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native";
import { MaterialCommunityIcons,Ionicons } from "@expo/vector-icons";
import  {Button,Input}  from 'react-native-elements';
import { TMDB_KEY } from "@env";
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID
} from "@env";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { swWhite,swBlue, swGreen, swGrey,swNavy,swOrange} from "../styles/Colors";
import { connect } from "react-redux";


// const firebase_config = {
//     apiKey: FIREBASE_API_KEY,
//     authDomain: FIREBASE_AUTH_DOMAIN,
//     databaseURL: FIREBASE_DB_URL,
//     storageBucket: FIREBASE_STORAGE_BUCKET,
//     projectId: FIREBASE_PROJECT_ID,
//     appId: FIREBASE_APP_ID
// };


!firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
const firestore = firebase.firestore();
const auth = firebase.auth();
export class SyncScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [], //Data here is a list of roomIDs in use
            searching: false,
            roomFind: "",
            modalVisible: false,
            roomError:'',
        };
        this.uid;
    }

    makeid(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
        var charactersLength = characters.length;
        while (result == "" && !(this.state.data.includes(result))) {
            result = "";
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        return result;
    }

    componentDidMount() {
        console.log(this.props);
        this.uid = auth.currentUser.uid;//this.props.customUser.watchListId;
        console.log("currentuser:" + this.uid);
        this.fetchData();
    }

    fetchData() {
        this.setState({ loading: true });
        firestore
            .collection("squadRoom")
            .get()
            .then((querySnapshot) => {
                var temp = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots=
                    temp.push(doc.id);
                });
                this.setState({ loading: false, data: temp });
            });
    }

    createNewRoom() {
        var newRoomID = this.makeid(6);
        console.log("New room id generated: " + newRoomID);
        firestore
            .collection("squadRoom")
            .doc(newRoomID)
            .set({ host: this.uid, members: [], isActive: true, syncing: false }).then(() => {
            this.props.navigation.push("Room", {
                id: newRoomID,
                name: "Room Code: " + newRoomID
            });
        });

    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    searchButton = () => {
            return (
                <View 
                style={{
                    justifyContent: 'center'
                }}
                >
                    <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onDismiss={() => {
                    this.setState({roomError:''})
                  }}
                
                >
                    <View style={{
                                    marginTop: '80%',
                                    backgroundColor:swNavy,
                                    alignSelf:'center',
                                    borderRadius: 20,
                                    padding: 20,
                                    shadowColor:swOrange,
                                    shadowOffset: {
                                    width: 0,
                                    height: 2
                                    },
                                    shadowOpacity: 0.40,
                                    shadowRadius: '100%',
                                    elevation: 5,
                                    width:'60%',
                                    height:'20%'
                                }}>
                        <View style>
                            <Input
                            placeholder="Room number"
                            autoCapitalize='characters'
                            autoCorrect={false}
                            inputStyle={{color:swWhite}}
                            containerStyle={{
                                alignSelf:'center',
                                width:'70%',
                                borderBottomColor:swWhite,
                            }}
                            errorMessage={this.state.roomError}
                            onChangeText={(text) => {
                                this.setState({ roomFind: text });
                            }}
                            />
                            <View style={{flexDirection:'row', marginTop:'10%'}}>
                            <Button title='Cancel'  buttonStyle={{borderRadius:10,backgroundColor:'red',  marginRight:'20%'}}
                            onPress={()=>{
                                this.setModalVisible(false);
                            }}
                            />

                            <Button title='Join' buttonStyle={{borderRadius:10,backgroundColor:swBlue,  marginLeft:'20%'}}
                            onPress={() => {       
                                console.log(this.state.roomFind);
                                if(this.state.roomFind.length<6){
                                    this.setState({roomError:'Invalid Room'})
                                }else{
                                    this.props.navigation.push("Room", {
                                        id: this.state.roomFind,
                                        name: "Room Code: " + this.state.roomFind
                                    });
                                    this.setModalVisible(false);
                                }      
                                    
                            }}
                            />
                            </View>
                        </View>
                        
                    </View>
                </Modal>
                <Button
                type={'clear'}
                containerStyle={{alignSelf:"center",
                backgroundColor:swBlue,
                justifyContent:'center', 
                height:100, 
                width:100,
                borderRadius:20,
                
                }}
                buttonStyle={{alignSelf:'center'}}
                icon={ <Ionicons name='md-add-circle'  color='white' size={50} /> }
                onPress={()=>{
                    this.setModalVisible(true);
                }}
                />
                <Text  style={{color:swWhite,fontWeight:'600', alignSelf:'center',marginTop:'2%'}}>Join Room</Text>
                </View>
                
            );
   
    };

    render() {
        !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
        if (this.state.loading) {
            return <ActivityIndicator />;
        } else {
            return (
                <View style={{ backgroundColor: swGrey, height: "100%", width: "100%"}}>
                    <View style={{
                        marginTop:'30%',
                        marginBottom:'30%'
                    }}>
                    <Button
                    type={'clear'}
                    containerStyle={{alignSelf:"center",
                    backgroundColor:swGreen,
                    justifyContent:'center', 
                    height:100, 
                    width:100,
                    borderRadius:20,
                    
                    }}
                    buttonStyle={{alignSelf:'center'}}
                    icon={ <Ionicons name='md-film'  color='white' size={50} /> }
                    onPress={()=>{this.createNewRoom()}}
                    />
                    <Text  style={{color:swWhite,fontWeight:'600', alignSelf:'center',marginTop:'2%'}}>Create Room</Text>
                    </View>
                    
                    {this.searchButton()}
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        customUser: state.customUser
    };

}


export default connect(mapStateToProps, null)(SyncScreen);

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        height: "31%",
        width: "75%",
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        padding: "1%"
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 30,
        paddingVertical: 15,
        paddingHorizontal: "5%"
    },
    input: {
        borderRadius: 25,
        height: "11%",
        width: "75%",
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "1%"
    },
    textIn: {
        textAlign: "center",
        color: "#fff",
        fontSize: 30,
        paddingVertical: 15,
        paddingHorizontal: "5%"
    }
});

