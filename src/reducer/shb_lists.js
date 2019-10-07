import * as types from '../action/ActionTypes';

const initialState = {
    shbs:[],
    mainCategory:null
}

export default function shb_lists(state=initialState, action){
    if(action.type===types.SET_SHB_LIST){
        return{
            ...state,
            shbs: action.shbs,
            mainCategory: action.mainCategory
        }
    }else{
        return state;
    }
}