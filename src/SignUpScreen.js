import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userUpdate } from './actions';


class SignUpScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            dob: '',
            email: '',
            password: '',
            error: ''
        };
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.OnSignUpSuccess)
            .catch((error) => this.setState({ error: error.message }));
    }

    OnSignUpSuccess = () => {
        console.log(this.state.email);
        this.props.userUpdate({ name: this.state.name, 
                        email: this.state.email,
                        dob: this.state.dob, 
                        password: this.state.password 
                        });
        this.props.navigation('Tab');
    }

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
                            placeholder='First Name'
                            placeholderTextColor='#fff'
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name}                            
                        />
                        
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Date Of Birth'
                            placeholderTextColor='#fff'
                            onChangeText={(dob) => this.setState({ dob })}
                            value={this.state.dob}
                        />
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Email'
                            placeholderTextColor='#fff'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Password'
                            secureTextEntry
                            placeholderTextColor='#fff'
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={this.handleSignUp}
                        >
                            <Text style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'red' }}>{this.state.error}</Text>
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
        justifyContent: 'center',
        marginBottom: 10,

    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, { userUpdate })(SignUpScreen);
