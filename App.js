import React, { Component } from 'react';
import { createStackNavigator, 
        createBottomTabNavigator, 
        createAppContainer } 
        from 'react-navigation';
import { fadeIn, zoomIn, flipY, flipX, zoomOut, fromRight } from 'react-navigation-transitions';
import firebase from 'firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartScreen from './src/CartScreen';
import MenuScreen from './src/MenuScreen';
import SignUpScreen from './src/SignUpScreen';
import LogInScreen from './src/LogInScreen';
import LoadingScreen from './src/Loading';
import UserProfileScreen from './src/UserProfileScreen';
import OrderInTransitScreen from './src/OrderInTransitScreen';

const TabNavigator = createBottomTabNavigator({
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name='md-home' size={20} color={tintColor} solid />
        )
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name='md-cart' size={20} color={tintColor} solid />
        )
      }
    },
    OrderInTransit: {
      screen: OrderInTransitScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name='receipt' size={20} color={tintColor} solid />
        )
      }
    },
    User: {
      screen: UserProfileScreen,
      navigationOptions: {
        tabBarLabel: () => null,
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome5 name='user-circle' size={20} color={tintColor} solid />
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
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBnbKAfbUUVYLXseIF6479wNe3ejyrcN7w',
        authDomain: 'pizzadeliveryapp-cdafc.firebaseapp.com',
        databaseURL: 'https://pizzadeliveryapp-cdafc.firebaseio.com',
        projectId: 'pizzadeliveryapp-cdafc',
        storageBucket: 'pizzadeliveryapp-cdafc.appspot.com',
        messagingSenderId: '542659949490',
        appId: '1:542659949490:web:5a8fb66c86d92fc8'
      });
     }
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

