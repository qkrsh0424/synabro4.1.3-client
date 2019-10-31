import React from 'react';

//URL
import { serverUrl } from '../config/serverUrl';

// redux
import { connect } from 'react-redux';
import * as actions from '../action';

import cookie from 'react-cookies';
import Axios from 'axios';

//Authorization
import AuthKey from '../config/AuthorizationKey';

const logoutHandler = async() =>{
    console.log(cookie.load('usid'));
    return await Axios.post(`${serverUrl}/api/auth/logout`,{
        usid: cookie.load('usid')
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
      .then(response => response.data)
}
export { logoutHandler };