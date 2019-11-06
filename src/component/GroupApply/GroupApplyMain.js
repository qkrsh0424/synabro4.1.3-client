import React from 'react';

//redux
import {connect} from 'react-redux';

//QueryString
import queryString from 'query-string';

//RouterDom
import {Redirect} from 'react-router-dom';

//API
import * as shbApi from '../../handler/cliApi/shb';
import * as univApi from '../../handler/cliApi/univ';
import * as memberApi from '../../handler/cliApi/member';


//Component
import Nav from '../Nav/Nav';
import GroupApplyBody from './GroupApplyBody';

class GroupApplyMain extends React.Component{
    constructor(props){ 
        super(props);
        this.state={
            queryValues: queryString.parse(this.props.location.search),
            shb:null,
            univ:null,
            applyResume:'',
        }
    }

    componentDidMount = () =>{
        this._getHeader();
    }

    _getHeader = () =>{
        if(this.state.queryValues.Classify==='Univ'){
            univApi.univ_getUnivOne(this.state.queryValues.BomNo)
            .then(data=>{
                if(data.message==='success'){
                    this.setState({univ:data.data});
                }else{
                    alert('Error Load Page');
                    window.location.href='/'
                }
            });
        }else if(this.state.queryValues.Classify==='Shb'){
            shbApi.shb_getShbOne(this.state.queryValues.BomNo)
            .then(data=>{
                if(data.message==='success'){
                    this.setState({shb:data.data[0]});
                }else{
                    alert('Error Load Page');
                    window.location.href='/'
                }
            })
        }else{
            window.location.href='/'
        }
    }

    _handleOnChange = (e) =>{
        this.setState({applyResume:e.target.value});
    }

    _handleOnSubmit = (e) =>{
        e.preventDefault();
        if(this.state.shb){
            memberApi.member_apply(this.props._sess, this.state.shb.shb_num, this.state.applyResume)
            .then(data=>{
                // console.log(data.message);
                if(data.message==='success'){
                    alert('신청 되었습니다.');
                    window.history.back();
                }else if(data.message==='disconUser'){
                    alert('로그인을 다시 시도해 주세요.');
                    window.location.href='/login';
                }else if(data.message==='processing'){
                    alert('요청 처리중 이며, 이 와 같은 방식은 적절하지 않습니다.');
                    window.location.href='/';
                }else if(data.message==='exist'){
                    alert('이미 신청되어 있으며, 이 와 같은 방식은 적절하지 않습니다.');
                    window.location.href='/';
                }else{
                    window.location.href='/';
                }
            })
        }else if(this.state.univ){
            memberApi.member_apply(this.props._sess, this.state.univ.univ_id, this.state.applyResume)
            .then(data=>{
                // console.log(data.message);
                if(data.message==='success'){
                    alert('신청 되었습니다.');
                    window.history.back();
                }else if(data.message==='disconUser'){
                    alert('로그인을 다시 시도해 주세요.');
                    window.location.href='/login';
                }else if(data.message==='processing'){
                    alert('요청 처리중 이며, 이 와 같은 방식은 적절하지 않습니다.');
                    window.location.href='/';
                }else if(data.message==='exist'){
                    alert('이미 신청되어 있으며, 이 와 같은 방식은 적절하지 않습니다.');
                    window.location.href='/';
                }else{
                    window.location.href='/';
                }
            })
        }
        
    }

    render(){
        if(this.props._isLogged){
            return(
                <div>
                    <Nav/>
                    <GroupApplyBody
                        {...this.props}
                        {...this.state}
                        _handleOnChange = {this._handleOnChange}
                        _handleOnSubmit = {this._handleOnSubmit}
                    />
                </div>
            );
        }else{
            if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동 하시겠습니까?")) {
                return (
                    <Redirect to='/login' />
                );
            } else {
                return (
                    <Redirect to='/' />
                );
            }
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

export default connect(mapStateToProps)(GroupApplyMain);