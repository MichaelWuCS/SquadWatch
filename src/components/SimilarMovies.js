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
    TouchableHighlight,
    ImageBackground
} from "react-native";
import {TMDB_KEY} from "@env";




export default class SimilarMovies extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recommendations: [{title: "", poster_path: ""}]
        };
    }

    componentDidMount() {
        this.getRecommendations(this.props.id);
    }

    getRecommendations = (id) => {
        const requestStr = "https://api.themoviedb.org/3/movie/" + id + "/recommendations" + "?api_key=" + TMDB_KEY;
        fetch(requestStr)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    recommendations: results,
                    loading: false
                });
            }).catch((error)=> {
                this.setState({loading: false });
            })
    }

    displayReccomendations = () =>{
        
        var splicedArray = [...this.state.recommendations.results];

        return (
            <View style={styles.container}>
                <FlatList horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data = {this.state.recommendations.results}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    style={styles.flatlist}
                />
            </View>
        )
    }

    render() {
        if(this.state.loading){
            return <ActivityIndicator/>
        }
        else{
        return (
            <View>
                <this.displayReccomendations></this.displayReccomendations>
            </View>
        );
        }
    }

    renderItem = ({item}) => (
        <Thumbnail
        title={item.original_title}
        id={item.id}
        poster_path={item.poster_path}
        overview={item.overview}
        navigation={this.props.navigation}/>
    );

    
}

const Thumbnail = ({title, id, poster_path, overview, navigation}) => {
    return (
        <View>
            <Image source={{uri: ("https://image.tmdb.org/t/p/w1280" + poster_path)}}
                    style={{width: 70, height: 105}}>
            </Image>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        paddingTop: "5%",
        paddingLeft: "3%",
        paddingRight: "3%",
        
    },
    flatlist: {
        backgroundColor: "black"

    }
});
