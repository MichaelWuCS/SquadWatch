import * as React from 'react';
import { createStackNavigator, Header, HeaderTitle } from '@react-navigation/stack';
import Dashboard from '../views/Dashboard';
import{swOrange} from '../styles/Colors';
import WatchList from '../views/WatchList';

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
            </DashStack.Navigator>
        );
}

export default HomeStack;