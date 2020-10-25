import * as React from 'react';
import { createStackNavigator, Header, HeaderTitle } from '@react-navigation/stack';
import Dashboard from '../views/Dashboard';
import{swOrange,swGrey,swBlack,sw} from '../styles/Colors';
import WatchList from '../views/WatchList';
import Search from '../views/Search';
import MovieDetails from '../views/MovieDetails';
import Friends from "../views/Friends"

const DashStack = createStackNavigator();

function HomeStack(){
        return(
            
            <DashStack.Navigator>
                <DashStack.Screen 
                name='Dashboard' 
                component={Dashboard}
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
                name='Friends' 
                component={Friends}
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
                },
                headerTitleStyle:{
                    color:'white',
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
                },
                headerTitleStyle:{
                    color:'white',
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
    )
}


export{
    HomeStack,
    QueryStack,
    WatchListStack
}