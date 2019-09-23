import React from 'react';
import Axios from 'axios';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import './Signup.css';
import '../PublicStyle/SlideAnimation.css';
// import logo from '../../images/Logo/synabrologo2.png';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            confirm_uid:false,
            confirm_pw:false,
            confirm_pw_checked:false,
            user_uid:"",
            user_job:"",
            user_major:"",
            user_email:"",
            user_password:"",
            user_password_confirm:"",
            user_name:"",
            user_nickname:"",
            user_gender:"",
            openSnacbar:false
        }

        this.handleMoveHome = this.handleMoveHome.bind(this);
        this.confirmUID = this.confirmUID.bind(this);
        this.confirmPW = this.confirmPW.bind(this);
        this.confirmPWCheck = this.confirmPWCheck.bind(this);
        this.handleSnacbarClose = this.handleSnacbarClose.bind(this);
    }

    componentDidMount(){
        document.documentElement.scrollTop=document.body.scrollTop=0;
    }

    componentDidCatch() {
        console.log('error 500');
    }
    
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleValueChange_UID = async(e) => {
        if(e.target.value[e.target.value.length-1]===undefined){
            await this.setState({user_uid:""});
        }else{
            // if((e.target.value[e.target.value.length-1].charCodeAt(0)>128)){
                // alert('영문 소문자 또는 숫자만 입력 가능합니다.');
            // }
            if((e.target.value[e.target.value.length-1].charCodeAt(0)>=97 && e.target.value[e.target.value.length-1].charCodeAt(0)<=122)
                || (e.target.value[e.target.value.length-1].charCodeAt(0)>=48 && e.target.value[e.target.value.length-1].charCodeAt(0)<=57)
            ){
                await this.setState({user_uid:e.target.value});
            }else{
                this.setState({openSnacbar:true});
            }
        }
        await this.confirmUID();
    }

    handleValueChange_PW = async(e) => {
        await this.setState({user_password:e.target.value});
        await this.confirmPW();
        await this.confirmPWCheck();
    }

    handleValueChange_PWCheck = async(e) => {
        await this.setState({user_password_confirm:e.target.value});
        await this.confirmPWCheck();
    }

    AuthenticateUser = () =>{
        const url = "/api/auth/signup/confirm";
        // let formData = new FormData();
        // formData.append("user_job", this.state.user_job);
        // formData.append("user_major", this.state.user_major);
        // formData.append("user_email", this.state.user_email);
        // formData.append("user_password", this.state.user_password);
        // formData.append("user_name", this.state.user_name);
        // formData.append("user_nickname", this.state.user_nickname);
        // formData.append("user_gender", this.state.user_gender);

        Axios.post(url,{
            user_uid : this.state.user_uid,
            user_job : this.state.user_job,
            user_major : this.state.user_major,
            user_email:this.state.user_email,
            user_password:this.state.user_password,
            user_name:this.state.user_name,
            user_nickname:this.state.user_nickname,
            user_gender:this.state.user_gender
        })
        .then(response=>response.data)
        .then(data=>{
            if(data){
                window.location.href='/';
            }else{
                document.getElementById('user_uid').focus();
                alert('이미 사용중인 이메일입니다. 이메일을 다시 한번 확인해 주세요.');
                this.setState({
                    user_uid:'',
                    user_password:'',
                    user_password_confirm:'',
                });
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        for(let i=0; i<this.state.user_uid.length;i++){
            if(this.state.user_uid[i].charCodeAt(0)<48 || 
            (this.state.user_uid[i].charCodeAt(0)>57 && this.state.user_uid[i].charCodeAt(0)<97)||
            this.state.user_uid[i].charCodeAt(0)>122){
                alert('아이디 형식을 다시 확인해 주세요.');
                document.getElementById('user_uid').focus();
                this.setState({user_uid:'', confirm_uid:false});
                return;
            }
        }
        if(this.state.user_password===this.state.user_password_confirm){
            this.AuthenticateUser();
        }else{
            document.getElementById('user_password').focus();
            this.setState({
                user_password:"",
                user_password_confirm:"",
            });
            alert("패스워드를 확인하세요");
        }
    }

    handleMoveHome(){
        this.props.history.push('/');
    }

    confirmUID(){
        if(this.state.user_uid.length<6){
            this.setState({confirm_uid:false});
        }else{
            let url = '/api/auth/signup/validation';
            Axios.post(url, {
                user_uid: this.state.user_uid
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='validUID'){
                    this.setState({confirm_uid:true});
                }else{
                    this.setState({confirm_uid:false});
                }
            })
            .catch(error=>{
                alert('서버 연결이 불안정 합니다. error code 500')
                window.location.reload();
            });
        }
    }

    confirmPW(){
        if(this.state.user_password.length<6){
            this.setState({confirm_pw:false});
        }else{
            this.setState({confirm_pw:true});
        }
    }

    confirmPWCheck(){
        if(this.state.user_password===this.state.user_password_confirm){
            this.setState({confirm_pw_checked:true});
        }else{
            this.setState({confirm_pw_checked:false});
        }
    }

    handleSnacbarClose(){
        this.setState({openSnacbar:false});
    }
    render(){
        if(this.props._isLogged){
            return(
                <Redirect to='./'/>
            )
        }else{
            return(
                <div className="container">
                    <div>
                        <div className="header py-5 text-center">
                            <img 
                                className="d-block mx-auto mb-3" 
                                src='https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/synabrologo2.png' 
                                alt=""
                                onClick={this.handleMoveHome}
                            />
                            <h2>회원가입</h2>
                            <p className="lead">"한인들의 정보를 효율적으로 관리해 한인들의 삶의 질을 향상시킨다."</p>
                        </div>
    
                        <div className="row row__t animate slideIn">
                            <div className="test__t">
                                <form onSubmit={this.handleFormSubmit}>   
                                    <div className="mb-3">
                                        <label htmlFor="user_uid">아이디</label>
                                        <input 
                                            type="text" className={this.state.confirm_uid?"form-control is-valid":"form-control"} name="user_uid" id="user_uid" placeholder="your ID" required
                                            value={this.state.user_uid} onChange={this.handleValueChange_UID}    
                                        />
                                        
                                        <div className="mt-2">
                                            {this.state.confirm_uid?
                                                <div class="alert alert-success" role="alert">
                                                    사용가능한 아이디 입니다.
                                                </div>
                                                :<div class="alert alert-danger" role="alert">
                                                    이 아이디를 사용할 수 없습니다.
                                                </div>
                                            }
                                        </div>
                                        <div className={this.state.confirm_uid?"d-none":"danger_text"}>
                                        *아이디는 6자리 이상 영문 소문자 또는 숫자로 구성해 주세요. 자동 중복 검사 됩니다.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_password">비밀번호</label>
                                        <input 
                                            type="password" 
                                            className={this.state.confirm_pw&&this.state.confirm_pw_checked?"form-control is-valid":"form-control"} 
                                            name="user_password" id="user_password" placeholder="password" required
                                            value={this.state.user_password} onChange={this.handleValueChange_PW}
                                        />
                                        <div className={this.state.confirm_pw?"d-none":"danger_text"}>
                                        *최소 6자리 이상 입력해주세요.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_password_confirm">비밀번호 확인</label>
                                        <input 
                                            type="password" className={this.state.confirm_pw&&this.state.confirm_pw_checked?"form-control is-valid":"form-control is-invalid"} 
                                            name="user_password_confirm" id="user_password_confirm" placeholder="password" required
                                            value={this.state.user_password_confirm} onChange={this.handleValueChange_PWCheck}    
                                        />
                                        <div className={this.state.confirm_pw_checked?"d-none":"danger_text"}>
                                        *비밀번호를 확인해 주세요.
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="user_email">이메일 (회원 아이디를 찾을때 사용됩니다.)</label>
                                        <input 
                                            type="email" className="form-control" name="user_email" id="user_email" placeholder="you@example.com" required
                                            value={this.state.user_email} onChange={this.handleValueChange}    
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="user_job">학교 입력</label>
                                        <input 
                                            type="text" className="form-control" name="user_job" id="user_job" placeholder="xx대학교" required
                                            value={this.state.user_job} onChange={this.handleValueChange}
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid shcool for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="user_major">학과 </label>
                                        <input 
                                            type="text" className="form-control" name="user_major" id="user_major" placeholder="국제무역학과" required
                                            value={this.state.user_major} onChange={this.handleValueChange}
                                        />
                                        <div className="invalid-feedback">
                                        *Please enter a valid mojor for shipping updates.
                                        </div>
                                    </div>
    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="user_name">이름(실명)</label>
                                            <input 
                                                type="text" className="form-control" name="user_name" id="user_name" placeholder="" value="" required
                                                value={this.state.user_name} onChange={this.handleValueChange}    
                                            />
                                            <div className="invalid-feedback">
                                            Valid name is required.
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="user_nickname">별명</label>
                                            <input 
                                                type="text" className="form-control" name="user_nickname" id="user_nickname" placeholder="" value="" required
                                                value={this.state.user_nickname} onChange={this.handleValueChange}    
                                            />
                                            <div className="invalid-feedback">
                                            Valid last nickname is required.
                                            </div>
                                        </div>
                                    </div>
    
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlSelect1">Gender</label>
                                        <select className="form-control" id="exampleFormControlSelect1" name="user_gender" required
                                            value={this.state.user_gender} onChange={this.handleValueChange}
                                        >
                                            <option value="">--------</option>
                                            <option value="남자">남자</option>
                                            <option value="여자">여자</option>
                                        </select>
                                    </div>
    
                                    <hr className="mb-3"/>

                                    {this.state.confirm_uid && this.state.confirm_pw && this.state.confirm_pw_checked?
                                    <button className="btn btn-primary btn-lg btn-block" type="submit">회원가입</button>
                                    :<button className="btn btn-primary btn-lg btn-block" disabled>회원가입 형식을 확인해주세요.</button>}
                                </form>
                            </div>
                        </div>
    
    
                        <footer className="footer my-5 pt-5 text-muted text-center text-small">
                            <p className="mb-1">&copy; 2019 Synabro</p>
                            <ul className="list-inline">
                                <li className="list-inline-item"><a href="/Users/hellomyworld/Desktop/bootstrap-4.3.1-dist/synabro/login.html">Privacy</a></li>
                                <li className="list-inline-item"><a href="#">Terms</a></li>
                                <li className="list-inline-item"><a href="#">Support</a></li>
                            </ul>
                        </footer>
                    </div>

                    <Snackbar
                        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                        open={this.state.openSnacbar}
                        onClose={this.handleSnacbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">아이디는 영문 소문자 또는 숫자로만 입력 가능합니다.</span>}
                    />

                </div>
            );
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

export default connect(mapStateToProps)(Signup);