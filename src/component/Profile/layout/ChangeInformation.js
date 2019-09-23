import React from 'react';
import '../ProfileBody.css'

import Axios from 'axios';


class ChangeInformation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:this.props.user,
            _nickname: this.props._nickname,
            check_pw:''
        }
    }

    handleValueChange = async(e) => {
        let nextState = {
            ...this.state,
            user:{
                ...this.state.user
            }
        }
        nextState.user[e.target.name] = e.target.value;
        await this.setState(nextState);
    }

    handleValueChange_NickAndPW = async(e) => {
        let nextState = {
            
        }
        nextState[e.target.name] = e.target.value;
        await this.setState(nextState);
    }

    handleOnSubmit = async(e) => {
        e.preventDefault();
        if(!this.state.check_pw){
            alert("패스워드를 입력하세요.");
            window.location.reload();
        }
        if(!this.state.user.Email || !this.state.user.Name || !this.state._nickname || !this.state.user.Job || !this.state.user.Major){
            alert("형식을 확인해주세요.");
            window.location.reload();
        }
        this._updateUserInfomation();
    }

    _updateUserInfomation = async()=>{
        await Axios.patch('/api/auth/profile/chguserinfo',{
            UID: this.state.user.UID,
            Email: this.state.user.Email,
            Name: this.state.user.Name,
            Nickname: this.state.user.Nickname,
            Job: this.state.user.Job,
            Major: this.state.user.Major,
            PW: this.state.check_pw
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                alert('업데이트 되었습니다.');
                window.location.href='/profile';
            }else if(data.message==='CHECKPW'){
                alert('패스워드를 다시 확인해 주세요.');
                window.location.reload();
            }else if(data.message==='error'){
                alert('페이지 오류 고객센터에 문의 바랍니다.');
                window.location.reload();
            }else{
                alert('페이지 오류 고객센터에 문의 바랍니다.');
                window.location.reload();
            }
        })
        .catch(err=>{
            alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
            // console.log(err);
        })
    }

    render(){
        return(        
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>개인정보 변경</h4>
                </div>
                <div className='list-group border pt-3 pb-3 __border_radius'>
                    {/* <form noValidate autoComplete="off"> */}
                    <form onSubmit={this.handleOnSubmit}>
                        <div class="list-group-item border-white">
                            <label>이메일</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="email" class="form-control" name="Email" value={this.state.user.Email} onChange={this.handleValueChange} required/>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label>이름</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="Name" value={this.state.user.Name} onChange={this.handleValueChange} required/>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label>닉네임</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="Nickname" value={this.state.user.Nickname} onChange={this.handleValueChange} required/>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label>직업 및 소속</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="Job" value={this.state.user.Job} onChange={this.handleValueChange} required/>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label>직무 및 학과</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="Major" value={this.state.user.Major} onChange={this.handleValueChange} required/>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white">
                            <label className='text-danger'>현재 <br/>비밀번호</label>
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" name="check_pw" value={this.state.check_pw} onChange={this.handleValueChange_NickAndPW} required/>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item border-white clearfix">
                            <button type="submit" className={'btn btn-danger float-right'}>개인정보 변경하기</button>
                        </div>
                    </form>
                </div>                
            </div>
        );
    }
}

export default (ChangeInformation);