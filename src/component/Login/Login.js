import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

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

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user_email:"",
            user_password:""
        }

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleMoveHome = this.handleMoveHome.bind(this);
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

    handleMoveHome(){
        this.props.history.push('/');
    }

    AuthenticateUser = () =>{
        const url = "/api/auth/login";
        let formData = new FormData();
        formData.append("user_email", this.state.user_email);
        formData.append("user_password", this.state.user_password);

        Axios.post(url,{
            user_email:this.state.user_email,
            user_password:this.state.user_password,
        })
        .then(response => response.data)
        .then(data=>{
            this.props.handleLogin(data.sessid, data.user_nickname);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        if(this.props._isLogged){
            return(
                <Redirect to='./'/>
            )
        }else{
            return(
                <LoginBody
                    className='animate'
                    user_email={this.state.user_email}
                    user_password={this.state.user_password}
                    handleValueChange = {this.handleValueChange}
                    handleFormSubmit = {this.handleFormSubmit}
                    handleMoveHome = {this.handleMoveHome}
                />
            );
        }
        
    }
}

Login.propTypes = propTypes;

Login.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
        handleLogin: (_sess, _nickname)=>{dispatch(actions.auth_login(_sess, _nickname))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);