import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import LotteView from 'lottie-react-native';
import anim from './animations/connecting-circle.json';

class SuccessScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            button: true,
            progress: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
        toValue: 0.5,
        duration: 3000,
        }).start();
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
                        Welcome
                    </Text>
                    <Text 
                        style={text}
                    >
                        To
                    </Text>
                    <Text 
                        style={text}
                    >
                        Your Profile
                    </Text>

            </View>
            <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ position: 'absolute', top: 100, fontSize: 20, textAlign: 'center', color: 'white', marginBottom: 10 }}>
                Profile Progress
            </Text>
            <LotteView source={anim} progress={this.state.progress} style={{ width: 250, height: 250 }} />
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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
