import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default class FromFriendsPreview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>FROM FRIENDS</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                    <Text>Movie </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "dodgerblue",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
