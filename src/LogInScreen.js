import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LogInScreen extends Component {
    static navigationOptions ={
            title: 'Sign In'
    };

    render() {
        return (
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps='handled'
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
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Enter Email'
                            placeholderTextColor='#fff'
                        />
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Enter Password'
                            placeholderTextColor='#fff'
                        />
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => this.props.navigation.navigate('Tab')}
                        >
                            <Text style={styles.buttonText}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <View 
                            style={{ marginTop: 15, 
                                    flexDirection: 'row', 
                                    justifyContent: 'center',
                                    alignItems: 'center' }}
                        >
                            <Text 
                                style={{ color: '#fff', 
                                        fontSize: 20 }}
                            >If you don't have an account </Text>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('SignUp')}
                            >  
                                <Text 
                                    style={{ color: '#ff9a3d', 
                                    fontSize: 20, 
                                    fontWeight: 'bold', 
                                    fontFamily: 'sans-serif' }}
                                >Sign up </Text>
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 20 }}>here.</Text>
                        </View>
                    </View>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = {
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
        marginTop: 20,
        fontSize: 20,
        shadowColor: 'rgba(0,0,0,.75)',
        shadowOffset: { width: -1, height: 1 },
        shadowRadius: 10,
        color: '#fff'
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
        justifyContent: 'center'

    }
};

export { LogInScreen };
