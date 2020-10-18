import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import {TMDB_KEY} from "@env";

export default class TheatrePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviePosters: [],
            nowPlayingMovies:[]
        };
    }

    componentDidMount(){
        this.makeRemoteRequest();
    }

    makeRemoteRequest(){
        const requestURL = "https://api.themoviedb.org/3/movie/now_playing?api_key="+TMDB_KEY+"&language=en-US&page=1"
        const posterURL_starter = "https://image.tmdb.org/t/p/original/";
        fetch(requestURL)
        .then(res=>res.json())
        .then((res) => {
            var posterList = []

            for(var i = 0; i<7; i++){
                //console.log(posterURL_starter+res.results[i].backdrop_path);
                posterList.push(posterURL_starter+res.results[i].backdrop_path);
            }
            this.setState({
                moviePosters:posterList,
                nowPlayingMovies:res.results
            });
            //console.log(this.state.nowPlayingMovies);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>in theatres</Text>
                <SliderBox style={styles.slide} images={this.state.moviePosters} 
                onCurrentImagePressed={index => {
                    this.props.navigation.push('Movie', {
                        id: this.state.nowPlayingMovies[index].id,
                        name: this.state.nowPlayingMovies[index].title
                    });
                }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        height:300,
    },
});
