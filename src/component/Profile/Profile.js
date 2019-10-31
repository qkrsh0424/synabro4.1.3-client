import React from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

import { NavLink, Link } from 'react-router-dom';

//URL
import { serverUrl } from '../../config/serverUrl';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import ProfileBody from './layout/ProfileBody';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
        this._getUserInfo = this._getUserInfo.bind(this);
    }

    async componentDidMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        if(this.props._isLogged){
            await this._getUserInfo()
            .then(data => {
                if (data.message === "getSuccess") {
                    this.setState({ user: data.user });
                } else if(data.message==="invalidLogin"){
                    alert('로그인이 만료 되었습니다.');
                }else {
                    alert("error code number 500");
                }
            })
            .catch(err => {
                alert('네트워크 상태가 고르지 않습니다.');
                // console.log(err);
            })
        }
        
    }

    _getUserInfo() {
        return Axios.post(`${serverUrl}/api/auth/getuser/get_profile`,{
            usid:this.props._sess
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data);
    }

    render() {
        if (!this.props._isLogged) {
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동 하시겠습니까?")) {
                return (
                    <Redirect to='/login' />
                );
            } else {
                return (
                    <Redirect to='/' />
                );
            }

        } else {
            return (
                <div>
                    <Nav />
                    <ProfileBody
                        conType={this.props.match.params.conType}
                        _nickname={this.props._nickname}
                        user={this.state.user}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

export default connect(mapStateToProps)(Profile);