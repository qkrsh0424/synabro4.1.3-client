import * as types from '../action/ActionTypes';

const initialState = {
    parentRoute:null
}

export default function shb_lists(state=initialState, action){
    if(action.type===types.SET_SHB_PARENTROUTE){
        return{
            ...state,
            parentRoute: action.parentRoute,
        }
    }else{
        return state;
    }
}