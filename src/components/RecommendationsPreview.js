import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default class RecommendationsPreview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>RECOMMENDATIONS</Text>
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
        marginRight: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "darkorchid",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
