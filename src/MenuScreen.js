import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import { CardSection } from './components';
import { Images } from './images';
import { addPizza } from './actions';


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
                    count: 0
                },
                {
                    id: 2,
                    name: 'Cheese and Corn Pizza',
                    count: 0
                },
                {
                    id: 3,
                    name: 'Fresh Veggie',
                    count: 0
                },
                {
                    id: 4,
                    name: 'Veg Supreme',
                    count: 0
                },
                {
                    id: 2,
                    name: 'Non Veg Supreme',
                    count: 0
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

    render() {
        
    console.log(this.props.pizzas);
    const { pizza } = this.state;

    return (
        <ScrollView contentContainerstyle={{ flexGrow: 1, alignItems: 'center' }}>

            <CardSection> 
                <Text 
                    style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
                >
                    Double Cheese
                </Text>
                <View 
                    style={{ flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-around', 
                        alignItems: 'center' }}
                >
                    <Counter 
                        counter={pizza[0].count} 
                        onPressIncrement={() => this.incrementCounter(0)} 
                        onPressDecrement={() => this.decrementCounter(0)}
                    />
                    <Image 
                        source={Images.pizza1.source} 
                        style={{ width: 180, height: 180, borderRadius: 100 }} 
                    />
                </View>
            </CardSection>

            <CardSection> 
                <Text style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    Cheese and Corn
                </Text>
                <View 
                    style={{ flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-around', 
                        alignItems: 'center' }}
                >
                    <Image 
                        source={Images.pizza2.source} 
                        style={{ width: 180, height: 180, borderRadius: 100 }} 
                    />
                    <Counter
                        counter={pizza[1].count} 
                        onPressIncrement={() => this.incrementCounter(1)} 
                        onPressDecrement={() => this.decrementCounter(1)} 
                    />
                </View>
            </CardSection>

            <CardSection> 
                <Text style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    Fresh Veggie
                </Text>
                <View 
                    style={{ flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-around', 
                        alignItems: 'center' }}
                >
                    <Counter 
                        counter={pizza[2].count} 
                        onPressIncrement={() => this.incrementCounter(2)} 
                        onPressDecrement={() => this.decrementCounter(2)}
                    />
                    <Image 
                        source={Images.pizza3.source} 
                        style={{ width: 180, height: 180, borderRadius: 100 }} 
                    />
                </View>
            </CardSection>

            <CardSection> 
                <Text style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    Veg Supreme
                </Text>
                <View 
                    style={{ flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-around', 
                        alignItems: 'center' }}
                >
                    <Image 
                        source={Images.pizza4.source} 
                        style={{ width: 180, height: 180, borderRadius: 100 }} 
                    />
                    <Counter 
                        counter={pizza[3].count} 
                        onPressIncrement={() => this.incrementCounter(3)} 
                        onPressDecrement={() => this.decrementCounter(3)} 
                    />
                </View>
            </CardSection>

            <CardSection> 
                 <Text style={{ margin: 5, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                     Non Veg Supreme
                 </Text>
                <View 
                    style={{ flexDirection: 'row', 
                        flex: 1, 
                        justifyContent: 'space-around', 
                        alignItems: 'center' }}
                >
                     <Counter 
                         counter={pizza[4].count} 
                         onPressIncrement={() => this.incrementCounter(4)} 
                         onPressDecrement={() => this.decrementCounter(4)}
                     />
                    <Image 
                        source={Images.pizza5.source} 
                        style={{ width: 180, height: 180, borderRadius: 100 }} 
                    />
                 </View>
            </CardSection>

            <TouchableOpacity 
                style={{ width: '50%', 
                    height: 60, 
                    backgroundColor: '#9e0606',
                    justifyContent: 'center',
                    alignItems: 'center' }}
            >
                <Text 
                    style={{ fontSize: 30, 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif' }}
                >
                    Add To Cart
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={async ()=>{return( await firebase.auth().signOut(),this.props.navigation.navigate('Loading'))}}
                style={{ width: '50%', 
                    height: 60, 
                    backgroundColor: '#9e0606',
                    justifyContent: 'center',
                    alignItems: 'center' }}
            >
                <Text 
                    style={{ fontSize: 30, 
                    fontWeight: 'bold', 
                    fontFamily: 'sans-serif' }}
                >
                    Logout
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
                style={{ width: '30%', 
                    backgroundColor: '#ff9a3d', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4 }}
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
                style={{ width: '30%', 
                    backgroundColor: '#ff9a3d', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4 }}
                onPress={props.onPressIncrement}
            >  
                <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = {
    headerCard: { 
        width: '97%', 
        height: '40%', 
        padding: 5,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
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
        user: state.user,
        pizzas: state.pizza
    };
}

export default connect(mapStateToProps, { addPizza })(MenuScreen);
