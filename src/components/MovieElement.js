import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ImageBackground,TouchableHighlight } from "react-native";
import {Tile} from "react-native-elements";
import{swWhite} from "../styles/Colors"
import Swipeable from 'react-native-gesture-handler/Swipeable';
 

export default class MovieElement extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render() {
        return (
            <TouchableHighlight
           underlayColor={false}
            onPress={ ()=>{
                const movieId = this.props.movie.id;
                const movieName = this.props.movie.name;
                this.props.navigation.push('Movie', {
                    id:movieId,
                    name:movieName
                })
            }}
            >
                <Swipeable
                friction={2}
                >
                <ImageBackground source={{uri: "https://image.tmdb.org/t/p/w500" + this.props.movie.posterPath}}  style={styles.image} imageStyle={styles.imageStyle}>
                    <Text style={styles.movieTitle} 
    >{this.props.movie.name}</Text>
                    
                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.description}>{this.props.movie.description}</Text>
                </ImageBackground>
                </Swipeable>
                
            </TouchableHighlight>
                
            
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    movieTitle: {
        marginTop:1,
        color: "white",
        fontWeight: "800",
        width:"70%",
        height:"50%",
        fontSize: 28
    },
    description: {
        color: swWhite,
        fontSize: 12,
        marginTop:20,
        width:"78%",
        height:'50%',
    },
    image: {
        flex: 1,
        paddingLeft:10,
        resizeMode: "cover",
        borderRadius: 15,
        height: 150,
        margin:15,
        marginBottom:0,

    },
    imageStyle: {
        borderRadius: 15,
    }

});