import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Alert } from "react-native";
import RecElement from "../components/RecElement";
import {connect} from "react-redux";
import {getUserWatchList} from "../views/WatchList";
import {getWatchList} from "../api/WatchListApi.js"
import {getRecList} from "../api/RecListApi";
import firebase from 'firebase';
import {TMDB_KEY} from "@env";

const firebaseAuth = firebase.auth();
const empty = false;

class Recommendations extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            empty: false,
            recommendations: [{}]
        };
    }

    componentDidMount() {
        this.get_recommendations(this.props.watchList);
    }

    get_recommendations = (watch_list) => {
        
        const randomMovie = watch_list[Math.floor(Math.random() * watch_list.length)];
        /*if(randomMovie == undefined){
            console.log("undefined");
            this.setState({empty: true});
            this.setState({loading: false });
            return;
        }
        console.log("falsinggg");
        this.setState({empty: false });*/
        if(randomMovie == undefined){
            this.setState({loading: false });
            this.setState({empty: true});
            return;
        }
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

    updateRecList = (element)=>{
       let newList = {...this.state.recommendations}
        let newRec = []
        newList.results.map((movie)=>{
            if(movie.id!=element){
                newRec.push(movie)
            }
        });
        newList.results=newRec
        this.setState({recommendations:newList})
        console.log(newList.results==this.state.recommendations.results)
    }

    movieArray = (rec) => {
        if(rec == undefined){
            return {}
        }
        return rec.map((movie,index)=>{
            console.log(movie)
            let temp = [];
            //movie.genres.forEach(element => temp.push(element.name));
            while(temp.length>4){
                temp.pop();
            }
            var clone = {
                name: movie.title,
                id: movie.id,
                description: movie.overview,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date.substring(0,4),
                genres: temp.join(" • ")
            }
            return(
            <View key={index}>
                <RecElement  index={index} movie={clone} navigation={this.props.navigation} recList={this.state.recommendations} update={this.updateRecList.bind(this)}></RecElement>

            </View>
        )})

   }


    render() {
        if(this.state.empty){
            Alert.alert(
                'Error generating Recommendations List', 
                'WatchList is empty',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
              );
              return null;
        }
        if(this.state.loading){
            return <ActivityIndicator/>
        }
        else{
        return (

            <View style={styles.container}>
                <ScrollView styles={styles.scrollView}>
                    <View>{this.movieArray(this.state.recommendations.results)}</View>
                </ScrollView>
            </View>
        );
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181b3d",
    },
    header: {
        backgroundColor: "#00B465",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    scrollView: {
        backgroundColor: "#181b3d",
        minHeight: 300,
        alignItems: "center",
        justifyContent: "center",
    },
});
