import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

class SuccessScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            button: true
        };
    }

    handleLogOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('LogIn'));
    }

    render() {
        console.log(this.state.button);
    const { headerCard, text, imageCard } = styles;

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#33445B' }}>
            <View style={headerCard}>
                
                    <Text 
                        style={text}
                    >
                        Hello {this.props.user.name}
                    </Text>
                    <Text 
                        style={text}
                    >
                        Your email is: {this.props.user.email}
                    </Text>
                    <Text 
                        style={text}
                    >
                        Your password is: {this.props.user.password}
                    </Text>

            </View>
            <View style={imageCard}>
                <Button 
                    title="Log out  "
                    onPress={this.handleLogOut}
                />
            </View>    
        </View>
    );
}
}

const styles = {
    headerCard: { 
        width: '97%', 
        height: '40%', 
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    image: {
        width: '100%',
        height: '100%'
    },
    
    imageCard: {
        width: '97%',
        margin: 5,
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 30,
        fontFamily: 'sans-serif',
        margin: 15,
        textShadowColor: 'black',
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 2,
        elevation: 2
    }
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, null)(SuccessScreen);
