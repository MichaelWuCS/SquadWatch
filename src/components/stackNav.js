import * as React from 'react';
import { createStackNavigator, Header, HeaderTitle } from '@react-navigation/stack';
import{Button} from 'react-native-elements';
import  Icon from  'react-native-vector-icons/Ionicons'
import Dashboard from '../views/Dashboard';
import{swOrange,swGrey,swBlack,swWhite} from '../styles/Colors';
import WatchList from '../views/WatchList';
import Search from '../views/Search';
import MovieDetails from '../views/MovieDetails';
import SyncScreen from '../views/SyncScreen';
import RoomScreen from '../views/RoomScreen';

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
                          onPress={() => navigation.dispatch(StackActions.push('Settings')) }
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
        </SearchStack.Navigator>
    );
}

export{
    HomeStack,
    QueryStack,
    SyncStack
}
