import React from 'react';
import '../AdminPage.css';

//API
import * as adminApi from '../../../handler/cliApi/admin';
//Component
import ApplyListBody from './ApplyListBody';

class ApplyListMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            applicants:null,
            resumeViewOpen:false,
            resumeAuthor:null,
            resumeText:null,
        }
    }

    componentDidMount = async()=>{
        this._getApplicants();
    }


    _getApplicants = async()=>{
        adminApi.admin_Applicants_Of_Group(this.props.group.shb_num)
        .then(data=>{
            // console.log(data);
            if(data.message==='success'){
                this.setState({applicants:data.data});
            }else if(data.message==='none'){
                this.setState({applicants:null});
            }else{
                window.location.href='/'
            }
        })
    }

    _confirmMember = async(applicantId)=>{
        await adminApi.admin_Applicant_Confirm(applicantId, this.props.group.shb_num)
        .then(data=>{
            if(data.message==='success'){
                this.setState({applicants:null})
                this.props._getGroupMembers(this.props.group.shb_num);
            }else{
                alert('에러.');
                window.location.reload();
            }
        })
        await this._getApplicants();
    }

    _rejectMember = async(applicantId)=>{
        await adminApi.admin_Applicant_Reject(applicantId, this.props.group.shb_num)
        .then(data=>{
            if(data.message==='success'){
                this.setState({applicants:null})
                this.props._getGroupMembers(this.props.group.shb_num);
            }else{
                alert('에러.');
                window.location.reload();
            }
        })
        await this._getApplicants();
    }

    _handleOpenResumeView = async(resumeAuthor,resumeView)=>{
        this.setState({resumeViewOpen:true, resumeAuthor:resumeAuthor,resumeText:resumeView});
    }

    _handleCloseResumeView = async() => {
        await this.setState({ resumeViewOpen: false });
      };

    render(){
        // console.log(this.state.resumeText);
        // console.log(this.state.applicants);
        return(
            <div>
                <ApplyListBody
                    {...this.props}
                    {...this.state}
                    _confirmMember = {this._confirmMember}
                    _rejectMember = {this._rejectMember}
                    _handleOpenResumeView = {this._handleOpenResumeView}
                    _handleCloseResumeView = {this._handleCloseResumeView}
                />
                
            </div>
        );
    }
}

export default ApplyListMain;