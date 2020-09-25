import React, {Component} from "react";
import {StyleSheet, Text, View, ScrollView, FlatList, Image} from "react-native";


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
    ]
};

const Thumbnail = ({title, posterPath}) => (
    <View style={styles.item}>
        <Text> {title} </Text>
        <Image source={{uri: ("https://image.tmdb.org/t/p/w1280" + posterPath)}}
               style={{width: 70, height: 105}}/>
    </View>
);


const renderItem = ({item}) => (
    <Thumbnail title = {item.name} posterPath={item.posterPath}/>
);

export default class WatchlistPreview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>MY WATCHLIST</Text>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={test_watchlist.movies}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginRight: 5,
        marginLeft: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: "aquamarine",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
