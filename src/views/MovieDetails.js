import React, {Component, useEffect, useState} from "react";
import {
    Text,
    Button,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator, NativeEventEmitter,
    SafeAreaView
} from "react-native";
import {TMDB_KEY} from "@env";
import { ListItem, SearchBar, Avatar, Image } from 'react-native-elements';
import Navigation from "../components/Navigation";
import { createStackNavigator } from "@react-navigation/stack";


export default class Search extends Component{

    constructor(props){
        super(props);
        this.id; 
        this.state = {
            loading: false,      
            data: [],      
            error: null,
        };
    }

    componentDidMount(){
        //console.log(this.props);
        this.id = this.props.route.params.id;
        console.log(this.id);
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true});
        const url = "https://api.themoviedb.org/3/movie/"+this.id+"?api_key="+TMDB_KEY;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                loading:false,
                data:res        
            });
        })
        .catch(error =>{
            this.setState({
                error,
                loading:false
            });
        })
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
                    <Image source={{uri:"https://image.tmdb.org/t/p/w1280"+this.state.data.poster_path}}
                    style={{ width: 300, height: 450 }}/>
                    <Text>
                        {this.state.data.title}
                    </Text>
                </SafeAreaView>
            );
        }
    }

}