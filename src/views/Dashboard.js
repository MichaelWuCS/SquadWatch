import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View,StatusBar } from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import {swGrey} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";

export default class Dashboard extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                barStyle='light-content'
                />
                <ScrollView>
                <TheatrePreview></TheatrePreview>
                <WatchlistPreview> </WatchlistPreview>
                <RecommendationsPreview></RecommendationsPreview>
                <FromFriendsPreview></FromFriendsPreview>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:swGrey,
        justifyContent:'center',
    },
});
