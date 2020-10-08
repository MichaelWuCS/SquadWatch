import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

export default class TheatrePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviePosters: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
            ],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>IN THEATRES</Text>
                <SliderBox images={this.state.moviePosters} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        height: 150,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
