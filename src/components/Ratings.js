import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default class Rating extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }



}

/*
    ratingSystem = () =>{
        return (
            <View style = {styles.ratings}>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 1) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(1);
                    this.setState({rating : 1});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 2) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(2);
                    this.setState({rating : 2});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 3) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(3);
                    this.setState({rating : 3});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 4) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    this.changeRating(4);
                    this.setState({rating : 4});
                }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo
                name = {(this.state.rating >= 5) ? "star": "star-outlined"}
                size = {24} color = "white"
                onPress = {()=>{
                    
                    this.changeRating(5);
                    this.setState({rating : 5});
                }}
                />
            </TouchableOpacity>
            </View>

            
        );
    }

    changeRating = async (newRating) =>{
        try {
            // Make firebase request
            console.log(newRating);
            var ratingsList = {500: 1};
            updateRatings("6ysMu58HyzNj6ZD8ODCL",ratingsList);
        } catch (error) {
            console.log(error);
        }
    }
    
    
    getRatingsInfo = async() =>{
        try {
            //var userIDkey = this.props.customUser.userId;
            console.log("Making ratings request");
            var userRatings = await getRatings("6ysMu58HyzNj6ZD8ODCL");
            this.props.updateRatings(userRatings);
            console.log(userRatings);
            console.log("?");
        } catch (error) {
            console.log(error)
        }
    }

*/