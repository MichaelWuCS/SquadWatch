import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import MovieElement from "../components/MovieElement.js";
import {connect} from "react-redux";
import {updateMovieList, addCustomUser} from "../store/actions.js";


class WatchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies: ["test", "test1","test2","test3","test4","test5","test6","test7","test8","test9",],
            counter: 0
        };
    }

    movieArray = () =>{
        return this.state.movies.map(movie =>{
            return(
            <View key={movie}>
                <MovieElement title={movie}></MovieElement>
            </View>
            )
        })
    }
    


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>WATCHLIST</Text>
                </View>
                <Button onPress={()=>this.props.updateMovieList()} title="increase"/>
                    <Text>{this.props.counter}</Text>
                <ScrollView styles={styles.scrollView}>
                    <View>{this.movieArray()}</View>
                </ScrollView>
                <Button title="Add Movie" onPress={this.addMovieToMovieList}></Button>
            </View>
        );
    }

    addMovieToMovieList = ()=>{

        const copy = [...this.state.movies];
        copy.push("TEST");
        console.log(copy);
        console.log(this.state.movies);
        this.setState({movies: copy})
        console.log(this.state.movies);
        console.log(this.state.counter)

    }
}

function mapStateToProps(state){
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch){
    return{
        updateMovieList: ()=> dispatch({type:"ADDCUSTOMUSER" })
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