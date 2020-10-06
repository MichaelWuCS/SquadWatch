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
                <Text style={styles.text}>in theatres</Text>
                <SliderBox style={styles.slide} images={this.state.moviePosters} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    text: {
        marginLeft:5,
        marginTop:10,
        marginBottom:10,
        fontSize: 25,
        fontWeight: "bold",
        textTransform:'uppercase',
        color: "white",
    },
    slide:{
        height:400,
    },
});
