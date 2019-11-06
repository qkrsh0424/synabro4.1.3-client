import React from 'react';

//Component
import ApplyMemberList from './ApplyMemberList';
import ResumeView from './ResumeView';

class ApplyListBody extends React.Component{
    
    render(){
        return(
            <div>
                <h4>신청인</h4>
                <ApplyMemberList
                    {...this.props}
                    _confirmMember = {this.props._confirmMember}
                    _rejectMember = {this.props._rejectMember}
                    _handleOpenResumeView = {this.props._handleOpenResumeView}
                />
                <ResumeView
                    {...this.props}
                    _handleCloseResumeView = {this.props._handleCloseResumeView}
                />
                
            </div>
        );
    }
}

export default ApplyListBody;