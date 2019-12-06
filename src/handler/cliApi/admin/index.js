import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

/**
 * 그룹 마스터 체크
 */
const admin_group_master_check = async(usid) =>{
    if(usid){
        return await Axios.post(`${serverUrl}/api/auth/admin/checkAdmin`,{
            usid:usid
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res=>{
            if(res.data.message==='success'){
                return res.data
            }else{
                window.location.href='/';        
            }
        }).catch(err=>{
            alert('에러가 발생 했습니다.');
            window.location.href='/'
        });
    }else{
        window.location.href='/';
    }
};

const admin_Members_Of_Group = async(head_type)=>{
    return await Axios.post(`${serverUrl}/api/auth/admin/group/members/all`,{
        head_type:head_type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('에러가 발생 했습니다.');
        window.location.href='/'
    });
}

/**
 * 
 * @param {*} head_type 
 * 헤드타입에 따른 신청자들을 모두 검색
 */
const admin_Applicants_Of_Group = async(head_type)=>{
    return await Axios.post(`${serverUrl}/api/auth/admin/group/applicant/all`,{
        head_type:head_type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('에러가 발생 했습니다.');
        window.location.href='/'
    });
}

const admin_Applicant_Confirm = async(applicantId, head_type)=>{
    return await Axios.post(`${serverUrl}/api/auth/admin/group/confirmApply`,{
        applicantId:applicantId,
        head_type:head_type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('에러가 발생 했습니다.');
        window.location.href='/'
    });
}

const admin_Applicant_Reject = async(applicantId, head_type)=>{
    return await Axios.post(`${serverUrl}/api/auth/admin/group/rejectApply`,{
        applicantId:applicantId,
        head_type:head_type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('에러가 발생 했습니다.');
        window.location.href='/'
    });
}

const admin_DeleteMemberOne = async(head_type, member_id) =>{
    return await Axios.post(`${serverUrl}/api/auth/admin/group/deleteMember/one`,{
        head_type:head_type,
        member_id:member_id
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('에러가 발생 했습니다.');
        window.location.href='/'
    });
}

export {
    admin_group_master_check,
    admin_Members_Of_Group,
    admin_Applicants_Of_Group,
    admin_Applicant_Confirm,
    admin_Applicant_Reject,
    admin_DeleteMemberOne
};