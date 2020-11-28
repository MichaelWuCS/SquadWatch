import React, { Component, useEffect, useState } from "react";
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
import { swPurple, swBlue, swOrange, swNavy, swBlack } from "../styles/Colors";
import { TMDB_KEY } from "@env";


const Thumbnail = ({ title, id, poster_path, overview, navigation }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.push("Movie", { id: id, name: title });
            }}>
                <Image source={{ uri: ("https://image.tmdb.org/t/p/w1280" + poster_path) }}
                       style={{ width: 70, height: 105 }}>
                </Image>
            </TouchableOpacity>
        </View>
    );
};


class RecommendationsPreviewList extends Component {
    /**
     * props:
     */
    listTitle;
    recommendations;

    renderItem = ({ item }) => (
        <Thumbnail title={item.original_title} id={item.id} poster_path={item.poster_path} overview={item.overview}
                   navigation={this.props.navigation} />
    );

    renderSeparator = () => {
        return <View width={"0.25%"} />;
    };

    render() {
        return (
            <TouchableHighlight style={{borderRadius: 20,height:150, marginTop:15,marginRight: 10,marginLeft: 10,}}  onPress={()=>this.props.navigation.navigate('Recommendations')}>
            <View style={styles.container}>
                <Text style={styles.text} onPress={() =>
                    this.props.navigation.push("Recommendations")
                }>{this.props.listTitle}</Text>
                <FlatList horizontal={true} showsHorizontalScrollIndicator={false}
                          data={this.props.recommendations}
                          renderItem={this.renderItem}
                          keyExtractor={item => item.id.toString()}
                          ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {


        padding: 10,
        borderRadius: 20,
        backgroundColor: swOrange,
        height: 150
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});


export default class RecommendationsPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recommendations: []
        };
    }

    componentDidMount() {
        console.log("========")
        console.log(this.props.watchlist)
        console.log("========")
        this.get_recommendations(this.props.watchlist);
    }

    get_recommendations = (watch_list) => {
        const randomMovie = watch_list[Math.floor(Math.random() * watch_list.length)];
        const requestStr = "https://api.themoviedb.org/3/movie/" + randomMovie.id + "/recommendations" + "?api_key=" + TMDB_KEY;
        fetch(requestStr)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    recommendations: results,
                    loading: false
                });
            }).catch((error) => {
            console.log("Error!: " + error);
            this.setState({ loading: false });
        });
    };

    render() {
        if (this.state.loading) {
            return <ActivityIndicator />;
        } else {
            return <RecommendationsPreviewList listTitle={"RECOMMENDATIONS"}
                                               recommendations={this.state.recommendations.results}
                                               navigation={this.props.navigation} />;
        }
    }
}



