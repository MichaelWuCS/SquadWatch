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


export default class SyncRecsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        };
    }

    componentDidMount() {
        this.setState({ data: this.props.route.params.recommendations})
    }

    makeRemoteRequest() {

    }

    renderTopPick = () => {

    };

    renderList = () => {
        return (
            <FlatList renderItem={} data={} >
            </FlatList>
        );
    };

    render() {
        return (
            <View>
                {this.renderTopPick()}
                {this.renderList()}
            </View>
        );
    }
}
