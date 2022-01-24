
import * as ActionTypes from './ActionTypes';


export const Teachers = (state = { isLoading: true,
    errMess: null,
    teachers:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TEACHERS:
            return {...state, isLoading: false, errMess: null, teachers: action.payload};

        case ActionTypes.TEACHERS_LOADING:
            return {...state, isLoading: true, errMess: null, teachers: []}

        case ActionTypes.TEACHERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};