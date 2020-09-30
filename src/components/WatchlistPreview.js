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

// Set the configuration for your app
const config = {
    apiKey: "AIzaSyDRW8Lh0Mn2Dv7PZfLkaPFmtXBZEaLpMgw",
    authDomain: "squadwatch-e2133.firebaseapp.com",
    databaseURL: "https://squadwatch-e2133.firebaseio.com",
    storageBucket: "squadwatch-e2133.appspot.com",
    projectId: "squadwatch-e2133",
    appId: "squadwatch"
};

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const firestore = firebase.firestore();

const TMDB_KEY = "fd6611bdf7d4a175b6de314125440173";//process.env['TMDB_KEY'];

function Watchlist(listID) {
    console.log(listID);


    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    firestore
        .collection('watchList')
        .doc(listID)
        .get()
        .then((doc) => {
            console.log(doc.data());
            setLoading(false);
            setMovies(doc.data());
        });

    useEffect(() => {
        firestore
            .collection('watchList')
            .doc(listID)
            .get()
            .then((doc) => {

                console.log(doc.data());
                setLoading(false);
                setMovies(doc.data());
            });
    }, []);

    if (loading) {
        return <ActivityIndicator/>;
    } else {
        return movies;
    }

}

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

console.log(TMDB_KEY);

const test_movie = fetch("https://api.themoviedb.org/3/movie/500?api_key=" + TMDB_KEY);

// test_movie
//     .then((response) => response.json())
//     .then((json) => {
//         console.log(json);
//     });

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
        {
            id: "601",
            name: "E.T. the Extra-Terrestrial",
            posterPath: "/pEKStszBzTZCvR0H4tosjqxmE7X.jpg"
        },
        {
            id: "346",
            name: "Seven Samurai",
            posterPath: "/1wCRVLGI7SoTOoDRzWlbt2dMDuy.jpg"
        },
    ]
};

const Thumbnail = ({id, title, posterPath}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Modal animationType="slide" transparent={true}
                   visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal view closed");
            }}>
                <View style={styles.container} marginTop={300} justifyContent={"center"} backgroundColor={"dodgerblue"}
                      opacity={0.94}>
                    <TouchableHighlight
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}>
                        <ScrollView>

                        <MovieData id={id}/>
                        </ScrollView>
                    </TouchableHighlight>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                setModalVisible(true);
            }}>
                <Image source={{uri: ("https://image.tmdb.org/t/p/w1280" + posterPath)}}
                       style={{width: 70, height: 105}}>

                </Image>
            </TouchableOpacity>
        </View>
    );
};

const renderItem = ({item}) => (
    <Thumbnail id={item.id} title={item.name} posterPath={item.posterPath}/>
);

export default class WatchlistPreview extends Component {
    render() {
        return (
            /*<View style={styles.container}>
                <Text style={styles.text}>MY WATCHLIST</Text>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={test_watchlist.movies}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                />
            </View>*/
            <ThumbnailList listTitle={"MY WATCHLIST"} movieList={test_watchlist.movies}/>
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
