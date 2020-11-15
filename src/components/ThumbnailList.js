import React, {Component, useEffect, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView, StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import {TMDB_KEY} from "@env";
import {swGreen, swNavy, swOrange, swBlack, swGrey} from '../styles/Colors'



function fetch_movie_data(movie_id) {
    const requestStr = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + TMDB_KEY;
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});


    useEffect(() => {
        fetch(requestStr)
            .then((response) => {
                console.log(response.headers);
                return response.json();
            })
            .then((json) => {
                //console.log(movie_id);
                setMovie(json);
                console.log(json);
            }).catch((error) => {
            console.log("Error!: " + error);
        }).finally(() => setLoading(false)
        );
    }, []);

    if (loading) {
        return <ActivityIndicator/>;
    } else {
        return <Text>
            <Text style={{
                color: "white",
                textAlign: "center",
                fontWeight:"bold",
                textDecorationLine:"underline"
            }}>{movie.title+"\n"}</Text>
            <Text style={{
                color: "white",
                fontSize:12
            }}>{"\n"+movie.overview}</Text>
        </Text>;
    }
}

const MovieData = ({
                       id,

                   }) => {
    return fetch_movie_data(id);
};


const Thumbnail = ({id, title, posterPath, navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.push("Movie",{id:id, name:title})
            }}>
                <Image source={{uri: ("https://image.tmdb.org/t/p/w1280" + posterPath)}}
                       style={{width: 70, height: 105}}>

                </Image>
            </TouchableOpacity>
        </View>
    );
};



export default class ThumbnailList extends Component {
    /**
     * props:
     */
    listTitle;
    movieList;

    constructor(props){
        super(props);
    }

    renderItem = ({item}) => (
        <Thumbnail id={item.id} title={item.name} posterPath={item.posterPath} navigation={this.props.navigation}/>
    );

    renderSeparator = () => {
        return <View width={"1%"}></View>
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress = {()=>{
                    this.props.navigation.push('WatchList');
                }}>
                    <Text style={styles.text} >{this.props.listTitle}</Text>
                </TouchableOpacity>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={this.props.movieList}
                          renderItem={this.renderItem}
                          keyExtractor={item => item.id}
                          ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: swOrange,
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
