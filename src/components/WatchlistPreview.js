import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Alert,
    TouchableHighlight
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import ThumbnailList from "./ThumbnailList";
import {swGreen} from '../styles/Colors';
import {connect} from 'react-redux';



class WatchlistPreview extends Component {
    render() {
        console.log(this.props.watchList);
        return (
            <ThumbnailList listTitle={"MY WATCHLIST"}
            navigation={this.props.navigation}
            movieList={this.props.watchList} />
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
        // Nothing
    }
}

export default connect(mapStateToProps, null)(WatchlistPreview)


const styles = StyleSheet.create({
    container: {
         marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "aquamarine",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
