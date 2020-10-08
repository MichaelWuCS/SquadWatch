import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dashboard from "../views/Dashboard";
import WatchList from "../views/WatchList";
import Search from "../views/Search";
import {swNavy,swOrange} from '../styles/Colors';
import{HomeStack,QueryStack} from './stackNav';

const Tab = createMaterialBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor= {swOrange}
      shifting={false}
      labelStyle={{ fontSize: 11 }}
      barStyle={{ backgroundColor: swNavy }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sync"
        component={HomeStack}
        options={{
          tabBarLabel:'Sync',
          tabBarIcon: ({ color }) => (
            <View style = {{
              position:'absolute',
              width:30,
              height:30,
              justifyContent:"center",
              alignItems: 'center',
            }}>
              <MaterialCommunityIcons name="infinity" color={color} size={30}/>
            </View>
            
          ),
        }}
      />
      <Tab.Screen
      name='WatchList'
      component={WatchList}
      options={{
        tabBarLabel: "WatchList",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name='movie-roll' color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen
        name="Search"
        component={QueryStack}
        options={{
          tabBarLabel: 'search',
          tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26}/>)
        }}
      />
  
    </Tab.Navigator>
  );
}
export default BottomNav;