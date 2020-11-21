import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar, ActivityIndicator } from "react-native";
import TheatrePreview from "../components/TheatrePreview.js";
import WatchlistPreview from "../components/WatchlistPreview.js";
import RecommendationsPreview from "../components/RecommendationsPreview.js";
import {swGrey} from '../styles/Colors'
import { ScrollView } from "react-native-gesture-handler";
import {connect} from "react-redux";


class Dashboard extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle='light-content'
                />
                <ScrollView>
                    <TheatrePreview navigation={this.props.navigation}/>
                    <WatchlistPreview navigation={this.props.navigation}> </WatchlistPreview>
                    <RecommendationsPreview navigation={this.props.navigation} watchlist={this.watchList}/>
                </ScrollView>
            </SafeAreaView>
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
