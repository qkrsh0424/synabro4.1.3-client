import React from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';
import * as actions from '../../../action';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DropUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current_password:'',
            dialogOpen: false,
            confirmDrop:false,
        }
    }

    handleValueChange = async (e) => {
        let nextState = {

        }
        nextState[e.target.name] = e.target.value;
        await this.setState(nextState);
    }

    handleOnSubmit = async(e) =>{
        e.preventDefault();
        await this.setState({dialogOpen:true});
    }

    _DropUserAPI = async()=>{
        if(this.state.confirmDrop===true){
            await Axios.post('/api/auth/profile/dropuser',{
                currentPassword:this.state.current_password
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='success'){
                    this.handleLogout();
                }else if(data.message==='failure'){
                    alert('비밀번호를 다시 확인해 주세요.');
                    document.getElementById('current_password').focus();
                }else if(data.message==='error'){
                    alert('네트워크 오류 입니다. 다시 시도해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                    window.location.reload();
                }else{
                    alert('알 수 없는 오류가 발생 했습니다. 고객센터로 문의 바랍니다.');
                        window.location.reload();
                }
            })
            .catch(err=>{
                alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                console.log('Network Error, error code 500');
            })
        }else{
            alert('에러.');
        }
    }

    handleLogout = async(e) =>{
        await Axios.post('/api/auth/logout')
            .then(response => response.data)
            .then(data => {
                if (data.message === 'success') {
                    // this.props.handleAUTH_FAILURE();
                    alert('회원이 탈퇴 되었습니다.');
                    window.location.href='/';
                } else {
                    alert('error logout');
                }

            });
    }

    handleClose = async() => {
        await this.setState({ dialogOpen: false, confirmDrop:false });
    };

    handleDropUserConfirm = async() =>{
        await this.setState({ dialogOpen: false, confirmDrop:true });
        await this._DropUserAPI();
    }

    render(){
        return(
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>회원 탈퇴</h4>
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
                                        id='current_password'
                                        name="current_password"
                                        value={this.state.current_password}
                                        onChange={this.handleValueChange}
                                        required
                                    />

                                </div>
                            </div>
                        </div>
                        
                        <div class="list-group-item border-white clearfix">
                            <span className='danger_text float-left' style={{ fontSize: '15px' }}>*회원 탈퇴시 모든 개인정보가 삭제되며, 복구 할 수 없습니다.</span>
                            <button type="submit" className={'btn btn-danger float-right'}>회원 탈퇴</button>
                        </div>
                    </form>
                </div>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"회원 탈퇴"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            정말로 탈퇴 하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                        취소
                        </Button>
                        <Button onClick={this.handleDropUserConfirm} color="primary">
                        확인
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
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

export default connect(mapStateToProps,mapDispatchToProps)(DropUser);