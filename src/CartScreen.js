import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';


class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
        };
    }

    render() {
        return (
            <View 
                style={{ margin: 5,
                    padding: 10, 
                    alignItems: 'flex-start' }}
            >
                <Text style={{ fontSize: 25, color: 'black' }}>Your Cart Items</Text>
                <FlatList 
                    data={this.props.pizzas.pizza}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={{ fontSize: 15 }}>{item.name}</Text>
                        </View>
                    )} 
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        pizzas: state.pizza
    };
}

export default connect(mapStateToProps, null)(CartScreen);
