import React from 'react';
import { View, Dimensions } from 'react-native';

const CardSection = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = {
    container: {
        height: (height / 3.5),
        width: '95%',
        // borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        margin: 10,
    }
};

export { CardSection };
