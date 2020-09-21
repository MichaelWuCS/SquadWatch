import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Dashboard Component</Text>
                <TheatrePreview></TheatrePreview>
                <WatchlistPreview> </WatchlistPreview>
                <RecommendationsPreview></RecommendationsPreview>
                <FromFriendsPreview></FromFriendsPreview>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "steelblue",
    },
});
