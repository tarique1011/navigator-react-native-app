import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, TextInput, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import animation from './animations/Check Mark Success Data.json';
import { addPizza } from './actions';


const { width: windowWidth } = Dimensions.get('window');

class CartScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: false,
            flat: '',
            locality: '',
            city: '',
            pincode: '',
            isVisible: false,
            addressError: ''
        };   
    }
    
    renderTotal() {
        let total = 0;
        for (const pizza of this.props.pizzas.pizza) {
            total += (pizza.count * pizza.price);
        }

        return total;
    }

    renderCart() {
        if (this.props.pizzas.pizza.length > 0) {
            return (
                <View>
                    <View>
                        <FlatList 
                            data={this.props.pizzas.pizza}
                            renderItem={({ item }) => (
                                <Item 
                                    count={item.count}
                                    title={item.name}
                                    price={item.price}
                                />
                            )} 
                                keyExtractor={item => item.id}
                        />
                    </View>
                    
                    {this.renderAddress()}

                </View>
            );
        }

        return (
            <View style={{ alignSelf: 'center', marginTop: 100 }}>
                <Text style={{ fontSize: 20 }}>You have no order in your cart</Text>
            </View>
        );
    }

    onPressAddressButton() {
         const { flat, locality, city, pincode } = this.state;
         if (flat === '' || city === '' || locality === '' || pincode === '') {
            this.setState({ addressError: 'Some Fields are empty!' });
         } else {
             this.setState({ address: true });
         }
    }

    renderAddress() {
        if (this.state.address) {
            return (
                <View 
                    style={{ margin: 5,
                        padding: 10 }}
                >
                    <Text 
                        style={{ fontSize: 25, 
                            color: 'black',
                            fontWeight: '600',
                            fontFamily: 'Roboto' }}
                    >
                        Delivering To Address
                    </Text>
                    <View 
                        style={{ marginTop: 10,
                            borderRadius: 2,
                            padding: 5,
                            borderWidth: 1,
                            borderColor: 'black',
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 5
                            },
                            shadowRadius: 2,
                            shadowOpacity: 0.5,
                            marginLeft: 5,
                            marginRight: 5,
                            elevation: 3
                         }}
                    >
                            <Text style={{ fontSize: 18 }}>{this.state.flat}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.locality}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.city}</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.pincode}</Text>
                        </View>
                </View>
            );
        }

        return (
                        <View 
                            style={{ margin: 5,
                                padding: 10 }}
                        >
                            <Text 
                                style={{ fontSize: 25, 
                                    color: 'black',
                                    fontWeight: '600',
                                    fontFamily: 'Roboto' }}
                            >
                                Deliver To Address
                                
                            </Text>
                            <Input 
                                label='Flat No./House No.'
                                onChangeText={(flat) => this.setState({ flat })}
                                value={this.state.flat}
                            />
                            <Input 
                                label='Locality'
                                onChangeText={(locality) => this.setState({ locality })}
                                value={this.state.locality}
                            />
                            <Input 
                                label='City'
                                onChangeText={(city) => this.setState({ city })}
                                value={this.state.city}
                            />
                            <Input 
                                label='Pincode'
                                onChangeText={(pincode) => this.setState({ pincode })}
                                value={this.state.pincode}
                            />
                            <Text 
                                style={{
                                    fontSize: 18,
                                    color: 'red',
                                    margin: 5
                                }}
                            >
                                {this.state.addressError}
                            </Text>
                            <TouchableOpacity 
                                style={{ marginTop: 15, 
                                    backgroundColor: '#9e0606',
                                    width: '25%',
                                    height: 40,
                                    alignSelf: 'flex-end',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    borderWidth: 2 }}
                                onPress={() => this.onPressAddressButton()}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
        );
    }

    orderPizza() {
        if (this.state.address) {
            const email = firebase.auth().currentUser.email;
            const userId = email.split('@')
                            .join('')
                            .split('.')
                            .join('')
                            .split('_')
                            .join('');
            firebase
                .database()
                .ref(`/lastorder/${userId}`)
                .set({
                    pizza: this.props.pizzas.pizza
                });
            this.setState({ isVisible: true });
        } else {
            this.setState({ addressError: 'Please add an address!' });
        }
    }

    renderPaymentButton() {
        if (this.props.pizzas.pizza.length > 0) {
            return (
                    <TouchableOpacity 
                            style={{ 
                                width: windowWidth,
                                height: 50,
                                backgroundColor: '#9e0606',
                                borderTopWidth: 1,
                                borderColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 10,
                                flexDirection: 'row' }}
                            onPress={() => this.orderPizza()}
                    >
                            <Text 
                                style={{ fontSize: 20, 
                                    color: 'white' }}
                            >
                                Make payment
                            </Text>
                            <Text 
                                style={{ fontSize: 20, 
                                    color: 'white' }}
                            >
                                Total: ₹{this.renderTotal()}
                            </Text>
                        </TouchableOpacity>
            );
        }
    }

    renderClearCart() {
        if (this.props.pizzas.pizza.length > 0) {
            return (
                <TouchableOpacity 
                    style={{ 
                        backgroundColor: 'red',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 20,
                        width: 20
                    }}
                    onPress={() => { this.props.addPizza([]); }}
                >

                    <FontAwesome5 name='times' size={16} color={'white'} solid />          

                </TouchableOpacity>
            );
        }
    }

    renderOrderSuccess() {
        this.setState({ isVisible: false });
        this.props.addPizza([]);
        this.props.navigation.navigate('OrderInTransit');
    }

    render() {
        return (
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <View style={{ flex: 1 }}>
                    <View 
                        style={{ margin: 10,
                            paddingLeft: 10,
                            paddingRight: 10, 
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                         }}
                    >
                        <Text 
                            style={{ fontSize: 25, 
                                color: 'black',
                                fontWeight: '600',
                                fontFamily: 'Roboto' }}
                        >
                            Your Cart
                        </Text>
                        
                        {this.renderClearCart()}

                    </View>
                        
                        {this.renderCart()}

                </View>

                {this.renderPaymentButton()}

                    <Modal
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.renderOrderSuccess()}
                        animationIn='slideInUp'
                        animationOut='slideOutDown'
                    >
                        <View 
                            style={{ width: 300, 
                                height: 200, 
                                backgroundColor: 'white', 
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    fontFamily: 'sans-serif',
                                    margin: 20
                                }}
                            >Order Successful!</Text>
                            <LottieView 
                                source={animation}
                                autoPlay
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                                loop={false}
                            />
                        </View>
                    </Modal>

            </KeyboardAwareScrollView>
        );
    }
}

const Item = (props) => {
    return (
        <View style={{ height: 25, flexDirection: 'row', width: windowWidth - 30, margin: 10 }}>
            <Text style={{ fontSize: 20, position: 'absolute', left: 5, color: 'green' }}>{props.count}X</Text>
            <Text style={{ fontSize: 20, position: 'absolute', left: 50 }}>{props.title}</Text>
            <Text style={{ fontSize: 20, position: 'absolute', right: 20 }}>₹{props.price * props.count}</Text>
        </View>
    );
};


const Input = (props) => {
    return (
        <View 
            style={{ marginTop: 5,
                marginBottom: 5 }}
        >
            <Text style={{ fontSize: 15 }}>{props.label}</Text>
            <TextInput 
                style={{ width: '100%',
                    height: 40, 
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 4,
                    fontSize: 15,
                    backgroundColor: '#f2f2f2' 
                    }}
                onChangeText={props.onChangeText}
                value={props.value}
            />
        </View>
    );
};

function mapStateToProps(state) {
    return {
        pizzas: state.pizza
    };
}

export default connect(mapStateToProps, { addPizza })(CartScreen);
