import { StatusBar } from "expo-status-bar";
import React from "react";
import ReactDOM from "react-dom";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NativeRouter, Switch, Route, Router, Link } from "react-router-native";
import Home from "./src/views/Home.js";
import MovieList from "./src/views/MovieList.js";
import Navigation from "./src/components/Navigation.js";

export default function App() {
    return (
        <ScrollView>
            <Text> </Text>
            <Text> </Text>
            <Navigation> </Navigation>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
