import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Alert,
    TouchableHighlight
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import ThumbnailList from "./ThumbnailList";

const firestore = firebase.firestore();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function fetchRoom(roomID) {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});
    useEffect(() => {
        firestore
            .collection("squadRoom")
            .doc(roomID)
            .get()
            .then((doc) => {
                var cur_members = doc.data().members;
                cur_members.push(firebase.auth().currentUser.uid);
                setRoom({host: doc.data().host, members: cur_members, id:roomID});
                firestore
                    .collection("squadRoom")
                    .doc(roomID)
                    .set({host: doc.data().host, members: cur_members, id:roomID});
                console.log(room);
            }).catch((error) => {
            console.log("Error!: " + error);
        }).finally(() => setLoading(false)
        );
    }, []);

    if (loading) {
        return <ActivityIndicator/>;
    } else if(room == undefined){
        return <Text>
        <Text style={{
            color: "Red",
            textAlign: "center",
            fontWeight:"bold",
            textDecorationLine:"underline"
        }}>Room not found</Text>
    </Text>; 
    }else {
        return <Text>
            <Text style={{
                color: "white",
                textAlign: "center",
                fontWeight:"bold",
                textDecorationLine:"underline"
            }}>{"Room ID: "+room.id+"\n"}</Text>
            <Text style={{
                color: "white",
                fontSize:12
            }}>{"\n"+room.members.length+" members right now"}</Text>
        </Text>;
    }
}

function createRoom() {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});
    const newRoomID = makeid(4);
    const x = newRoomID;
    useEffect(() => {
        firestore
            .collection("squadRoom")
            .doc(x)
            .set({
                host:firebase.auth().currentUser.uid,
                members:[firebase.auth().currentUser.uid]
            })
            .then(() => {
                setRoom({
                    host:firebase.auth().currentUser.uid,
                    members:[firebase.auth().currentUser.uid,],
                    id: newRoomID
                });
            }).catch((error) => {
            console.log("Error!: " + error);
        }).finally(() => setLoading(false)
        );
    }, []);
    if (loading) {
        return <ActivityIndicator/>;
    }else {
        return <Text>
            <Text style={{
                color: "white",
                textAlign: "center",
                fontWeight:"bold",
                textDecorationLine:"underline"
            }}>{"Room ID: "+room.id+"\n"}</Text>
            <Text style={{
                color: "white",
                fontSize:12
            }}>{"\n"+room.members.length+" members right now"}</Text>
        </Text>;
    }
}

const SquadRoomData = ({roomID}) => {
    return fetchRoom(roomID);
}

const CreateRoomData = () => {
    return createRoom();
}

const add_to_room = ({room}) => {
    console.log(SquadRoomData(room));
}

const AddButton = ({room}) => {
    console.log("Room tried:" + room);
    const [modalVisible, setModalVisible] = useState(false);
    return (<View>
                <Modal animationType="slide" transparent={true}
                        visible={modalVisible} onRequestClose={() => {
                        Alert.alert("Modal view closed");
                    }}>
                    <View style={styles.container} marginTop={300} justifyContent={"center"} backgroundColor={"dodgerblue"}
                        opacity={0.94}>
                        <TouchableHighlight
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                            <ScrollView>
                                <SquadRoomData roomID={room}/>
                            </ScrollView>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <Button title="Find Room"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    color="white"
                />
            </View>);
}

const CreateRoomButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (<View>
                <Modal animationType="slide" transparent={true}
                        visible={modalVisible} onRequestClose={() => {
                        Alert.alert("Modal view closed");
                    }}>
                    <View style={styles.container} marginTop={300} justifyContent={"center"} backgroundColor={"dodgerblue"}
                        opacity={0.94}>
                        <TouchableHighlight
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                            <ScrollView>
                                <CreateRoomData/>
                            </ScrollView>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <Button title="Create Room"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    color="white"
                />
            </View>);
}

//function remove_from_room ({})

export default class RoomView extends Component {
    
    constructor(props){
        super(props);
        this.state = ({
            roomID:""
        });
    }
    render() {
        return (
            <View style={styles.container}>
           <TextInput onChangeText={(text) =>{
               this.setState({roomID:text});
               console.log("yee: "+this.state.roomID);
            }}></TextInput>               
            <AddButton room={this.state.roomID}/>
            <CreateRoomButton/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "grey",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});