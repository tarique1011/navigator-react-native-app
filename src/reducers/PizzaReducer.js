import { ADD_TO_CART } from '../actions/types';

const initialState = {
    pizza: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { pizza: action.payload };
        default:
            return state;
    }
};
