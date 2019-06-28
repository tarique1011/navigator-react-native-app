import React, {
    Component
} from 'react';
import {
    View,
    Text,
    DeviceEventEmitter
} from 'react-native';
import {
    Card,
    Button
} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class OrderInTransit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: false
        };
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('orderReceived', this.orderReceived.bind(this));
    }

    orderReceived() {
        this.setState({
            order: true
        });
    }

    renderCard() {
        if (this.state.order) {
            return ( <
                Card image = {
                    {
                        uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*'
                    }
                }
                title = "Order Received"
                containerStyle = {
                    {
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.3,
                        elevation: 2
                    }
                }
                titleStyle = {
                    {
                        color: 'green'
                    }
                } >
                <
                Text style = {
                    {
                        marginBottom: 10
                    }
                } > Order will be delivered in 30 minutes < /Text> <
                Button icon = {
                    < Ionicons name = 'md-locate'
                    color = '#ffffff'
                    size = {
                        18
                    }
                    style = {
                        {
                            margin: 10
                        }
                    }
                    />}
                    title = 'Track Order'
                    buttonStyle = {
                        {
                            justifyContent: 'center',
                            marginBottom: 10,
                            backgroundColor: '#9e0606'
                        }
                    }
                    /> <
                    /Card>
                );
            }

            return ( <
                View style = {
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                } >
                <
                Text style = {
                    {
                        fontSize: 20
                    }
                } > We have not received any order from you < /Text> <
                /View>
            );
        }

        render() {
            return ( <
                View style = {
                    styles.container
                } > {
                    this.renderCard()
                } <
                /View>
            );
        }
    }

    const styles = {
        container: {
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 5,
            flex: 1
        }
    };

    export default OrderInTransit;