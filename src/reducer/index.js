import { combineReducers } from 'redux';
import univ_lists from './univ_lists';
import auth_user from './auth_user';

const reducer = combineReducers({
    univ_lists, auth_user
});

export default reducer;