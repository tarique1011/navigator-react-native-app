import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import LotteView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userUpdate } from './actions';
import anim from './animations/splashy-loader.json';

class LogInScreen extends Component {
    static navigationOptions ={
            title: 'Sign In' 
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            authentication: false
        };
    }

    handleOnLogin = () => {
        this.setState({ authenticating: true });
        const { email, password } = this.state;
        this.setState({ error: '' });
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ authenticating: false, email: '', password: '' });
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Tab' })]
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch((error) => this.setState({ error: error.message, authenticating: false, password: '' }));
    }

    renderLoadUp() {
        if (this.state.authenticating) {
            return (
                <View 
                    style={{ flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: '#fff' }}
                >
                    <Text style={{ fontSize: 20, color: 'black', marginBottom: 20 }}>
                        Please Wait
                    </Text>
                    <LotteView 
                        style={{ width: 150,
                                height: 150 }}
                        source={anim}
                        autoPlay
                        loop
                    />
                </View>
            );
        }

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
                        <Text style={styles.text}>Joe's Pizza</Text>
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Enter Email'
                            placeholderTextColor='#fff'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                            autoCapitalize="none"
                        />
                        <TextInput 
                            underlineColorAndroid='#fff'
                            style={styles.input} 
                            placeholder='Enter Password'
                            placeholderTextColor='#fff'
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password })}
                            calue={this.state.password}
                            autoCapitalize="none"
                        />
                        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>{this.state.error}</Text>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={this.handleOnLogin
                            }
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

    render() {
        return (
            this.renderLoadUp()
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
        marginBottom: 10,
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

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { userUpdate
 })(LogInScreen);
