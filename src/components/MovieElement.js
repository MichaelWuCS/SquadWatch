import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ImageBackground } from "react-native";



export default class MovieElement extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render() {
        return (
                <ImageBackground source={{uri: "https://image.tmdb.org/t/p/w1280" + this.props.movie.posterPath}} style={styles.image} imageStyle={styles.imageStyle}>
                    <Text style={styles.movieTitle} onPress={ ()=>{
                        const movieId = this.props.movie.id;
                        const movieName = this.props.movie.name;
                        this.props.navigation.push('Movie', {
                            id:movieId,
                            name:movieName
                        })
                    }}>{this.props.movie.name}</Text>
                    <Text style={styles.description}>{this.props.movie.description}</Text>
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
        textShadowRadius: 3,
        textShadowColor: "black"
    },
    description: {
        color: "black",
        fontSize: 12,
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