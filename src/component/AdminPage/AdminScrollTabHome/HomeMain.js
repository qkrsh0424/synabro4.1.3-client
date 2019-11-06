import React from 'react';

import MemberList from './MemberList';
class HomeMain extends React.Component{
    render(){
        return(
            <div>
                <h3 className='text-center'>환영합니다. <em>{this.props.group?this.props.group.shb_name:""}</em> 관리자 페이지 입니다.</h3>
                <h4>구성 멤버</h4>
                <MemberList
                    {...this.props}
                />
            </div>
        );
    }
}

export default HomeMain;