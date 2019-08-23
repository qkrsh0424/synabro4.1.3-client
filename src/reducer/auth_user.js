import * as types from '../action/ActionTypes';

const initialState = {
    _isLogged: false,
    _sess:null,
    _nickname:null
    // _id:null,
}

export default function auth_user(state=initialState, action){
    switch(action.type){
        case types.AUTH_LOGIN:
            return{
                ...state,
                _isLogged: true,
                _sess: action._sess,
                _nickname: action._nickname
                // _id: action._id,
            };
        
        case types.AUTH_LOGOUT:
            return{
                ...state,
                _isLogged: false,
                _sess: null,
                _nickname: null
                // _id: null,
            };

        case types.AUTH_SUCCESS:
            return{
                ...state,
                _isLogged: true,
                _sess: action._sess,
                _nickname: action._nickname
                // _id: action._id,
            }
        case types.AUTH_FAILURE:
            return{
                ...state,
                _isLogged: false,
                _sess:null,
                _nickname: null
                // _id: null,

            }
        default: 
            return state;
    }
}