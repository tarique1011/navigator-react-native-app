import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, DatePickerAndroid } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import LotteView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { userUpdate } from './actions';
import anim from './animations/wave-loading.json';
import Icon from 'react-native-vector-icons/FontAwesome';
class SignUpScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up'
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dob: 'Date Of Birth',
            email: '',
            password: '',
            error: '',
            loading: false
        };
    }


    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.OnSignUpSuccess)
            .catch((error) => this.setState({ error: error.message, loading: false }));
        
        this.setState({ loading: true })
    }
      OnSignUpSuccess=() =>{
        firebase.database().ref('/UsersDetail').push({
            FirstName: this.state.name,
            DOB: this.state.dob,
            Email: this.state.email,
            Password: this.state.password
        }).catch((error) => alert(error))
      }
    // OnSignUpSuccess = () => {
    //     firebase
    //         .database()
    //         .ref('/Users')
    //         .push({
    //             name: this.state.name,
    //             dob: this.state.dob,
    //             email: this.state.email,
    //             password: this.state.password
    //         });
    //     this.setState({ loading: false });
    //     this.props.navigation.navigate('Tab');
    // }



    renderLoadUp() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                    <Text style={{ fontSize: 20, color: 'black', marginBottom: 20 }}>
                        Please Wait
                    </Text>
                    <LotteView
                        style={{
                            width: 150,
                            height: 150
                        }}
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
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        backgroundColor: '#33445B',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={styles.text}>Joe's Pizza</Text>
                    <TextInput
                        underlineColorAndroid='#fff'
                        style={styles.input}
                        placeholder='First Name'
                        placeholderTextColor='#fff'
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />

                    <View style={styles.calendarView}>
                        <TextInput
                            underlineColorAndroid='#fff'
                            style={styles.calendarTextInput}
                            editable={false}
                            placeholder={this.state.dob}
                            placeholderTextColor='#fff'
                        // onChangeText={(dob) => this.setState({ dob })}
                        //value={this.state.dob}
                        />
                        <Icon name="calendar" size={26} color='gray' style={styles.calendarIcon} />
                    </View>

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
    render() {
        return (
            this.renderLoadUp()
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
    },
    calendarView: {
        flexDirection: 'row',
        width: '90%',
        marginTop: 15
    },
    calendarTextInput: {
        backgroundColor: 'transparent',
        opacity: 0.7,
        height: 60,
        flex: 1,
        fontSize: 20,
    },
    calendarIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        marginRight: 3,
        marginBottom: 12
    }
};
function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, { userUpdate })(SignUpScreen);