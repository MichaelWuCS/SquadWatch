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

export default class ThumbnailList extends Component {
    /**
     * props:
     */
    listTitle;
    movieList;

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.listTitle}</Text>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={this.props.movieList}
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
