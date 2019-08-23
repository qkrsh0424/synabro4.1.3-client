import * as types from '../action/ActionTypes';

const initialState = {
    univs:[]
}

export default function univ_lists(state=initialState, action){
    if(action.type===types.SET_UNIV_LIST){
        return{
            ...state,
            univs: action.univs
        }
    }else{
        return state;
    }
}