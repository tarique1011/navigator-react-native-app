import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SignUpScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    }
    render() {
        return (
            <KeyboardAwareScrollView 
                contentContainerStyle={{ flexGrow: 1, 
                                        justifyContent: 'center', 
                                        alignItems: 'center' }}
            >
                    <View 
                        style={{ flex: 1, 
                                width: '100%', 
                                backgroundColor: '#33445B', 
                                alignItems: 'center', 
                                justifyContent: 'center' }}
                    >
                        <Text style={styles.text}>Punchh</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='First Name'
                            placeholderTextColor='#fff'
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Date Of Birth'
                            placeholderTextColor='#fff'
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Email'
                            placeholderTextColor='#fff'
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Password'
                            placeholderTextColor='#fff'
                        />
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => this.props.navigation.navigate('Success')}
                        >
                            <Text style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
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
        textShadowColor: 'rgba(0, 0, 0, .75)',
        textShadowOffset: { width: -1, height: 2 },
        textShadowRadius: 5,
        fontWeight: 'bold',
        fontFamily: 'Futura'
    },
    input: {
        backgroundColor: 'transparent',
        opacity: 0.7,
        height: 60,
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 15,
        borderColor: 'lightgray',
        borderBottomWidth: 3,
        borderRadius: 3,
        fontSize: 20,
        shadowColor: 'rgba(0,0,0,.75)',
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 10

    },
    buttonText: {
        color: '#ffffff',
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#ff9a3d',
        borderRadius: 40,
        height: 60,
        width: '50%',
        marginTop: 20,
        justifyContent: 'center',
        marginBottom: 10,

    }
};

export { SignUpScreen };
