import React from 'react';

//AWS URL
import { awsImageURL } from '../../../config/awsurl'

class Information extends React.Component {
    render() {
        return (
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>Account</h4>
                </div>
                <div className='list-group border pt-3 pb-3 __border_radius'>
                    <div class="list-group-item border-white __profile_field">
                        <label>사진</label>
                        <span><img src={`${awsImageURL}/logo/peopleNo.png`} /></span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>아이디</label>
                        <span>{this.props.user.UID}</span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>이메일</label>
                        <span>{this.props.user.Email}</span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>이름</label>
                        <span>{this.props.user.Name}</span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>닉네임</label>
                        <span>{this.props.user.Nickname}</span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>직업 및 소속</label>
                        <span>{this.props.user.Job}</span>
                    </div>
                    <div class="list-group-item border-white">
                        <label>직무 및 학과</label>
                        <span>{this.props.user.Major}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Information);