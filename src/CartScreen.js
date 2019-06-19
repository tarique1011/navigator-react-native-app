import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

const { width: windowWidth } = Dimensions.get('window');

class CartScreen extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: false,
            flat: '',
            locality: '',
            city: '',
            pincode: ''
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
                            borderRadius: 5,
                            padding: 5,
                            borderWidth: 2,
                            borderColor: 'black' }}
                    >
                        <View 
                            style={{ borderRadius: 5, 
                                borderWidth: 1,
                                padding: 5,
                                borderColor: 'black' }}
                        >
                            <Text style={{ fontSize: 18 }}>{this.state.flat},</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.locality},</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.city},</Text>
                            <Text style={{ fontSize: 18 }}>{this.state.pincode}.</Text>
                        </View>
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
                            <TouchableOpacity 
                                style={{ marginTop: 15, 
                                    backgroundColor: 'green',
                                    width: '25%',
                                    height: 40,
                                    alignSelf: 'flex-end',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: 'black',
                                    borderRadius: 10,
                                    borderWidth: 2 }}
                                onPress={() => this.setState({ address: true })}
                            >
                                <Text style={{ fontSize: 18, color: 'white' }}>Add</Text>
                            </TouchableOpacity>
                        </View>
        );

    }

    render() {
        return (
            <KeyboardAwareScrollView 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={{ flex: 1 }}>
                    <View 
                        style={{ margin: 5,
                            padding: 10, 
                            alignItems: 'flex-start' }}
                    >
                        <Text 
                            style={{ fontSize: 25, 
                                color: 'black', 
                                marginBottom: 10,
                                fontWeight: '600',
                                fontFamily: 'Roboto' }}
                        >
                            Your Cart
                        </Text>
                    </View>
                        
                        {this.renderCart()}

                </View>
                <TouchableOpacity 
                        style={{ 
                            width: windowWidth,
                            height: 50,
                            backgroundColor: 'green',
                            borderTopWidth: 1,
                            borderColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10,
                            flexDirection: 'row' }}
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

export default connect(mapStateToProps, null)(CartScreen);
