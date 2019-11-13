import { combineReducers } from 'redux';

import parent_route from './parent_route';
import shb_lists from './shb_lists';
import univ_lists from './univ_lists';
import auth_user from './auth_user';

const reducer = combineReducers({
    parent_route, shb_lists ,univ_lists, auth_user
});

export default reducer;