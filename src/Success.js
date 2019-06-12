import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { connect } from 'react-redux';

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
    renderImage= () => {
        if (this.state.button) {
            return (
                <Button 
                    title='Show me Batman' 
                    onPress={() => this.setState({ button: false })}
                />
            );
        } else {
            return (
                <Image 
                    style={styles.image}
                    source={require('./images/batman.jpg')} 
                />
            );
        }
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
                {this.renderImage()}
            </View>    
        </View>
    );
}
}

const styles = {
    headerCard: { 
        width: '97%', 
        height: '40%', 
        borderWidth: 2, 
        borderColor: 'black', 
        borderRadius: 5, 
        padding: 5, 
        backgroundColor: '#ff9a3d',
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
        backgroundColor: '#ff9a3d',
        borderWidth: 2, 
        borderColor: 'black', 
        borderRadius: 5,
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
