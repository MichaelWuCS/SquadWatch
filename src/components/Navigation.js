import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route, Router, Link } from "react-router-native";
import Home from "../views/Home.js";
import MovieList from "../views/MovieList.js";
import Dashboard from "../views/Dashboard.js";
import WatchList from "../views/WatchList.js";
import Search from "../views/Search.js";
import Friends from "../views/Friends.js";

export default class Navigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NativeRouter>
                    <View>
                        <Link to="/" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>Home</Text>
                        </Link>
                        <Link to="/dashboard" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>Dashboard</Text>
                        </Link>
                        <Link to="/movielist" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>MovieList</Text>
                        </Link>
                        <Link to="/watchlist" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>WatchList</Text>
                        </Link>
                        <Link to="/search" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>Search</Text>
                        </Link>
                        <Link to="/friends" underlayColor="#f0f4f7" style={styles.subNavItem}>
                            <Text>Friends</Text>
                        </Link>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/movielist" component={MovieList} />
                        <Route exact path="/watchlist" component={WatchList} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/friends" component={Friends} />
                    </View>
                </NativeRouter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
});
