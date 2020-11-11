import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ImageBackground } from "react-native";



export default class MovieElement extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render() {
        return (
            <View style = {styles.overlay}>
                <ImageBackground source={{uri: "https://image.tmdb.org/t/p/w1280" + this.props.movie.posterPath}} style={styles.image} imageStyle={styles.imageStyle}>
                    <Text style={styles.movieTitle}  numberOfLines={2} ellipsizeMode="tail" numberonPress={ ()=>{
                        const movieId = this.props.movie.id;
                        const movieName = this.props.movie.name;
                        this.props.navigation.push('Movie', {
                            id:movieId,
                            name:movieName
                        })
                    }}>{this.props.movie.name}</Text>
                    <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">  {this.props.movie.description}</Text>
                </ImageBackground>
            </View>

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
        color: "white",
        fontSize: 12,
        textShadowRadius: 3,
        textShadowColor: "black"
    },
    image: {
        flex: 1,
        padding: 10,
        resizeMode: "cover",
        borderRadius: 30,
        minHeight: 115,
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: "center",
        overlayColor: "black"    

    },
    imageStyle: {
        borderRadius: 30,

    },
    overlay: {
    }


});