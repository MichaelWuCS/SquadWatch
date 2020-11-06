import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar, ActivityIndicator } from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import { swGrey } from "../styles/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import * as firebase from "firebase";

export default class Dashboard extends Component {
    render() {
        console.log(this.props.navigation);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView>
                    <TheatrePreview navigation={this.props.navigation}></TheatrePreview>
                    <WatchlistPreview navigation={this.props.navigation}> </WatchlistPreview>
                    <RecommendationsPreview navigation={this.props.navigation}></RecommendationsPreview>
                    <FromFriendsPreview navigation={this.props.navigation}></FromFriendsPreview>
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: swGrey,
        justifyContent: "center"
    }
});
