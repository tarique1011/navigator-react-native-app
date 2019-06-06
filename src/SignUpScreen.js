import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class SignUpScreen extends Component {
    render() {
        const status = this.props.navigation.getParam('status', 'Not Reached');

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sign Up</Text>
                <Text>{status}</Text>
            </View>
        );
    }
}

export { SignUpScreen };
