import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

//Server Url
import { serverUrl } from '../../config/serverUrl';

import { connect } from 'react-redux';
import * as actions from '../../action';

import './Login.css';
import '../PublicStyle/SlideAnimation.css';

import { Link } from 'react-router-dom';

import LoginBody from './layout/LoginBody';

const propTypes = {

}

const defaultProps = {

}

class Login extends React.Component {
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            user_uid: "",
            user_password: "",
        }

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleMoveHome = this.handleMoveHome.bind(this);
    }

    componentDidMount = () =>{
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.AuthenticateUser();
    }

    handleMoveHome() {
        this.props.history.push('/');
    }

    AuthenticateUser = async () => {
        // const url = `/api/auth/login`;
        const url = `${serverUrl}/api/auth/login`;
        // let formData = new FormData();
        // formData.append("user_email", this.state.user_email);
        // formData.append("user_password", this.state.user_password);

        await Axios.post(url, {
            user_uid: this.state.user_uid,
            user_password: this.state.user_password,
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(response => response.data)
            .then(data => {
                if (data.message === 'success') {
                    console.log(data.cookie);
                    const cookieData = {
                        path: data.cookie.path,
                        expires: new Date(data.cookie.expires),
                    }
                    cookie.save('usid', data.sessid, cookieData);
                    this.props.handleLogin(data.sessid, data.user_nickname);
                    window.history.back();
                } else {
                    alert('아이디 혹은 패스워드를 확인해 주세요.');
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        if (this.props._isLogged) {
            return (
                <Redirect to='./' />
            )
        } else {
            return (
                <LoginBody
                    className='animate'
                    user_uid={this.state.user_uid}
                    user_password={this.state.user_password}
                    handleValueChange={this.handleValueChange}
                    handleFormSubmit={this.handleFormSubmit}
                    handleMoveHome={this.handleMoveHome}
                />
            );
        }

    }
}

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (_sess, _nickname) => { dispatch(actions.auth_login(_sess, _nickname)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);