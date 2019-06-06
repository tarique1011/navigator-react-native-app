import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HelpScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Need Help?</Text>
            </View>
        );
    }
}

export { HelpScreen };
