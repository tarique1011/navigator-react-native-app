import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const { width: windowWidth } = Dimensions.get('window');

class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [{
                    id: 1,
                    name: 'Double Cheese Pizza',
                    count: 1,
                    price: 100
                },
                {
                    id: 2,
                    name: 'Cheese and Corn Pizza',
                    count: 1,
                    price: 150
                },
                {
                    id: 3,
                    name: 'Fresh Veggie',
                    count: 1,
                    price: 200
                },
                {
                    id: 4,
                    name: 'Veg Supreme',
                    count: 1,
                    price: 250
                },
                {
                    id: 5,
                    name: 'Non Veg Supreme',
                    count: 1,
                    price: 300
                }]
        };
    }

    renderTotal() {
        let total = 0;
        for (const pizza of this.state.data) {
            total += (pizza.count * pizza.price);
        }

        return total;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View 
                    style={{ margin: 5,
                        padding: 10, 
                        alignItems: 'flex-start' }}
                >
                    <Text style={{ fontSize: 25, color: 'black', marginBottom: 10 }}>Your Order</Text>
                    <FlatList 
                        data={this.state.data}
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
                <TouchableOpacity 
                    style={{ position: 'absolute',
                        bottom: 0,
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
            </View>
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

function mapStateToProps(state) {
    return {
        pizzas: state.pizza
    };
}

export default connect(mapStateToProps, null)(CartScreen);
