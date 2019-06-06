import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ImageBackground, KeyboardAvoidingView } from 'react-native';

class LogInScreen extends Component {
    static navigationOptions ={
            title: 'Sign In',
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
    render() {
        return (
            <KeyboardAvoidingView>
            <ImageBackground 
            source={require('./images/pizza.png')}
            imageStyle={{ resizeMode: 'cover' }}
            style={{ width: '100%', height: '100%' }}
            >
            <View style={styles.cover} />
            <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'  }}>
            <Text style={styles.text}>Pizza Order</Text>
            <TextInput 
            style={styles.input} 
            placeholder='Enter Email'
            />
            <TextInput 
            style={styles.input} 
            placeholder='Enter Password'
            />
            </View>
            </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    cover: { 
        position: 'absolute', 
        top: 0,    
        left: 0, 
        right: 0, 
        bottom: 0, 
        opacity: 0.4, 
        backgroundColor: 'white'
    },
    text: {
        color: '#000000', 
        fontSize: 50, 
        alignSelf: 'center', 
        // marginLeft: '5%',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 5,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    input: {
        backgroundColor: 'white',
        opacity: 0.9,
        height: 60,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 20,
        borderColor: 'lightgray',
        borderWidth: 3,
        borderRadius: 10,
        fontSize: 20,
        shadowColor: 'rgba(0,0,0,.75)',
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 10

    }
};

export { LogInScreen };
