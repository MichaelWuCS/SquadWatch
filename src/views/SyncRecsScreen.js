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
import { TMDB_KEY } from "@env";
import { swBlack, swBlue, swGreen, swGrey, swPink, swPurple, swOrange } from "../styles/Colors";
import SyncRoomAnimation from "./SyncRoomAnimation";


export default class SyncRecsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            topPick: {},
            data: []
        };
    }

    // componentDidMount() {
    //     const results = this.props.route.params.recommendations;
    //
    //     this.setState({ data: this.props.route.params.recommendations})
    // }
    //
    // makeRemoteRequest() {
    //
    // }

    renderTopPick = (obj) => {
        return(
            <View backgroundColor={"green"}>
                <Text>{obj.title}</Text>
            </View>
        )
    };

    renderRec = (obj) => {
        return (
            <Text>{obj.title}</Text>
        )
    }

    renderList = () => {
        return (
            <FlatList renderItem={this.renderRec} data={this.state.data}>
            </FlatList>
        );
    };

    render() {
        return (
            <View>
                {/*{this.renderTopPick()}*/}
                {/*{this.renderList()}*/}
            </View>
        );
    }
}
