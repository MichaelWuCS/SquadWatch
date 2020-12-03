import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    ImageBackground,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import {Tile} from "react-native-elements";
import { swGrey, swWhite } from "../styles/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default class RecommendationElement extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    render() {
        let bgCol = (this.props.movie.index===0)? 'rgba(130,61,0,0.6)' : 'rgba(0,87,49,0.6)';
        let imagePath = "https://image.tmdb.org/t/p/w1280"+this.props.movie.posterPath;
        console.log(imagePath)
        return (
            <TouchableOpacity style = {styles.tile} onPress={()=>{this.props.navigation.push("Movie",{id:this.props.movie.id, name:this.props.movie.title})}}>
                <View style={styles.tile} backgroundColor={bgCol}>
                    <ImageBackground source={{uri:imagePath}}
                                     style={{width: "100%", height:"100%",}}
                                     imageStyle={{borderRadius:10}}>
                        <View style={styles.tile} backgroundColor={bgCol}>
                            <Text style={styles.title}> {this.props.movie.name + " ("+ this.props.movie.release_date.substring(0,4) +")"}  </Text>
                            <Text style={styles.body} numberOfLines={3}> {this.props.movie.description} </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View height={10}>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tile:{
        borderRadius:10,
        flex:1,
        width: 400,
        height: 150,
        alignContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        textAlign:"left"
    },
    body: {
        fontSize: 15,
        fontWeight: '300',
        color: "white",
        textAlignVertical:"bottom"
    }
});
