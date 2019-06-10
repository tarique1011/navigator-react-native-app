import React, { Component } from 'react';
import { createStackNavigator, 
        createBottomTabNavigator, 
        createAppContainer } 
        from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LogInScreen, SignUpScreen, HelpScreen, SuccessScreen } from './src';


const TabNavigator = createBottomTabNavigator({
    Success: {
      screen: SuccessScreen,
      navigationOptions: {
        tabBarLabel: 'User',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name={'user'} size={25} color={tintColor} solid />
        )
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        tabBarLabel: 'Support',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name='comments' size={25} color={tintColor} solid />
        )
      }
    }
    },
    {
      initialRouteName: 'Success',
      tabBarOptions: {
          activeTintColor: '#000',
          inactiveTintColor: '#fff',
          labelStyle: {
            fontSize: 15,
          },
          style: {
            backgroundColor: '#ff9a3d',
          }
      }
    }
);

const AppNavigator = createStackNavigator({
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
  
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#ff9a3d'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 22
    },
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

