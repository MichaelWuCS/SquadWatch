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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

export default class Search extends Component{

    constructor(props){
        super(props);
        this.id; 
        this.state = {
            loading: false,      
            data: [],      
            error: null,
            genres: "",
            year:"",
            inWatchlist: false
        };
        this.firestore;
    }

    componentDidMount(){
        //console.log(this.props);
        const firebase_config = {
            apiKey: FIREBASE_API_KEY,
            authDomain: FIREBASE_AUTH_DOMAIN,
            databaseURL: FIREBASE_DB_URL,
            storageBucket: FIREBASE_STORAGE_BUCKET,
            projectId: FIREBASE_PROJECT_ID,
            appId: FIREBASE_APP_ID,
        };
        !firebase.apps.length ? firebase.initializeApp(firebase_config) : firebase.app();
        this.firestore = firebase.firestore();
        this.id = this.props.route.params.id;
        console.log(this.id);
        this.getWatchlistInfo()
        this.makeRemoteRequest();
    }

    getWatchlistInfo = () =>{
        this.firestore
        .collection("watchList")
        .doc("WiEkX1WL5XmcYp4jODIb")
        .get()
        .then((doc) => {
            var i;
            for(i = 0; i<doc.data().movies.length; i++){
                if(this.id==doc.data().movies[i].id){
                    console.log(this.id);
                    console.log(doc.data().movies[i].id);
                    this.setState({
                        inWatchlist:true
                    });
                    console.log("This movie is here");
                    break;
                }
            }
        });
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
            this.firestore
            .collection("watchList")
            .doc("WiEkX1WL5XmcYp4jODIb")
            .get()
            .then((doc) => {
                var temp = doc.data().movies;
                var i;
                for(i = 0; i<temp.length; i++){
                    if(temp[i].id==this.id){
                        temp.splice(i,1);
                        break;
                    }
                }
                this.firestore
                .collection("watchList")
                .doc("WiEkX1WL5XmcYp4jODIb")
                .update({movies:temp});
            });
        }else{
            this.firestore
            .collection("watchList")
            .doc("WiEkX1WL5XmcYp4jODIb")
            .get()
            .then((doc) => {
                var temp = doc.data().movies;
                temp.push({
                    description:this.state.data.overview,
                    id:this.id,
                    name:this.state.data.title,
                    posterPath:this.state.data.poster_path
                })
                this.firestore
                .collection("watchList")
                .doc("WiEkX1WL5XmcYp4jODIb")
                .update({movies:temp});
            });
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
});
