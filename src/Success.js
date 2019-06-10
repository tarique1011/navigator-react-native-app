import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class SuccessScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>Welcome To Food Delivery App</Text>
        </View>
    );
}
}

