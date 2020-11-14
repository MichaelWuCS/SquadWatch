import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { getRatings, updateRatings} from "../api/RatingsApi.js";
import {connect} from "react-redux"


class Ratings extends Component {
    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            ratingsList: {}
        };
    }

    componentDidMount(){
        this.handleCreated();
    }

    handleCreated = async () =>{
        var ratings = await getRatings("6ysMu58HyzNj6ZD8ODCL");
        this.setState({
            ratingsList: ratings
        })
        var ratingKey = "id" + this.props.id;
        if(ratings[ratingKey]!=undefined){
            this.setState({
                rating: ratings[ratingKey]
            })
        }

    }

    changeRating = async (newRating) =>{
        try {
            // Make firebase request
            var ratingKey = "id" + this.props.id;
            var clone = {...this.state.ratingsList};
            clone[ratingKey] = newRating;
            console.log(clone);
            updateRatings("6ysMu58HyzNj6ZD8ODCL", clone);
        } catch (error) {
            console.log(error);
        }
    }

    ratingSystem = () =>{
        return (
            <View style = {styles.ratings}>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 1) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(1);
                    this.setState({rating : 1});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 2) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(2);
                    this.setState({rating : 2});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 3) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(3);
                    this.setState({rating : 3});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 4) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(4);
                    this.setState({rating : 4});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 5) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    
                    this.changeRating(5);
                    this.setState({rating : 5});
                }}
                />
            </TouchableOpacity>
            </View>

            
        );
    }

    render(){
        return (
            <View>
                <this.ratingSystem></this.ratingSystem>
            </View>
        );
    }

}


function mapStateToProps(state){
    return {
        customUser: state.customUser,
        watchList: state.watchList
    }
}

function mapDispatchToProps(dispatch){
    return{
        updateWatchList: (watchList)=> dispatch({
            type:"UPDATEWATCHLIST",
            payload: watchList
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings)

const styles = StyleSheet.create({
    ratings: {
        flexDirection: "row",
    }
});

/*
import React, {Component, useEffect, useState} from "react";
import {
    Text,
    Button,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator, NativeEventEmitter,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    Image,
    SectionList
} from "react-native";
import {TMDB_KEY} from "@env";
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import LinearGradient from "expo-linear-gradient";
import { MaterialCommunityIcons,AntDesign, Entypo } from '@expo/vector-icons';
import { swGrey } from "../styles/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_PROJECT_ID,
    FIREBASE_APP_ID
} from '@env';
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import {connect} from "react-redux"
import {getWatchList, updateWatchList} from "../api/WatchListApi.js"
import {getRatings, updateRatings} from "../api/RatingApi.js"

class MovieDetails extends Component{

    constructor(props){
        super(props);
        this.id; 
        this.state = {
            loading: false,      
            data: [],      
            error: null,
            genres: "",
            year:"",
            inWatchlist: false,
            rating: 0,
        };
    }

    componentDidMount(){
        this.id = this.props.route.params.id;
        this.getWatchlistInfo();
        this.getRatingsInfo();
        this.makeRemoteRequest();
    }

    getWatchlistInfo = async() =>{
        try {
            //var userIDkey = this.props.customUser.userId;
            var userWatchList = await getWatchList("WiEkX1WL5XmcYp4jODIb");
            userWatchList.forEach((movie)=>{
                var i;
                for(i = 0; i<userWatchList.length; i++){
                    if(this.id==movie.id){
                        this.setState({
                            inWatchlist:true
                        });
                    }
                }
            })
            this.props.updateWatchList(userWatchList);
        } catch (error) {
            console.log(error)
        }
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true});
        const url = "https://api.themoviedb.org/3/movie/"+this.id+"?api_key="+TMDB_KEY;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            let temp = [];
            res.genres.forEach(element => temp.push(element.name));
            while(temp.length>4){
                temp.pop();
            }
            this.setState({
                loading:false,
                data:res, 
                genres:temp.join(" • "),
                year:res.release_date.substring(0,4)
            });
            console.log(this.state.genres);
        })
        .catch(error =>{
            this.setState({
                error,
                loading:false
            });
        })
    }

    toggleInWatchlistRequest = () =>{
        if(this.state.inWatchlist){
            this.removeMovieFromWatchList();
        }else{
            this.addMovieToWatchList();
        }
    }

    removeMovieFromWatchList = async ()=>{
        try {
            //var userIDkey = this.props.customUser.userId;
            var userWatchList = await getWatchList("WiEkX1WL5XmcYp4jODIb");
            userWatchList = userWatchList.filter((movie) => {
                if (movie.id == this.id){
                    return false;
                }
                return true;
            })
            watchListObject = {
                movies: userWatchList,
                creatorID: "5UOPtbbQM03QIVUzwNFn"
            }
            updateWatchList("WiEkX1WL5XmcYp4jODIb", watchListObject);
            this.props.updateWatchList(userWatchList);
            console.log(watchListObject);
        } catch (error) {
            console.log(error)
        }
    }

    addMovieToWatchList = async ()=>{
        try {
            var userWatchList = await getWatchList("WiEkX1WL5XmcYp4jODIb");
            var currentMovie = {
                description:this.state.data.overview,
                id:this.id,
                name:this.state.data.title,
                posterPath:this.state.data.poster_path
            }
            userWatchList.push(currentMovie);
            watchListObject = {
                movies: userWatchList,
                creatorID: "5UOPtbbQM03QIVUzwNFn"
            }
            updateWatchList("WiEkX1WL5XmcYp4jODIb", watchListObject);
            this.props.updateWatchList(userWatchList);
            console.log(watchListObject);

        } catch (error) {
            console.log(error)
        }
    }

    ratingSystem = () =>{
        return (
            <View style = {styles.ratings}>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 1) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(1);
                    this.setState({rating : 1});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 2) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(2);
                    this.setState({rating : 2});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 3) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(3);
                    this.setState({rating : 3});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 4) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(4);
                    this.setState({rating : 4});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 5) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    
                    this.changeRating(5);
                    this.setState({rating : 5});
                }}
                />
            </TouchableOpacity>
            </View>

            
        );
    }

    changeRating = async (newRating) =>{
        try {
            // Make firebase request
            console.log(newRating);
            var ratingsList = {500: 1};
            updateRatings("6ysMu58HyzNj6ZD8ODCL",ratingsList);
        } catch (error) {
            console.log(error);
        }
    }
    
    
    getRatingsInfo = async() =>{
        try {
            //var userIDkey = this.props.customUser.userId;
            console.log("Making ratings request");
            var userRatings = await getRatings("6ysMu58HyzNj6ZD8ODCL");
            this.props.updateRatings(userRatings);
            console.log(userRatings);
            console.log("?");
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        if(this.state.loading){
            return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator/>
            </SafeAreaView>
            );
        }else{
            return (
                <SafeAreaView>
                    <ScrollView height="100%" backgroundColor={swGrey}>
                    <ImageBackground opacity={1} source={{uri:"https://image.tmdb.org/t/p/w1280"+this.state.data.poster_path}}
                    style={{ width: '100%', height: undefined, aspectRatio:2/3}}>
                        <View style={styles.container}>
                            <Text style={styles.title}>{this.state.data.title + " (" + this.state.year + ")"}</Text>
                            <Text numberOfLines={3} style={styles.description}>{this.state.data.overview}</Text>
                            <View style = {{flexDirection:'row'}}>
                                <Text style={styles.detail}>{this.state.genres}</Text>
                                <Text style={styles.detail}>|</Text>
                                <Text style={styles.detail}>{""+Math.floor(this.state.data.runtime/60)+"h "+this.state.data.runtime%60+"m"}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonRow}>
                                <TouchableOpacity style={{alignContent:"center",paddingLeft:"20%" , paddingBottom:"90%"}} 
                                    onPress={() => {
                                        this.setState({
                                            inWatchlist:!this.state.inWatchlist
                                        })
                                        this.toggleInWatchlistRequest();
                                    }
                                }>
                                    <MaterialCommunityIcons
                                    style={styles.buttonIcon}
                                    name= {(this.state.inWatchlist)? "playlist-check":"playlist-plus"}
                                    color="#ffffff" size ={32}
                                    />
                                    <Text style={styles.buttonLabel}>{(this.state.inWatchlist)?"Remove from Watchlist":"Add to Watchlist"}</Text>
                                </TouchableOpacity>
                                <this.ratingSystem></this.ratingSystem>
                        </View>
                        <View>

                        </View>
                    </ImageBackground>
                    <View>
                        
                    </View>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    }
    
}

function mapStateToProps(state){
    return {
        customUser: state.customUser,
        watchList: state.watchList,
        ratings: state.ratings
    }
}

function mapDispatchToProps(dispatch){
    return{
        updateWatchList: (watchList)=> dispatch({
            type:"UPDATEWATCHLIST",
            payload: watchList
        }),
        updateRatings: (ratings)=> dispatch({
            type: "UPDATERATINGS",
            payload: ratings
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: "center",
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    title: {
        fontWeight:"700",
        textAlign: "left",
        color:"#ffffff",
        fontSize:35,
        marginTop:"50%",
        paddingLeft:"7.5%",
        paddingRight:"7.5%"
    },
    description: {
        textAlign: "left",
        color:"#ffffff",
        fontSize:11,
        marginTop:"1%",
        paddingLeft:"5%",
        paddingRight:"25%"
    },
    detail: {
        textAlign: "left",
        color:"#ffffff",
        fontWeight:'500',
        fontSize:13,
        marginTop:"1%",
        paddingLeft:"4%",
    },
    buttonLabel: {
        textAlign: "center",
        width:"45%",
        color:"#ffffff",
        fontWeight:'500',
        fontSize:11,
        marginTop:"1%",
        paddingLeft:"0%",
    },
    buttonIcon: {
        paddingLeft:"4.8%",
    },
    buttonRow: {
        flexDirection: "row",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    ratings: {
        flexDirection: "row",
    }
});


*/