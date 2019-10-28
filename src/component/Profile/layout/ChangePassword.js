import React from 'react';
import '../ProfileBody.css'

import Axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../../action';

//URL
import {serverUrl} from '../../../config/serverUrl'

//logout handler
import {logoutHandler} from '../../../handler/LogoutHandler'

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            old_password: '',
            new_password: '',
            new_password_check: '',
            confirm_newPW: false,
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.checkNewPassword = this.checkNewPassword.bind(this);
    }

    handleValueChange = async (e) => {
        let nextState = {

        }
        nextState[e.target.name] = e.target.value;
        await this.setState(nextState);
    }

    handleOnSubmit = async (e) => {
        e.preventDefault();
        await this.checkNewPassword();
        if (this.state.confirm_newPW === true) {
            this._changePasswordAPI();
        }
    }

    checkNewPassword = async (e) => {
        if (this.state.new_password.length < 6) {
            alert('비밀번호를 6자리 이상으로 구성해 주세요');
            document.getElementById('new_password').focus();
        } else if (this.state.new_password.length >= 6) {
            if (this.state.new_password === this.state.new_password_check) {
                await this.setState({ confirm_newPW: true });
            } else {
                alert('새 비밀번호를 다시 확인해 주세요.');
                await this.setState({ confirm_newPW: false });
                document.getElementById('new_password_check').focus();
            }
        } else {
            alert('비밀번호 변경 에러, 고객센터에 문의 바랍니다.')
        }
    }

    _changePasswordAPI = async (e) => {
        await Axios.post(`${serverUrl}/api/auth/profile/chgpassword`, {
            usid:this.props._sess,
            oldPassword: this.state.old_password,
            newPassword: this.state.new_password
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'success') {
                    console.log(data.message);
                    alert('비밀번호가 변경 되었습니다.');
                    this.handleLogout();
                } else if (data.message === 'failure') {
                    alert('현재 비밀번호를 다시 확인해 주세요.');
                    document.getElementById('old_password').focus();
                } else if (data.message === 'error') {
                    alert('네트워크 오류 입니다. 다시 시도해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                    window.location.reload();
                } else {
                    alert('알 수 없는 오류가 발생 했습니다. 고객센터로 문의 바랍니다.');
                    window.location.reload();
                }
            })
            .catch(err=>{
                alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                console.log('Network Error, error code 500');
            })
    }

    handleLogout = async(e) =>{
        await logoutHandler()
            .then(data => {
                if (data.message === 'success') {
                    this.props.handleAUTH_FAILURE();
                } else {
                    alert('error logout');
                }

            });
    }
    render() {
        return (
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>비밀번호 변경</h4>
                </div>
                <div className='list-group border pt-3 pb-3 __border_radius'>
                    <form onSubmit={this.handleOnSubmit}>
                        <div class="list-group-item border-white">
                            <label style={{ width: '5.4rem' }}>현재 비밀번호</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id='old_password'
                                        name="old_password"
                                        value={this.state.old_password}
                                        onChange={this.handleValueChange}
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label style={{ width: '5.4rem' }}>새 비밀번호</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id='new_password'
                                        name="new_password"
                                        value={this.state.new_password}
                                        onChange={this.handleValueChange}
                                        required
                                    />
                                    <span className='danger_text'>*비밀번호를 최소 6자리 이상 입력해 주세요.</span>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label style={{ width: '5.4rem' }}>새 비밀번호 확인</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id='new_password_check'
                                        name="new_password_check"
                                        value={this.state.new_password_check}
                                        onChange={this.handleValueChange}
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white clearfix">
                            <span className='danger_text float-left' style={{ fontSize: '15px' }}>*비밀번호를 변경하시면 모든 시스템에서 로그아웃 처리 됩니다.</span>
                            <button type="submit" className={'btn btn-danger float-right'}>비밀번호 변경하기</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleAUTH_SUCCESS: ()=>{dispatch(actions.auth_success())},
        handleAUTH_FAILURE: ()=>{dispatch(actions.auth_failure())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);