import React, {Component, useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Modal,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Image, SafeAreaView
} from "react-native";
import {swPurple} from '../styles/Colors'
import {TMDB_KEY} from "@env";

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


const Thumbnail = ({title, backdrop_path, overview}) => {
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
                            <Text>
                                <Text style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight:"bold",
                                    textDecorationLine:"underline"
                                }}>{title+"\n"}</Text>
                                <Text style={{
                                    color: "white",
                                    fontSize:12
                                }}>{"\n"+ overview}</Text>
                            </Text>
                        </ScrollView>
                    </TouchableHighlight>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => {
                setModalVisible(true);
            }}>
                <Image source={{uri: ("https://image.tmdb.org/t/p/w1280" + backdrop_path)}}
                       style={{width: 70, height: 105}}>
                </Image>
            </TouchableOpacity>
        </View>
    );
};

const renderItem = ({item}) => (
    <Thumbnail title={item.original_title} backdrop_path={item.backdrop_path} overview={item.overview}/>
);


class RecommendationsPreviewList extends Component {
    /**
     * props:
     */
    listTitle;
    recommendations;

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.listTitle}</Text>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data = {this.props.recommendations}
                          renderItem={renderItem}
                          keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: swPurple,
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});


export default class RecommendationsPreview extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            recommendations:[]
        }
    }

    componentDidMount() {
        this.get_recommendations(test_watchlist);
    }

    get_recommendations = (watch_list) => {
        const randomMovie = watch_list.movies[Math.floor(Math.random() * watch_list.movies.length)];
        const requestStr = "https://api.themoviedb.org/3/movie/" + randomMovie.id + "/recommendations" + "?api_key=" + TMDB_KEY;
        fetch(requestStr)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    recommendations: results,
                    loading: false
                });
            }).catch((error)=> {
                console.log("Error!: " + error);
                this.setState({loading: false });
            })
    }

    render() {
        if(this.state.loading){
            return <ActivityIndicator/>
        }
        else{
            return <RecommendationsPreviewList listTitle={"RECOMMENDATIONS"} recommendations={this.state.recommendations.results}/>
        }
    }
}



