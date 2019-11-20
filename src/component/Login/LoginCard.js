import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../action';

import {logoutHandler} from '../../handler/LogoutHandler'


const Container=styled.div`
.login {
    font-size: 12px;
    height: 187px;
    padding: 40px 20px;
    opacity: 0.8;
    /* vertical-align:center; */
  }
  .greeting {
    margin-bottom: 5px;
  }
  .loginCard {
    
    top:50%;
    width: 100%;
    margin-bottom: 5px;
  }
  .loginFooter {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: black;
  }
  .logedCard{
    font-size: 12px;
    height: 187px;
    padding: 40px 20px;
    opacity: 0.8;
    display:flex;
    flex-direction: row;
  }
  .user_bar{
    width:100%;
    margin-left:10px;
  }
  .user_state{
    display:flex;
    justify-content:space-between;
  }
  .user_img {
    /* vertical-align: middle; */
    width: 45px;
    height: 45px;
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:black;
  opacity:0.8;
  `;

const defaultProps = {

}
const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
class LoginCard extends React.Component{
    constructor(props){
        super(props)
        this.state={

        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = ()=>{
      logoutHandler()
      .then(data=>{
        if(data.message==='success'){
          this.props.handleAUTH_FAILURE();
          window.location.reload();
        }else{
          alert('error logout');
        }
      });
    }

    render(){
      
      if(this.props._isLogged){
        return (
          <Container>
            <div className="logedCard card">
            <div className='user_image'>
            <img
                      className="user_img"
                      src={`https://ddpf5wamlzit3.cloudfront.net/logo/peopleNo.png`}
                      circular="true"
                    />
            </div>
            <div className="user_bar">
                <div className="greeting">
                  {this.props._nickname} 님 
                </div>
                <div className="user_state">
                <StyledLink className="user_profile" component={PageLink} to={'/profile'}>
                내 프로필
                </StyledLink>
                쪽지
                <button className='btn-sm btn-outline-danger' onClick={this.handleLogout}>로그아웃</button>
                </div>
                </div>
               
              </div>
          </Container>
        );
      }else{
        return(
            <Container>
              
                <div className="login card">
                <div className="greeting">
                  상해봄을 더 즐겁고 편리하게 이용하세요.
                </div>
                <Link to="./login">
                  <button className="loginCard btn btn-outline-primary">상해봄 Login</button>
                </Link>
                <div className="loginFooter">
                  <Link to='' className="account_find" onClick={()=>{alert('죄송합니다. 당분간은 관리자에게 직접 연락 바랍니다.')}}>아이디,비밀번호 찾기</Link>
                  <Link to="./signup">
                    <div className="sing_up">회원가입</div>
                  </Link>
                </div>
              </div>
                </Container>
        );
        }
    }
}



LoginCard.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}
const mapDispatchToProps = (dispatch)=> {
  return{
      handleLogin: (_sess, _nickname)=>{dispatch(actions.auth_login(_sess, _nickname))},
      handleAUTH_FAILURE: ()=>{dispatch(actions.auth_failure())}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginCard);