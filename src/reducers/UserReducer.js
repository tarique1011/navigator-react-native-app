import { USER_UPDATE } from '../actions/types';

const initialState = {
    name: '',
    dob: '',
    email: '',
    password: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
