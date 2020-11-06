import React, { Component } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { swNavy, swOrange, swWhite } from "../styles/Colors";
import { signIn } from "../components/Auth.js";
import { connect } from "react-redux";
import { RoomScreen } from "./RoomScreen";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            date: ""
        };
    }

    async componentDidMount() {
        const year = new Date().getFullYear();
        this.setState({ date: year });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <View
                            style={{
                                height: 50,
                                width: "75%"
                            }}
                        />
                        <Text style={styles.header}>LOGIN</Text>
                        <StatusBar
                            barStyle='light-content'
                        />
                        <Input
                            inputContainerStyle={styles.input}
                            placeholder='email/username'
                            inputStyle={{ color: swWhite }}
                            leftIcon={
                                <Icon
                                    name='md-person'
                                    size={24}
                                    color='white'
                                />
                            }
                            leftIconContainerStyle={styles.leftIconStyle}
                            placeholderTextColor={"#d4d4d4"}
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <Input
                            inputContainerStyle={styles.input}
                            placeholder='password'
                            secureTextEntry={true}
                            inputStyle={{ color: swWhite }}
                            leftIcon={
                                <Icon
                                    name='md-key'
                                    size={24}
                                    color={swWhite}
                                />
                            }
                            leftIconContainerStyle={styles.leftIconStyle}
                            inputStyle={{ color: swWhite }}
                            placeholderTextColor={"#d4d4d4"}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <Button type='clear' title='forgot password?'
                        icon={<Icon
                            name="md-information-circle"
                            size={20} color={swWhite}
                            style={{ marginRight: 5 }}
                        />}
                        titleStyle={{ color: swWhite, fontWeight: "200", fontSize: 15 }}
                        leftIcon
                        onPress={async () => {
                            await (firebase.auth().sendPasswordResetEmail(this.state.email));
                        }}
                />
                <View style={styles.buttonContainer}>

                    <Button
                        type={"clear"}
                        title=""
                        containerStyle={{ alignSelf: "center" }}
                        icon={
                            <Icon
                                name="ios-arrow-forward" size={50} color={swWhite}
                                style={{ alignItems: "center", opacity: 1 }}
                            />
                        }
                        titleStyle={{ color: swOrange }}
                        onPress={async () => {
                            try {
                                await (signIn(this.state.email, this.state.password));
                                //if(signInn){
                                firebase.firestore()
                                    .collection("customUser")
                                    .doc(firebase.auth().currentUser.uid)
                                    .get()
                                    .then(doc => {
                                        this.props.addCustomUserToRedux({
                                            first: doc.data().first,
                                            last: doc.data().last,
                                            watchListId: doc.data().watchListID
                                        });
                                        console.log(this.props.customUser);
                                        firebase.firestore()
                                            .collection("watchList")
                                            .doc(doc.data().watchListID)
                                            .get()
                                            .then((wldoc) => {
                                                console.log(wldoc.data());
                                                this.props.updateWatchList(wldoc.data().movies);
                                                console.log("----");
                                                //console.log(this.props.watchList);
                                                console.log("----");
                                                this.props.navigation.reset({
                                                    index: 0,
                                                    routes: [{ name: "Dashboard" }]
                                                });
                                            })
                                            .catch(error =>{
                                                console.log(error);
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });

                                //}
                            } catch (error) {
                                console.log(error);
                            }


                        }}
                    />

                </View>
                <Text style={{
                    bottom: 25,
                    position: "absolute",
                    color: "rgba(255, 255, 255, 0.25)",
                    alignSelf: "center"
                }}>SquadWatch Inc. {this.state.date}</Text>
            </SafeAreaView>


        );
    }
}

function mapStateToProps(state) {
    return {
        customUser: state.customUser,
        watchList: state.watchList
    };

}

function mapDispatchToProps(dispatch) {
    return {
        addCustomUserToRedux: (customUser) => dispatch({
            type: "ADDCUSTOMUSER",
            payload: customUser
        }),
        updateWatchList: (watchList) => dispatch({
            type: "UPDATEWATCHLIST",
            payload: watchList
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: swOrange
    },
    buttonContainer: {
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        borderRadius: 80,
        marginTop: 80,
        width: 65,
        height: 65
    },
    header: {
        color: swWhite,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: "20%",
        marginBottom: 70
    },
    input: {
        alignSelf: "center",
        width: "70%",
        borderBottomColor: swWhite
    },
    leftIconStyle: {
        marginRight: 20
    }
});
