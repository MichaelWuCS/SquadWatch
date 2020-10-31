import React, { Component } from "react";
import {SafeAreaView, StyleSheet, Text, View,StatusBar, ScrollView } from "react-native";
import {connect} from "react-redux"
import {getAllWatchLists} from "../api/WatchListApi.js"

 class Friends extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                barStyle='light-content'
                />
                <ScrollView>
                    <Text>TEST</Text>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}

function mapStateToProps(state){
    return {
        watchList: state.watchList,
        customUser: state.customUser
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends)

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "black",
        justifyContent:'center',
    },
});
