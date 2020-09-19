import { StatusBar } from "expo-status-bar";
import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeRouter, Switch, Route, Router, Link } from "react-router-native";
import Home from "./src/views/Home.js";
import MovieList from "./src/views/MovieList.js";
import Navigation from "./src/components/Navigation.js";

export default function App() {
    return (
        <View>
            <Text> </Text>
            <Text> </Text>
            <Text> This is the Landing Page</Text>
            <Text> Click on either "Home" or "MovieList"</Text>
            <Navigation> </Navigation>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
