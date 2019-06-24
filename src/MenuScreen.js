import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { CardSection } from './components';
import { Images } from './images';
import { addPizza } from './actions';
import { Colors } from './Colors';


class MenuScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            button: true,
            pizza: [
                {
                    id: 1,
                    name: 'Double Cheese Pizza',
                    count: 0,
                    price: 100,
                    source: Images.pizza1.source
                },
                {
                    id: 2,
                    name: 'Cheese and Corn Pizza',
                    count: 0,
                    price: 150,
                    source: Images.pizza2.source
                },
                {
                    id: 3,
                    name: 'Fresh Veggie',
                    count: 0,
                    price: 200,
                    source: Images.pizza3.source
                },
                {
                    id: 4,
                    name: 'Veg Supreme',
                    count: 0,
                    price: 250,
                    source: Images.pizza4.source
                },
                {
                    id: 5,
                    name: 'Non Veg Supreme',
                    count: 0,
                    price: 300,
                    source: Images.pizza5.source
                }
            ]
        };
    }
    
    handleLogOut = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });

        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.dispatch(resetAction));
    }

    incrementCounter(index) {
        const array = [...this.state.pizza];
        array[index].count += 1;
        this.setState({ pizza: array });
    }

    decrementCounter(index) {
        const array = [...this.state.pizza];
        if (array[index].count !== 0) {
            array[index].count -= 1;
            this.setState({ pizza: array });
        }
    }

    AddToCart() {
        const array = [...this.state.pizza];
        const orderedPizza = array.filter((data) => data.count !== 0);
        this.props.addPizza(orderedPizza);
        this.props.navigation.navigate('Cart');
    }

    renderCounter(index) {
        if (this.state.pizza[index].count !== 0) {
            return (
                    <Counter 
                        counter={this.state.pizza[index].count} 
                        onPressIncrement={() => this.incrementCounter(index)} 
                        onPressDecrement={() => this.decrementCounter(index)}
                    />
            );
        }

        return (
            <TouchableOpacity 
                style={styles.counterAdd}
                onPress={() => this.incrementCounter(index)}
            >
                    <Text 
                        style={{
                            fontSize: 15,
                            color: 'white'
                        }}
                    >
                        Add
                    </Text>
            </TouchableOpacity>
        );
    }

    renderItem(id, source) {
        if (id % 2 === 0) {
            return (
                <View 
                    style={styles.items}
                >
                    {this.renderCounter(id - 1)}

                    <Image 
                        source={source} 
                        style={{ width: 150, height: 150, borderRadius: 100 }} 
                    />
                </View>
            );
        }

        return (
            <View 
                style={styles.items}
            >
                    <Image 
                        source={source} 
                        style={{ width: 150, height: 150, borderRadius: 100 }} 
                    />

                    {this.renderCounter(id - 1)}
            </View>

        );
    }

    render() {
    const { pizza } = this.state;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>

            <FlatList 
                style={{ width: '100%' }}
                data={pizza}
                renderItem={({ item }) => (
                    <CardSection> 
                        <Text 
                            style={{ 
                                margin: 5, 
                                textAlign: 'center', 
                                fontSize: 20, 
                                fontWeight: 'bold' }}
                        >
                            {item.name}
                        </Text>
                        
                        {this.renderItem(item.id, item.source)}
                        
                    </CardSection>

                )}
                keyExtractor={item => item.id}
            />

            <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={() => this.AddToCart()}
            >
                <Text 
                    style={{ fontSize: 20, 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif',
                    color: 'white' }}
                >
                    Add To Cart
                </Text>
            </TouchableOpacity>
        

        </ScrollView>
        
    );
}
}

const Counter = (props) => {
    return (
        <View style={{ width: '25%', height: 30, flexDirection: 'row' }}>

            <TouchableOpacity 
                style={styles.counterLeft}
                onPress={props.onPressDecrement}
            >    
                <Text style={{ fontSize: 20, color: 'white' }}>-</Text>
            </TouchableOpacity>

            <View 
                style={{ width: '30%', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#eff1f2' }}
            >
                <Text style={{ fontSize: 20, color: 'black' }}>{props.counter}</Text>
            </View>

            <TouchableOpacity  
                style={styles.counterRight}
                onPress={props.onPressIncrement}
            >  
                <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = {
    counterRight: {
        width: '30%', 
        backgroundColor: '#ff9a3d', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4

    },
    counterLeft: {
        width: '30%', 
        backgroundColor: '#ff9a3d', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4

    },
    addToCartButton: {
        width: '50%', 
        height: 60, 
        backgroundColor: '#9e0606',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderRadius: 5 

    },
    counterAdd: { 
        width: '25%', 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.orange,
        borderRadius: 4
    },
    items: { 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-around', 
        alignItems: 'center'
    }
};

function mapStateToProps(state) {
    return {
        user: state.user,
        pizzas: state.pizza
    };
}

export default connect(mapStateToProps, { addPizza })(MenuScreen);
