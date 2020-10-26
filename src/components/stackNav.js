import * as React from 'react';
import { createStackNavigator, Header, HeaderTitle } from '@react-navigation/stack';
import{Button} from 'react-native-elements';
import  Icon from  'react-native-vector-icons/Ionicons'
import Dashboard from '../views/Dashboard';
import{swOrange,swGrey,swBlack,swWhite} from '../styles/Colors';
import WatchList from '../views/WatchList';
import Search from '../views/Search';
import MovieDetails from '../views/MovieDetails';
import Settings from '../views/settings'
import StackActions from '@react-navigation/core';
import SignUp  from '../views/SignUp';
import Login from '../views/Login';
import Index_page from "../views/Index"
 


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
                        // header:({goBack})=>({
                        //     left:()
                        // })

                    }}
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
            name='signUp'
            component={SignUp}
            />
        </IndexStack.Navigator>
    );

}

export{
    HomeStack,
    QueryStack,
    InitStack
}