import React, { Component, useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import {  swWhite, swGrey, swPink, swPurple, swOrange } from "../styles/Colors";
import { connect } from "react-redux";
import {Avatar} from "react-native-elements"
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-initials-sprites';

const avatar = new Avatars(sprites);

const firestore = firebase.firestore();

export class RoomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            data: {}
        };
        this.dataMembers = [];
        this.id;
    }

    componentDidMount() {
        this.id = this.props.route.params.id.toUpperCase();
        console.log("room view");
        this.fetchRoom(this.id);
    }

    fetchRoom(roomID) {
        this.setState({ loading: true });
        firestore
            .collection("squadRoom")
            .doc(roomID)
            .get()
            .then((doc) => {
                let cur_members = doc.data().members;
                cur_members.push(this.props.customUser.watchListId);
                let data_store = doc.data();
                //console.log("we here buddy");
                //console.log(doc.data());
                data_store.members = cur_members;
                firestore
                    .collection("squadRoom")
                    .doc(roomID)
                    .update({ members: cur_members })
                    .catch((error)=>{
                        this.setState({error:error, loading:false})
                });
                this.setState({
                    data: data_store
                });
                //this.setState({loading:false});
                this.initListener(roomID);
                // for (let i = 0; i < data_store.members.length; i++) {
                //     //console.log("iteration " + i);
                //     firestore
                //         .collection("customUser")
                //         .doc(data_store.members[i])
                //         .get()
                //         .then((doc) => {
                //             this.dataMembers.push(doc.data());
                //             //console.log(this.dataMembers);
                //             this.setState({ loading: false });
                //         });
                // }
            }).catch((error) => {
            this.setState({ error: error, loading: false });
            console.warn("Error!: " + error);
        });
    }

    initListener(roomID){
        const unsub = firestore
            .collection("squadRoom")
            .doc(roomID)
            .onSnapshot(querySnapshot=>{
                console.log(querySnapshot.data());
                this.setState({loading:true, data:querySnapshot.data()});
                this.dataMembers = [];
                for (let i = 0; i < querySnapshot.data().members.length; i++) {
                    console.log("iteration " + i);
                    firestore
                        .collection("customUser")
                        .doc(querySnapshot.data().members[i])
                        .get()
                        .then((doc) => {
                            this.dataMembers.push(doc.data());
                            console.log(this.dataMembers);
                            this.setState({ loading: false });
                        });
                }
                if(!querySnapshot.data().members.includes(querySnapshot.data().host) && querySnapshot.data().members.length !== 0){
                    let newHost = querySnapshot.data().members[0];
                    firestore
                        .collection("squadRoom")
                        .doc(roomID)
                        .update({host:newHost})
                        .catch(e=>{
                            console.warn(e);
                        });
                }
                if(querySnapshot.data().syncing){
                    console.log(this.state.data);
                    console.log("===>>>===>>>")
                    console.log(this.props.navigation);
                    console.log("<<<===<<<===")
                    this.props.navigation.push("SyncAnimation", {
                        members: this.state.data.members
                    });
                    unsub()
                    firestore
                        .collection("squadRoom")
                        .doc(roomID)
                        .update({syncing:false})
                        .catch(e =>{
                            console.warn(e);
                        })
                }
            });
    }

    renderMember = (memberObj) => {
        console.log(memberObj);
        const cur_lightness = 15 + memberObj.index * 3;
        let member = memberObj.item;
        let nameStr = member.first + " " + member.last.charAt(0);
        let initials = nameStr.split(" ").map((n)=>n[0]).join("");
        if(member.watchListID === this.state.data.host){
            nameStr = nameStr +" (host)";
        }
        return (
            <View flexDirection={"row"} height={50}
                  justifyContent={"center"}
                  alignSelf={'center'}
                  alignItems={"center"}
                  backgroundColor={"hsl(211,53%," + cur_lightness + "%)"}
                  width={"90%"}
                  marginBottom={'5%'}
                  borderRadius={20}
                  >
                <Avatar
                rounded
                containerStyle={{alignSelf:"center"}}
                size="small"
                title={initials}
                source={{
                    showAccessory:true,
                    uri:'http://identicon-1132.appspot.com/random?/s=1'

                }}
                containerStyle={{alignSelf:'center', backgroundColor:swWhite, marginRight:'5%'}}
                />
                <Text style={styles.text}>
                    {nameStr}
                </Text>
                <TouchableOpacity style={{ paddingLeft: '20%' }}>
                    <MaterialCommunityIcons name={"dots-vertical"} color={"white"} size={20} />
                </TouchableOpacity>
            </View>
        );
    };

    componentWillUnmount() {
        let curIDs = this.state.data.members;
        const ind_to_rem = curIDs.indexOf(this.props.customUser.watchListId);
        curIDs.splice(ind_to_rem,1);
        let now_active = curIDs.length>0;
        firestore
            .collection("squadRoom")
            .doc(this.id)
            .update({members: curIDs, isActive:now_active})
            .catch(e=>{
                console.warn(e);
            })
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator />;
        } else if (this.state.error) {
            return (
                <View style={styles.container}>
                    <Text
                        style={styles.text}>{"An error has occurred. Make sure you entered the name correctly."}</Text>
                </View>
            );
        } else {
            // LOADED ROOM VIEW
            return (
            <View backgroundColor={swGrey}>


                <View style={styles.container}>
                    <View style={{marginTop:'10%', marginBottom:'10%'}}>
                        <Text style={{fontSize: 25,
                                        fontWeight: "bold",
                                        color:swOrange,}}>
                            Members
                        </Text>
                    </View>
                    <View style={{width:'100%',justifyContent:"center",alignSelf:'center', height:'70%'}}>
                    <FlatList
                              style={{alignSelf:'center'}}
                              data={this.dataMembers}
                              renderItem={this.renderMember}
                              keyExtractor={item => item.watchListID}
                              height={"100%"}
                              >
                    </FlatList>
                    </View>
                    <TouchableOpacity width={10}
                                  onPress={() => {
                                      firestore
                                          .collection("squadRoom")
                                          .doc(this.id)
                                          .update({syncing:true})
                                          .catch((error)=>{this.setState({error:true})});

                                  }}
                >
                    <View style={styles.sync_btn}>
                        <MaterialCommunityIcons style={{ alignSelf: "center" }} name="infinity" color={swWhite}
                                                size={50} />
                    </View>
                </TouchableOpacity>
                </View>

            </View>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        customUser: state.customUser
    }

}

function mapDispatchToProps(dispatch){
    return {
        addCustomUserToRedux: (customUser)=> dispatch({
            type: "ADDCUSTOMUSER",
            payload: customUser
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: swGrey,
        width: "100%",
        height: '100%',
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: '300',
        color: "white",
    },
    sync_btn:{
        width:60,
        height:60,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius:60,
        marginTop:'5%',
        backgroundColor:swOrange,
        shadowColor:'black',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 2.32,
    }
});
