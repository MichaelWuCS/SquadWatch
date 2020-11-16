import React, { Component} from "react";
import Carousel, { ParallaxImage }  from 'react-native-snap-carousel'
import { StyleSheet, Text, View,Dimensions,Platform, TouchableOpacity,} from "react-native";
import {TMDB_KEY} from "@env";
import {swOrange,swGrey,swWhite} from '../styles/Colors'
const {width: screenWidth} = Dimensions.get('window');


export default class TheatrePreview extends Component {
    constructor(props){
        super(props);
        this.state={
            movieList:[],
            loading: true
        }
        this._renderItem = this._renderItem.bind(this);
        this.navigation = this.props.navigation;
    }

   async componentDidMount(){
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`);
        const data = await response.json();
        this.setState({movieList:data.results,loading:false})
    }catch(err){
        console.log(`errors while fetching movie slides___${err}`);
    }
};
    componentWillUnmount() {
        console.log(this)
        this.setState = (state,callback)=>{
            return;
        };
    };

    shouldComponentUpdate(nextState){
        if(nextState.movieList!==this.state.movieList){
            return true;
        }
        return false;
    }

    _renderItem ({item,index}, parallaxProps) {
        return (<TouchableOpacity onPress={()=>{this.props.navigation.push("Movie",{id:item.id, name:item.title})}}>
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: `https://image.tmdb.org/t/p/w780/${item.poster_path}` }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.2}
                    spinnerColor={swOrange}
                    {...parallaxProps}
                />
                {/* <Text style={styles.title} numberOfLines={2}>
                    { item.title }
                </Text> */}
            </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.movieList}
                renderItem={this._renderItem}
                initialNumToRender={10}
                hasParallaxImages={true}
                enableSnap={true}
                autoplay={true}
                autoplayInterval={5000}
                loop={true}

            />
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize:28,
        fontWeight: "bold",
        textTransform:'uppercase',
        color: "white",
    },
    item: {
        marginTop:20,
        width: screenWidth - 60,
        height: screenWidth - 20,
      },
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: swWhite,
        borderRadius: 8,
      },
      image: {
          width:'undefined%',
          height:'undefined%',
          aspectRatio:1,
      },
});
