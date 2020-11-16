import * as React from 'react';
import { createStackNavigator, Header, HeaderTitle } from '@react-navigation/stack';
import Dashboard from '../views/Dashboard';
import{swOrange,swGrey,swBlack,swWhite} from '../styles/Colors';
import WatchList from '../views/WatchList';
import Search from '../views/Search';
import MovieDetails from '../views/MovieDetails';
import Settings from '../views/settings';
import Friends from '../views/Friends';
import SyncScreen from "../views/SyncScreen";
import RoomScreen from "../views/RoomScreen";
import {Button} from "react-native-elements";
import { StackActions } from "@react-navigation/routers";
import SignUp  from '../views/SignUp';
import Login from '../views/Login';
import Index_page from "../views/Index";
import BottomNav from './BottomTab';
import  Icon from  'react-native-vector-icons/Ionicons';
import SyncRoomAnimation from "../views/SyncRoomAnimation";
import Recommendations from "../views/Recommendations";



const DashStack = createStackNavigator();

function HomeStack({navigation}){
        return(

            <DashStack.Navigator>
                <DashStack.Screen
                name='Dashboard'
                component={Dashboard}
                options={{
                    headerStyle:{
                        backgroundColor:swOrange,
                        borderBottomWidth:0,
                        elevation:0,
                        shadowOpacity:0,
                    },
                    headerTitleStyle:{
                        color:swWhite,
                        fontWeight:'bold',
                    },
                    headerRight: () => (
                        <Button
                        buttonStyle={{
                           paddingRight:20,
                        }}
                        icon={
                            <Icon
                            name='md-settings'
                            size={23}
                            color={swWhite}
                            />
                        }
                          onPress={() => navigation.navigate('Settings') }
                          title=""
                          color="#fff"
                          type="clear"
                        />),
                }}
                />
                <DashStack.Screen
                    name={'Settings'}
                    component={Settings}
                    options={{
                        headerStyle:{
                            backgroundColor:swOrange,
                            borderBottomWidth:0,
                            elevation:0,
                            shadowOpacity:0,
                        },
                        headerTitleStyle:{
                            color:swWhite,
                            fontWeight:'bold',
                        },
                    }}
                />
                <DashStack.Screen
                    name='WatchList'
                    component={WatchList}
                    options={{
                        headerStyle:{
                            backgroundColor:swGrey,
                        },
                        headerTitleStyle:{
                            color:'white',
                            fontWeight:'bold',
                        }
                    }}
                />
                <DashStack.Screen
                    name='Recommendations'
                    component={Recommendations}
                    options={{
                        headerStyle:{
                            backgroundColor:swGrey,
                        },
                        headerTitleStyle:{
                            color:'white',
                            fontWeight:'bold',
                        }
                    }}
                />
                <DashStack.Screen
                    name={'Movie'}
                    title='Movie Details'
                    component={MovieDetails}
                    options={({route}) => ({
                        headerStyle:{
                            backgroundColor:swGrey,
                        },
                        headerTitleStyle:{
                            color:'white',
                            fontWeight:'bold',
                        },
                        title: route.params.name
                    })}
                />
            </DashStack.Navigator>
        );
}

const RoomStack = createStackNavigator();

function SyncStack(){
    return(
        <RoomStack.Navigator>
            <RoomStack.Screen
                name='Sync'
                component={SyncScreen}
                options={{
                    headerStyle:{
                        backgroundColor:swOrange,
                    },
                    headerTitleStyle:{
                        color:'white',
                        fontWeight:'bold',
                    }
                }}
            />
            <RoomStack.Screen
                name='Room'
                component={RoomScreen}
                options={({route}) => ({
                    headerStyle:{
                        backgroundColor:swGrey,
                    },
                    headerTitleStyle:{
                        color:'white',
                        fontWeight:'bold',
                    },
                    title: route.params.name
                })}
            />
            <RoomStack.Screen
                name='SyncAnimation'
                component={SyncRoomAnimation}
                options={({route}) => ({
                    headerStyle:{
                        backgroundColor:swGrey,
                    },
                    headerTitleStyle:{
                        color:'white',
                        fontWeight:'bold',
                    },
                    title: "Syncing..."
                })}
            />
        </RoomStack.Navigator>
    )
}

const SearchStack = createStackNavigator();

function QueryStack(){
    return(

        <SearchStack.Navigator>
            <SearchStack.Screen
            name='Search'
            component={Search}
            options={{
                headerStyle:{
                    backgroundColor:swGrey,
                    borderBottomWidth:0,
                    elevation:0,
                    shadowOpacity:0,
                },
                headerTitleStyle:{
                    color:swWhite,
                    fontWeight:'bold',
                }
            }}
            />
            <SearchStack.Screen
            name={'Movie'}
            title='Movie Details'
            component={MovieDetails}
            options={({route}) => ({
                headerStyle:{
                    backgroundColor:swGrey,
                },
                headerTitleStyle:{
                    color:'white',
                    fontWeight:'bold',
                },
                title: route.params.name
            })}
            />
        </SearchStack.Navigator>
    );
}

function WatchListStack() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen
            name='WatchList'
            component={WatchList}
            options={{
                headerStyle:{
                    backgroundColor:swGrey,
                    borderBottomWidth:0,
                    elevation:0,
                    shadowOpacity:0,
                },
                headerTitleStyle:{
                    color:swWhite,
                    fontWeight:'bold',
                }
            }}
            />
            
            <SearchStack.Screen
            name={'Movie'}
            title='Movie Details'
            component={MovieDetails}
            options={({route}) => ({
                headerStyle:{
                    backgroundColor:swGrey,
                },
                headerTitleStyle:{
                    color:'white',
                    fontWeight:'bold',
                },
                title: route.params.name
            })}
            />
        </SearchStack.Navigator>
    );
}

const IndexStack = createStackNavigator();

function InitStack(){
    return(
        <IndexStack.Navigator
        initialRouteName='Starter'
        screenOptions={{
            headerShown: false
          }}
        >
            <IndexStack.Screen
                name='Starter'
                component={Index_page}
            />

            <IndexStack.Screen
                name='Login'
                component={Login}
            />
            <IndexStack.Screen
            name='SignUp'
            component={SignUp}
            />
            <IndexStack.Screen

            name='Dashboard'
            component={BottomNav}
            />
        </IndexStack.Navigator>
    );

}

export{
    HomeStack,
    QueryStack,
    WatchListStack,
    SyncStack,
    InitStack
}
