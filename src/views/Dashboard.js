import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar, ActivityIndicator } from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import FromFriendsPreview from "../components/FromFriendsPreview.js";
import {swGrey} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";
import {connect} from "react-redux";
import {getWatchList} from "../api/WatchListApi.js"
import * as firebase from "firebase";

class Dashboard extends Component {
    render() {
        console.log(this.props.navigation);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView>
                    <TheatrePreview navigation={this.props.navigation}></TheatrePreview>
                    <WatchlistPreview navigation={this.props.navigation}> </WatchlistPreview>
                    <RecommendationsPreview navigation={this.props.navigation}></RecommendationsPreview>
                    {/*<FromFriendsPreview navigation={this.props.navigation}></FromFriendsPreview>*/}
                </ScrollView>
            </SafeAreaView>
        );
    }

    // componentDidMount() {
    //     this.getUserWatchList();
    // }
    //
    // getUserWatchList = async () => {
    //     try {
    //         console.log("TEST");
    //         var userIDkey = this.props.customUser.userId;
    //         console.log(userIDkey);
    //         var userWatchList = await getWatchList("WiEkX1WL5XmcYp4jODIb");
    //         this.props.updateWatchList(userWatchList);
    //         console.log(userWatchList);
    //         console.log("TEST");
    //
    //     } catch (error) {
    //         console.log(error);
    //     }
    //
    // }
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
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:swGrey,
        justifyContent:'center',
    },
});
