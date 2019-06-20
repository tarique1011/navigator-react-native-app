import React, { Component } from 'react';
import { createStackNavigator, 
        createBottomTabNavigator, 
        createAppContainer } 
        from 'react-navigation';
import { fadeIn, zoomIn, flipY, flipX, zoomOut, fromRight } from 'react-navigation-transitions';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CartScreen from './src/CartScreen';
import MenuScreen from './src/MenuScreen';
import SignUpScreen from './src/SignUpScreen';
import LogInScreen from './src/LogInScreen';
import LoadingScreen from './src/Loading';

const TabNavigator = createBottomTabNavigator({
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name={'bars'} size={25} color={tintColor} solid />
        )
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name='cart-arrow-down' size={25} color={tintColor} solid />
        )
      }
    }
    },
    {
      initialRouteName: 'Menu',
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
  Loading: LoadingScreen,
  SignIn: LogInScreen,
  SignUp: SignUpScreen,
  Tab: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  }
},
{
  initialRouteName: 'Loading',
  transitionConfig: () => fromRight(600),
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

