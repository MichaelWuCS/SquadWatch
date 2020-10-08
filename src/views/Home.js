import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView} from "react-native";

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text> THIS IS THE HOME COMPONENT</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
