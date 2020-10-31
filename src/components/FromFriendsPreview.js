import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default class FromFriendsPreview extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text} onPress = {()=>{
                    this.props.navigation.push('Friends');
                }}>FROM FRIENDS</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                </ScrollView>
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
        backgroundColor: "dodgerblue",
        height: 150,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
