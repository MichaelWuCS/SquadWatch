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
import { swBlack, swBlue, swGreen, swGrey, swPink, swPurple, swOrange } from "../styles/Colors";
import { connect } from "react-redux";

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
                    .update({ members: cur_members });
                this.setState({
                    data: data_store
                });
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
        firestore
            .collection("squadRoom")
            .doc(roomID)
            .onSnapshot(querySnapshot=>{
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
            })
    }

    renderMember = (memberObj) => {
        console.log(memberObj);
        const cur_lightness = 15 + memberObj.index * 3;
        let member = memberObj.item;
        let nameStr = member.first + " " + member.last.charAt(0);
        if(member.watchListID === this.state.data.host){
            nameStr = nameStr +" (host)";
        }
        return (
            <View flexDirection={"row"} height={50}
                  justifyContent={"center"}
                  alignItems={"center"}
                  backgroundColor={"hsl(211,53%," + cur_lightness + "%)"}
                  width={450}>
                <Text style={styles.text}>
                    {nameStr}
                </Text>
                <TouchableOpacity style={{ paddingLeft: 50 }}>
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
            .then((doc)=>{
                this.setState({data:doc.data()});

            });
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator />;
        } else if (this.state.error) {
            return (
                <View style={styles.container} backgroundColor={"red"}>
                    <Text
                        style={styles.text}>{"An error has occurred. Make sure you entered the name correctly."}</Text>
                </View>
            );
        } else {
            // LOADED ROOM VIEW
            return (<View backgroundColor={swGrey}>

                <TouchableOpacity width={10}
                                  // onPress={() => {
                                  //     this.props.navigation.push("Recommendations")
                                  // }}
                >
                    <View style={{ alignSelf: "center", justifyContent: "center", borderRadius: 2 }}>
                        <MaterialCommunityIcons style={{ alignSelf: "center" }} name="infinity" color={swOrange}
                                                size={50} />
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.container}
                          width={"22%"}
                          borderBottomColor={"white"}
                          borderBottomWidth={2}
                          marginBottom={10}>
                        <Text style={styles.text}>
                            Members
                        </Text>
                    </View>
                    <FlatList data={this.dataMembers}
                              renderItem={this.renderMember}
                              keyExtractor={item => item.watchListID}>
                    </FlatList>
                </View>
            </View>);
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
        backgroundColor: swBlue,
        width: "100%",
        height: undefined,
        alignContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});
