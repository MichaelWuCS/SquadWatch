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

const firestore = firebase.firestore();

export default class RoomScreen extends Component {
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
                //cur_members.push(firebase.auth().currentUser.uid);
                let data_store = doc.data();
                console.log(doc.data());
                data_store.members = cur_members;
                firestore
                    .collection("squadRoom")
                    .doc(roomID)
                    .update({ members: cur_members });
                this.setState({
                    data: data_store
                });
                for (let i = 0; i < data_store.members.length; i++) {
                    console.log("iteration " + i);
                    firestore
                        .collection("customUser")
                        .doc(data_store.members[i])
                        .get()
                        .then((doc) => {
                            this.dataMembers.push(doc.data());
                            console.log(this.dataMembers);
                            this.setState({ loading: false });
                        });
                }
            }).catch((error) => {
            this.setState({ error: error, loading: false });
            console.warn("Error!: " + error);
        });
    }

    renderMember = (memberObj) => {
        console.log(memberObj);
        const cur_lightness = 15 + memberObj.index * 3;
        let member = memberObj.item;
        return (
            <View flexDirection={"row"} height={50}
                  justifyContent={"center"}
                  alignItems={"center"}
                  backgroundColor={"hsl(211,53%," + cur_lightness + "%)"}
                  width={450}>
                <Text style={styles.text}>
                    {member.first + " " + member.last.charAt(0)}
                </Text>
                <TouchableOpacity style={{ paddingLeft: 50 }}>
                    <MaterialCommunityIcons name={"dots-vertical"} color={"white"} size={20} />
                </TouchableOpacity>
            </View>
        );
    };

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

                <TouchableOpacity width={10}>
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
                              keyExtractor={item => item.watchlistID}>
                    </FlatList>
                </View>
            </View>);
        }
    }
}


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
