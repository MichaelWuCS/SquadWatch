import React, { Component } from "react";
import { StyleSheet, Text, View, Animated, ImageBackground,TouchableHighlight,TouchableOpacity, Alert } from "react-native";
import{swWhite,swGreen} from "../styles/Colors";
import {TMDB_KEY} from "@env";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Rating from "../components/Ratings.js";
import * as firebase from "firebase";
import {connect} from "react-redux"
import {updateWatchList} from "../api/WatchListApi.js"


class MovieElement extends Component {
    constructor(props){
        super(props);
        this.state = {
          genres:"",
          year:"",
          newWatchlist:''
        };
    }
    componentDidMount(){
      this.makeRemoteRequest();
     
  }

    makeRemoteRequest = () => {
      const url = "https://api.themoviedb.org/3/movie/"+this.props.movie.id+"?api_key="+TMDB_KEY;
      fetch(url).then(res => res.json()).then(res => {
          let temp = [];
          res.genres.forEach(element => temp.push(element.name));
          while(temp.length>4){
              temp.pop();
          }
          this.setState({
              genres:temp.join(" • "),
              year:res.release_date.substring(0,4)
          });
      })
      .catch(error =>{
          console.log(error)
      })
  }
  get_recommendations = (watch_list) => {
    const randomMovie = watch_list[Math.floor(Math.random() * watch_list.length)];
    const requestStr = "https://api.themoviedb.org/3/movie/" + randomMovie.id + "/recommendations" + "?api_key=" + TMDB_KEY;
    fetch(requestStr)
        .then(res => res.json())
        .then(results => {
            this.setState({
                recommendations: results,
                loading: false
            });
        }).catch((error)=> {
            console.log("Error!: " + error);
            this.setState({loading: false });
        })
}

addMovieToWatchList = ()=>{
        try {
            var currentMovie = {
                description:this.props.movie.description,
                id:this.props.movie.id,
                name:this.props.movie.name,
                posterPath:this.props.movie.posterPath
            }
            let temp = [...this.props.watchList]
            temp.push(currentMovie);
            firebase.firestore()
                .collection("watchList")
                .doc(this.props.customUser.watchListId)
                .update({movies:temp})
                .catch(error=>{
                    console.warn(error);
                });
                this.props.updateWatchList(temp);
                this.props.update(currentMovie.id);

        } catch (error) {
            console.log(error)
        }
    }
    
    renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [-100,0],
          outputRange: [1,0],
          extrapolate:'clamp'
        })
        return (
          
          <TouchableOpacity style={styles.rightAction} onPress={this.addMovieToWatchList}>
            <Animated.Text
              style={[
                styles.actionText,
                {
                  transform: [{ translateX: trans }],
                },
              ]}>
              <MaterialCommunityIcons
                                style={styles.buttonIcon}
                                name= {(this.state.inWatchlist)? "playlist-check":"playlist-plus"}
                                color="#ffffff" size ={32}
                                />
            </Animated.Text>
          </TouchableOpacity>
        );
      }

    render() {
        return (
            <Swipeable
                friction={2}
                renderRightActions={this.renderRightActions}
                
                >

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
          
                    
                    <ImageBackground source={{uri: "https://image.tmdb.org/t/p/w500" + this.props.movie.posterPath}} style={styles.image} imageStyle={styles.imageStyle} >
                    <Text style={styles.movieTitle} 
    >{this.props.movie.name} {"("+this.state.year+')'}</Text>
                    <Rating id={this.props.movie.id}></Rating>
                    <Text style={styles.detail}>{this.state.genres}</Text>
                    <Text numberOfLines={3} ellipsizeMode='tail' style={styles.description}>{this.props.movie.description}</Text>
                </ImageBackground>
               
    
            </TouchableHighlight>
           
            </Swipeable> 
            
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
        height:"30%",
        fontSize: 28
    },
    description: {
        color: swWhite,
        fontSize: 12,
        marginTop:5,
        width:"78%",
        height:'50%',
    },
    image: {
        flex: 1,
        paddingLeft:10,
        resizeMode: "cover",
        backgroundColor:'black',
        borderRadius: 15,
        height: 150,
        margin:15,
        marginBottom:0,

    },
    imageStyle: {
        borderRadius: 15,
        opacity:0.7
    },
    rightAction: {
        height: 150,
        width:'30%',
        marginRight:15,
        marginTop:15,
        // marginBottom:15,
        borderRadius: 15,
        padding:10,
        backgroundColor: swGreen,
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      actionText:{
        color:swWhite,
        fontWeight:'600',
        alignSelf:'center',
        fontSize:18,
      },
      detail: {
        textAlign: "left",
        color:"#D85600",
        fontWeight:'500',
        fontSize:14,
        marginTop:"1%",
    } 
      
});

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

export default connect(mapStateToProps, mapDispatchToProps)(MovieElement)