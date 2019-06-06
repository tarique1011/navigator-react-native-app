import React, { Component } from 'react';
import { createStackNavigator, 
        createBottomTabNavigator, 
        createAppContainer,
        createDrawerNavigator } 
        from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogInScreen, SignUpScreen, HelpScreen, SuccessScreen } from './src';


const LogInStack = createStackNavigator({
  LogIn: LogInScreen,
  Success: SuccessScreen
});

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen
});

const TabNavigator = createBottomTabNavigator({
    LogIn: LogInStack,
    SignUp: SignUpStack,
    Help: HelpScreen
    },
    {
      tabBarOptions: {
          activeTintColor: '#fff',
          labelStyle: {
            fontSize: 15,
          },
          style: {
            backgroundColor: 'blue',
          }
      }
    }
);

const DrawerNavigator = createDrawerNavigator({
  Login: {
    screen: LogInStack
  },
  SignUp: {
    screen: SignUpStack
  },
  Tab: {
    screen: TabNavigator
  }
});

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

