import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { CardSection } from './components';
import { Images } from './images';


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
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });

        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.dispatch(resetAction));
    }

    render() {
        console.log(this.state.button);
    const { headerCard, text, imageCard } = styles;

    return (
        <ScrollView >
            <CardSection> 
                    <Text style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Veg Supreme Pizza</Text>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Image source={Images.pizza1.source} style={{ width: 200, height: 200, borderRadius: 100 }} />
                    <Text>Add To Cart</Text>
                    </View>
            </CardSection>
            <CardSection> 
                <Text>this is a card section</Text>
            </CardSection>
            <CardSection> 
                <Text>this is a card section</Text>
            </CardSection>
            <CardSection> 
                <Text>this is a card section</Text>
            </CardSection>
            <CardSection> 
                <Text>this is a card section</Text>
            </CardSection>
        </ScrollView>
        
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
