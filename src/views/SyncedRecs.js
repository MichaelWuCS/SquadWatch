import { Animated, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import { swGrey } from "../styles/Colors";



export default class SyncRoomAnimation extends Component {

    constructor(props) {
        super(props);
        this.movie_recommendations = this.props.route.params.movie_recommendations;
    }

    componentDidMount() {
        console.log("printtttttt")
    }

    renderRec = (item) => {
        //console.log("yerrrrlllll: ");
        //console.log("boy "+item.index);
        //console.log(item.item);
        let bgCol = (item.index===0)? 'rgba(130,61,0,0.6)' : 'rgba(0,87,49,0.6)';
        let imagePath = "https://image.tmdb.org/t/p/w1280"+item.item.poster_path;
        return (
            <TouchableOpacity style={styles.tile} onPress={()=>{this.props.navigation.push("Movie",{id:item.item.id, name:item.item.title})}}>
                <View style={styles.tile} backgroundColor={bgCol}>
                    <ImageBackground source={{uri:imagePath}}
                                     style={{width: "100%", height: "100%", borderRadius:10}}
                                     imageStyle={{borderRadius:10}}>
                        <View style={styles.tile} backgroundColor={bgCol}>
                            <Text style={styles.title}> {item.item.title + " ("+ item.item.release_date.substring(0,4) +")"}  </Text>
                            <Text style={styles.body} numberOfLines={3}> {item.item.overview} </Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return <View height={"10%"}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.movie_recommendations}
                          renderItem={this.renderRec}
                          ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: swGrey,
        width: "100%",
        height: undefined,
        alignContent: "center",
        alignItems: "center"
    },
    tile:{
        borderRadius:10,
        flex:1,
        width: "100%",
        height: "10%",
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
    },
});
