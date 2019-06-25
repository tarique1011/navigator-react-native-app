import React, { Component } from 'react';
import { 
        View, 
        Text, 
        Image, 
        FlatList, 
        TouchableOpacity, 
        ScrollView, 
        ActivityIndicator } from 'react-native';
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
            fetching: true,
            button: true,
            pizza: [...this.props.pizzas.listOfPizzas],
            lastorder: []
        };
    }

    componentDidMount() {
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
                .on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        this.setState({ lastorder: [...snapshot.val().pizza] });
                        this.setState({ fetching: false });
                    } else {
                        this.setState({ fetching: false });
                    }
                });
            if (this.props.pizzas.clear) {
                this.setState({ pizza: this.props.pizza.listOfPizzas });
            }
    }

    getImageById(id) {
        let source = '';
        for (const data of this.state.pizza) {
            if (data.id === id) {
                source = data.source;
            }
        }
        return source;
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

    renderPreviousOrders() {
        if (!this.state.fetching) {
            if (this.state.lastorder.length > 0) {
                return (
                    <View 
                        style={{
                            height: 200,
                            alignItems: 'center'
                        }}
                    >
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.state.lastorder}
                        renderItem={({ item }) => (
                            <View 
                                style={{
                                    width: 200,
                                    height: 180,
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    borderRadius: 2,
                                    shadowColor: '#000',
                                    shadowOffset: { width: -2, height: 5 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 2,
                                    elevation: 3,
                                    marginLeft: 10,
                                    marginRight: 5,
                                    marginTop: 10
                                }}
                            >
                                <Text style={{ fontSize: 15 }}>{item.name}</Text>
                                <Image
                                    style={{ 
                                        width: 150, 
                                        height: 150,
                                        borderRadius: 75 
                                    }} 
                                    source={this.getImageById(item.id)} 
                                />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                    </View>
                ); 
            } else {
                return (
                    <View 
                        style={{
                            width: '95%',
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,

                        }}
                    >
                        <Text style={{ fontSize: 18, textAlign: 'center' }}>You haven't ordered anything. Try some of Jaipur's finest Pizzas.</Text>
                    </View>
                );
            }
        }

        return (
            <ActivityIndicator size='large' />
        );
    }

    AddToCart() {
        const array = [...this.state.pizza];
        const orderedPizza = array.filter((data) => data.count !== 0);
        this.props.addPizza(orderedPizza);
        this.props.navigation.navigate('Cart');
    }

    render() {
    const { pizza } = this.state;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            <View 
                style={{
                    alignItems: 'center'
                }}
            >
                <Text 
                    style={{ 
                        margin: 10,
                        fontSize: 28,
                        color: '#9e0606',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif'
                    }}
                >
                    Your Previous Orders
                </Text>
            </View>

                {this.renderPreviousOrders()}

            <View>
            <Text 
                style={{ 
                    margin: 10,
                    fontSize: 25,
                    color: '#9e0606',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif'
                }}
            >
                Menu
            </Text> 
            </View>
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
                style={{ flex: 1, 
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
        flex: 1, 
        backgroundColor: '#ff9a3d', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4

    },
    counterLeft: {
        flex: 1, 
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
