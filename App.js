import React, { Component } from 'react';
import { createStackNavigator, 
        createBottomTabNavigator, 
        createAppContainer } 
        from 'react-navigation';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { HelpScreen } from './src';
import SuccessScreen from './src/Success';
import SignUpScreen from './src/SignUpScreen';
import LogInScreen from './src/LogInScreen';
import LoadingScreen from './src/Loading';

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
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      header: null
    }
  },
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
  constructor(props) {
    super(props);
    firebase.initializeApp({ 
      apiKey: 'AIzaSyAnWZisUqyXjngHd04CA4Z6xOyyWtGU7Lo',
      authDomain: 'authenticator-a650d.firebaseapp.com',
      databaseURL: 'https://authenticator-a650d.firebaseio.com',
      projectId: 'authenticator-a650d',
      storageBucket: 'authenticator-a650d.appspot.com',
      messagingSenderId: '640088755875',
      appId: '1:640088755875:web:1a27e29288c58a0e' 
    }); 
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

