import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route, Router, Link } from 'react-router-native';
import Home from '../views/Home.js';
import MovieList from '../views/MovieList.js';

export default class Navigation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NativeRouter>
                    <View>
                        <Link
                            to="/"
                            underlayColor="#f0f4f7"
                            style={styles.subNavItem}
                        >
                            <Text>Home</Text>
                        </Link>
                        <Link
                            to="/movielist"
                            underlayColor="#f0f4f7"
                            style={styles.subNavItem}
                        >
                            <Text>MovieList</Text>
                        </Link>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/movielist" component={MovieList} />
                    </View>
                </NativeRouter>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        padding: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});
