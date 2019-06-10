import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

class LogInScreen extends Component {
    static navigationOptions ={
            title: 'Sign In'
    };

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground 
                source={require('./images/burger.jpg')}
                imageStyle={{ resizeMode: 'cover' }}
                style={{ width: '100%', height: '100%' }}
                >
                    <View style={styles.cover} />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.text}>Food24</Text>
                        <TextInput 
                        style={styles.input} 
                        placeholder='Enter Email'
                        />
                        <TextInput 
                        style={styles.input} 
                        placeholder='Enter Password'
                        />
                        <TouchableOpacity
                            name="facebook" 
                            style={styles.button} 
                            onPress={() => this.props.navigation.navigate('Success')}
                        >
                            <Text style={styles.buttonText}>
                            Sign in
                            </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', fontSize: 20 }}>If you don't have an account </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>  
                                <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold', fontFamily: 'sans-serif' }}>Sign up </Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#000000', fontSize: 20 }}> here.</Text>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
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
        opacity: 0.2, 
        backgroundColor: 'white'
    },
    text: {
        color: '#ffffff', 
        fontSize: 50, 
        alignSelf: 'center', 
        // marginLeft: '5%',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 5,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    input: {
        backgroundColor: 'white',
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

    },
    buttonText: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 25
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#000',
        borderRadius: 10,
        height: 60,
        width: '50%',
        marginTop: 20,
        justifyContent: 'center'

    }
};

export { LogInScreen };
