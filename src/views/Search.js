import React, {Component, useEffect, useState} from "react";
import {
    Text,
    Button,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator, NativeEventEmitter,
    SafeAreaView
} from "react-native";
import {TMDB_KEY} from "@env";
import { ListItem, SearchBar, Avatar, Image } from 'react-native-elements';


export default class Search extends Component{
  constructor(props){
      super(props);
      this.state = {
          loading: false,      
          data: [],      
          error: null, 
          search:"",
      };

      this.arrayholder = []
  }

  componentDidMount() {
    this.makeRemoteRequest("");
  }
  
  makeRemoteRequest = (queryString) => {
    console.log("request made!: "+queryString);
    this.setState({ loading: true, search: queryString,});
    var url;
    if(queryString == undefined || queryString == ""){
      url = "https://api.themoviedb.org/3/movie/popular?api_key="+TMDB_KEY+"&language=en-US&page=1";
    }else{
      const queryPassed = queryString.trim().replace(/ /g, "%20");
      url = "https://api.themoviedb.org/3/search/movie?api_key="+TMDB_KEY+"&query="+queryPassed+"&page=1";
    }
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(res => {
      res.results.sort((a,b) => b.popularity-a.popularity);
      this.setState({
      data: res.results,
      error: res.error || null,
      loading: false,
      search: queryString,
      });
      this.arrayholder = res.results;
    })
    .catch(error => {
        this.setState({ error, loading: false });
    });
  }

  renderHeader = () => {
    return (
      <SearchBar
        // placeholder="Type Here..."
        darkTheme
        round
        onSubmitEditing={NativeEvent => {
          console.log("new ting")
          console.log(NativeEvent.nativeEvent);
          this.setState({search:NativeEvent.nativeEvent.text});
          this.makeRemoteRequest(NativeEvent.nativeEvent.text);
        }}
        onChangeText={text => this.setState({search:text})}
        autoCorrect={false}
        value={this.state.search}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem>
              <Image  source= {{ uri: "https://image.tmdb.org/t/p/w1280"+item.poster_path }}
                      style={{ width: 60, height: 90 }}/>
              <ListItem.Content>
          <ListItem.Title style={{fontWeight: 'bold' }}>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.overview.substring(0, 120)+"..."}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </SafeAreaView>
    );
  }
}