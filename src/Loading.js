import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import LotteView from 'lottie-react-native';
import firebase from 'firebase';
import { Images } from './images';
import anim from './animations/pizzaLoading.json';
import { Button } from './components';

export default class Loading extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        firebase
            .auth()                
            .onAuthStateChanged(user => {
                if (user) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Tab' })]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    this.setState({ loading: false });
                }   
        });
    }

    renderLoadUp() {
        const { imageBackground, topView, label, cover } = styles;
            return (
                <ImageBackground 
                    style={imageBackground}
                    source={Images.pizza.source}
                >
                <View style={cover} />
                    <View style={topView}>
                        <Text style={label}>Joe Pizza</Text>
                    </View>  
                <View>
                    {this.renderBottomView()}
                </View>
                </ImageBackground>
                
            );
        } 

    renderBottomView() {   
        if (this.state.loading) {
            return (
                <View style={styles.bottomView}>
                    <LotteView source={anim} autoPlay loop style={{ height: 200, width: 200 }} />
                </View>
            );
        }

        return (
            <View style={styles.bottomView}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                Sign Up 
                </Button>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    onPress={() => this.props.navigation.navigate('SignIn')}
                >
                Sign In
                </Button>
            </View>
        );
    }

    render() {
        return (
            this.renderLoadUp()
        );
    }

}

const styles = {
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    cover: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#ffdcaf',
        opacity: 0.6
    },
    topView: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 45,
        color: '#020b5b',
        textShadowColor: 'black',
        textShadowOffset: 
        {
            width: 2,
            height: 1
        },
        elevation: 2,
        fontWeight: 'bold',
        fontFamily: 'Sans-serif'
    },
    buttonStyle: {
        width: '50%',
        height: 50,
        margin: 10,
        backgroundColor: '#ff9a3d',
        borderRadius: 10
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    }
};
