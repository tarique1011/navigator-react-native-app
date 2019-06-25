import { ADD_TO_CART, RESET_MENU } from '../actions/types';
import { Images } from '../images'; 

const initialState = {
    pizza: [],
    listOfPizzas: [
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
    ],
    clear: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { pizza: action.payload };
        case RESET_MENU:
            return { ...state, clear: true };
        default:
            return state;
    }
};
