import { combineReducers } from 'redux';
import shb_lists from './shb_lists';
import univ_lists from './univ_lists';
import auth_user from './auth_user';

const reducer = combineReducers({
    shb_lists ,univ_lists, auth_user
});

export default reducer;