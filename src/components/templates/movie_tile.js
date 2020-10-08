import React, { Component }from 'react';
import{View,StyleSheet, Text,ImageBackground} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Tile(props){
        return(
           <View style = {styles.container} >
               <ImageBackground style = {styles.imageCover} source={props.image} >
        <Text>{props.title}</Text>
                <Text>{props.title}</Text>
                <Text>{props.year}</Text>
                <Text>{props.swRate}</Text>
               </ImageBackground>
           </View> 
        );
    
}
function Poster(props){
    return(
        <View>
            <ImageBackground>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <MaterialCommunityIcons name="add" color={color} size={26} />
                <MaterialCommunityIcons name="remove" color={color} size={26} />
                <MaterialCommunityIcons name="rate" color={color} size={26} />
                <MaterialCommunityIcons name="Suggest" color={color} size={26} />
                <MaterialCommunityIcons name="Delete" color={color} size={26} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
        container:{
            height:250,
            backgroundColor:'grey'

        },
        imageCover:{
            height:'100%',
            width:'100%',
            resizeMode:'cover',
        }
});

export default Tile;