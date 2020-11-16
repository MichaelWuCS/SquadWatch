import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator } from "react-native";
import MovieElement from "../components/MovieElement.js";
import {connect} from "react-redux";
import {getUserWatchList} from "../views/WatchList";
import {getWatchList} from "../api/WatchListApi.js"
import {getRecList} from "../api/RecListApi";
import firebase from 'firebase';
import {TMDB_KEY} from "@env";

const firebaseAuth = firebase.auth();
const test_watchlist = {
    creatorID: "5UOPtbbQM03QIVUzwNFn",
    movies: [
        {
            id: "500",
            name: "Reservoir Dogs",
            posterPath: "/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg"
        },
        {
            id: "600",
            name: "Full Metal Jacket",
            posterPath: "/kMKyx1k8hWWscYFnPbnxxN4Eqo4.jpg"
        },
        {
            id: "601",
            name: "E.T. the Extra-Terrestrial",
            posterPath: "/pEKStszBzTZCvR0H4tosjqxmE7X.jpg"
        },
        {
            id: "346",
            name: "Seven Samurai",
            posterPath: "/1wCRVLGI7SoTOoDRzWlbt2dMDuy.jpg"
        },
    ]
};

class Recommendations extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recommendations: []
        };
    }

    componentDidMount() {

        this.get_recommendations(this.props.watchList);
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


    /*getUserRecList = async () => {

        try {
            var userIDkey = this.props.customUser.watchListId;
            //maybe run Nana Algorithm here 
            var userRecList = await getRecList(userIDkey);
            this.props.updateRecList(userRecList);

        } catch (error) {
            console.log(error);
        }
    }*/

    movieArray = (rec) => {
        return rec.map((movie,index)=>{
            var clone = {
                name: movie.title, 
                id: movie.id, 
                description: movie.overview, 
                posterPath: movie.poster_path
            }
            return(
            <View key={index}>
                <MovieElement movie={clone} navigation={this.props.navigation}></MovieElement>
                <Text>{movie.title}</Text>
            </View>
        )})
        
   }


    render() {
        if(this.state.loading){
            return <ActivityIndicator/>
        }
        else{
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>RECLIST</Text>
                </View>
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
