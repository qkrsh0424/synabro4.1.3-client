import React from 'react';
import '../ProfileBody.css';

import {NavLink, Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import Information from './Information';
import MyLikeList from './MyLikeList';
import ChangeInformation from './ChangeInformation';
import ChangePassword from './ChangePassword';
import DropUser from './DropUser';

class ProfileBody extends React.Component {
    render() {
        const childContents = [];
        const activeStyle = {
            color: 'green',
            // background:'skyblue'
            background:'none'
        }
        const AdapterLink = React.forwardRef((props, ref) => <NavLink activeStyle={activeStyle} innerRef={ref} {...props} />);
        
        switch(this.props.conType){
            case undefined:
                childContents.push(
                    <Information
                        _nickname = {this.props._nickname}
                        user = {this.props.user}
                    />
                );    
                break;
            case 'like':
                childContents.push(
                    <MyLikeList
                        
                    />
                );
                break;
            case 'chginfo':
                if(this.props.user){
                    childContents.push(
                        <ChangeInformation
                            _nickname = {this.props._nickname}
                            user = {this.props.user}
                        />
                    );
                }
                break;
            case 'chgpassword':
                childContents.push(
                    <ChangePassword  
                    />
                );
                break;
            case 'dropuser':
            childContents.push(
                <DropUser
                />
            );
            break;
            default:
                childContents.push(<h1>not found page 404</h1>);
                break;
                
        }
        return (
            <div className='container mt-2'>
                <div class="row justify-content-between">
                    <div class="col-md-4 pt-3 pb-3">
                        <div className='border p-3 __border_radius mb-1'>
                            <h4 className='m-0'>내 정보</h4>
                        </div>
                        <div className='list-group border pt-3 pb-3 __border_radius'>
                            <NavLink 
                                activeStyle={activeStyle}
                                className="list-group-item list-group-item-action border-white"
                                // component={AdapterLink}
                                exact to={`/profile`}
                            >
                                기본정보
                            </NavLink>
                            <NavLink 
                                activeStyle={activeStyle}
                                className="list-group-item list-group-item-action border-white"
                                // component={AdapterLink}
                                to={`/profile/like`}
                            >
                                좋아요 목록
                            </NavLink>
                            <NavLink 
                                activeStyle={activeStyle}
                                className={"list-group-item list-group-item-action border-white"}
                                // component={AdapterLink}
                                to={`/profile/chginfo`}
                            >
                                개인정보 변경
                            </NavLink>
                            <NavLink
                                style={{pointerEvents: 'none', color:'#e0e0e0'}}
                                className="list-group-item list-group-item-action border-white"
                                disabled
                                // component={AdapterLink}
                                to={`/profile/2`}
                            >
                                프로필 사진 변경
                            </NavLink>
                            <NavLink 
                                activeStyle={activeStyle}
                                className={"list-group-item list-group-item-action border-white"}
                                // component={AdapterLink}
                                to={`/profile/chgpassword`}
                            >
                                비밀번호 변경
                            </NavLink>
                            <NavLink 
                                activeStyle={activeStyle}
                                className={"list-group-item list-group-item-action border-white"}
                                // component={AdapterLink}
                                to={`/profile/dropuser`}
                            >
                                회원 탈퇴
                            </NavLink>
                        </div>
                    </div>
                    <div class="col-md-8 pt-3 pb-3">
                        {childContents}
                    </div>
                </div>
            </div>
        );
    }
}

export default (ProfileBody);