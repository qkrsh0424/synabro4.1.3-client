import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const propTypes = {
    user_email: PropTypes.string,
    user_password: PropTypes.string,
    handleValueChange: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    handleMoveHome: PropTypes.func
}

const defaultProps = {
    user_email:undefined,
    user_password:undefined,
    handleValueChange: console.warn('handleValueChange is not defined'),
    handleFormSubmit: console.warn('handleFormSubmit is not defined'),
    handleMoveHome: console.warn('handleMoveHome is not defined'),
}

class LoginBody extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <main className="body body__t">
                    <div className="container container__t animate slideIn">
                        <div className="row row__t">
                            <form className="form-signin form-signin__t text-center" onSubmit={this.props.handleFormSubmit}>
                                <img 
                                    className="mb-4" 
                                    src='https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/synabrologo2.png' 
                                    alt="" 
                                    width="288" 
                                    height="72"
                                    onClick={this.props.handleMoveHome}
                                />
                                <h1 className="h3 mb-3 font-weight-normal">로그인</h1>
                                <label htmlFor="user_email" className="sr-only">Email address</label>
                                <input type="email" id="user_email" name="user_email" className="form-control" placeholder="Email address" required
                                    value={this.props.user_email} onChange={this.props.handleValueChange}
                                />
    
                                <label htmlFor="user_password" className="sr-only">Password</label>
                                <input type="password" id="user_password" name="user_password" className="form-control" placeholder="Password" required
                                    value={this.props.user_password} onChange={this.props.handleValueChange}
                                />
    
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                                <div className="text-muted__t">
                                    <p className="mt-5 mb-3">"한인들의 정보를 효율적으로 관리해 한인들의 삶의 질을 향상시킨다."</p>
                                </div>
    
    
                                <div className="signin signin__t">
                                    <p className="signin__box">회원가입을 원하시면 링크를 클릭하세요.</p>
                                    <Link to="./register">회원가입</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
        );
    }
}

LoginBody.propTypes = propTypes;

LoginBody.defaultProps = defaultProps;

export default (LoginBody);