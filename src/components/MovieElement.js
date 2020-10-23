import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ImageBackground } from "react-native";

const image = { uri: "https://www.ocregister.com/wp-content/uploads/migration/kpi/kpiguu-10blizzard2large.jpg"};


export default class MovieElement extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }


    render() {
        return (
                <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
                    <Text style={styles.movieTitle}>{this.props.title}</Text>
                    <Text>Rating</Text> 
                </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    movieTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    image: {
        flex: 1,
        padding: 10,
        resizeMode: "cover",
        borderRadius: 30,
        minHeight: 100,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15

    },
    imageStyle: {
        borderRadius: 30
    }

});