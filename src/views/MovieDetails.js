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
    Image
} from "react-native";
import {TMDB_KEY} from "@env";
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
import LinearGradient from "expo-linear-gradient";
import { swGrey } from "../styles/Colors";


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
            //console.log(res);
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
                    <ScrollView height="100%" backgroundColor={swGrey}>
                    <ImageBackground opacity={1} source={{uri:"https://image.tmdb.org/t/p/w1280"+this.state.data.poster_path}}
                    style={{ width: '100%', height: undefined, aspectRatio:2/3}}>
                        <View style={styles.container}>
                        <Text style={styles.title}>{this.state.data.title}</Text>
                        <Text numberOfLines={3} style={styles.description}>{this.state.data.overview}</Text>
                        <FlatList
                            
                        />
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
        paddingLeft:"7.5%"
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
        fontWeight:'100',
        fontSize:11,
        marginTop:"1%",
        paddingLeft:"5%",
        paddingRight:"25%"
    }
});
