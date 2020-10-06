import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dashboard from "../views/Dashboard";
import WatchList from "../views/WatchList";
import {swNavy,swOrange} from '../styles/Colors'
import HomeStack from "./stackNav";
// import { createStackNavigator } from '@react-navigation/stack';

// const DashStack = createStackNavigator();

// function HomeStack(){
//         return(
//             <DashStack.Navigator>
//                 <DashStack.Screen name='new' component={Dashboard}/>
//             </DashStack.Navigator>
//         );
    
// }
const Tab = createMaterialBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor= {swOrange}
      labelStyle={{ fontSize: 12 }}
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
        component={Dashboard}
        options={{
          tabBarLabel:false,
          tabBarIcon: ({ color }) => (
            <View style = {{
              position:'absolute',
              width:60,
              height:60,
              justifyContent:"center",
              alignItems: 'center',
            }}>
              <MaterialCommunityIcons name="infinity" color={color} size={50} style={{bottom:15,}} />
            </View>
            
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchList}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNav;