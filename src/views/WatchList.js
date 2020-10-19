import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import MovieElement from "../components/MovieElement.js";
import {connect} from "react-redux";
import {updateMovieList, addCustomUser} from "../store/actions.js";


class WatchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            watchListArray: [{description: "A botched robbery...", id: 500, name: "Reservoir Dogs", posterPath: "/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg"},]
        };
    }

    /*
    movieArray = () =>{
        return this.state.movies.map(movie =>{
            return(
            <View key={movie}>
                <MovieElement title={movie}></MovieElement>
            </View>
            )
        })
    }

    movies: ["test", "test1","test2","test3","test4","test5","test6","test7","test8","test9",],
            counter: 0
    */

   movieArray = () =>{
    this.state.watchListArray = this.props.watchList;
    return this.state.watchListArray.map((movie,index)=>{
        return(
        <View key={index}>
            <MovieElement movie={movie} navigation={this.props.navigation}></MovieElement>
        </View>
        )})
    }
    


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>WATCHLIST</Text>
                </View>
                <ScrollView styles={styles.scrollView}>
                    <View>{this.movieArray()}</View>
                </ScrollView>
                <Button onPress ={()=>{
                    var copy = [...this.props.watchList];
                    copy.push({description: "A botched robbery...", id: 500, name: "TESTDOG", posterPath: "/AjTtJNumZyUDz33VtMlF1K8JPsE.jpg"})
                    this.props.updateWatchList(copy);
                }} title="Test"> </Button>
            </View>
        );
    }

}


function mapStateToProps(state){
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)


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