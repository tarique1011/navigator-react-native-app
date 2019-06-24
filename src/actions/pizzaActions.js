import { ADD_TO_CART, RESET_MENU } from './types';

export const addPizza = (pizza) => {
    return {
        type: ADD_TO_CART,
        payload: pizza
    };
};

export const resetMenu = () => {
    return {
        type: RESET_MENU
    };
};
