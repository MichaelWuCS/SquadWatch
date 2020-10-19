import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import MovieElement from "../components/MovieElement.js";
import {connect} from "react-redux";
import {getWatchList, addWatchList} from "../api/WatchListApi.js"


class WatchList extends Component {
    constructor(props){
        super(props);
        this.state = {
            watchList: []
        };
    }

    componentDidMount() {
        getWatchList(this.onWatchListsReceived);
    }

    onWatchListsReceived = (watchList) => {

        //customUserID = this.props.customUser.userID;
        customUserID = "5UOPtbbQM03QIVUzwNFn";
        
        const userWatchList = watchList.filter(element =>{
            if (element.creatorID == customUserID){
                return true;
            }
            return false;
        })

        this.setState(prevState =>({
            watchList: prevState.watchList = userWatchList[0].movies
        }))

        this.props.updateWatchList(userWatchList[0].movies);

        

    }


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