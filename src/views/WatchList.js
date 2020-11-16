import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import MovieElement from "../components/MovieElement.js";
import {connect} from "react-redux";
import {getWatchList} from "../api/WatchListApi.js";
import {swGrey} from "../styles/Colors";


class WatchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            watchListArray: [{}]
        };
    }

    componentDidMount() {
        this.getUserWatchList();
    }

    getUserWatchList = async () => {

        try {
            var userIDkey = this.props.customUser.watchListId;
            var userWatchList = await getWatchList(userIDkey);
            this.props.updateWatchList(userWatchList);

        } catch (error) {
            console.log(error);
        }

    }


    movieArray = () => {
        return this.props.watchList.map((movie,index)=>{
            return(
            <View key={index}>
                <MovieElement movie={movie} navigation={this.props.navigation}></MovieElement>
            </View>
        )})
   }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView styles={styles.scrollView}>
                    <View>{this.movieArray()}</View>
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(WatchList)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:swGrey,
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
