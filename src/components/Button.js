import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, children, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity 
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2
    }
};

export { Button };
