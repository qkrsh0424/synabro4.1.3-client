import React from 'react';

//URL
import { serverUrl } from '../config/serverUrl';

// redux
import { connect } from 'react-redux';
import * as actions from '../action';

import cookie from 'react-cookies';
import Axios from 'axios';

const logoutHandler = async() =>{
    console.log(cookie.load('usid'));
    return await Axios.post(`${serverUrl}/api/auth/logout`,{
        usid: cookie.load('usid')
    })
      .then(response => response.data)
}
export { logoutHandler };