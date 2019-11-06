import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

/**
 * 멤버 체크 관련
 */
const member_check = async(usid,head_type) =>{
    // console.log(usid, head_type);
    if(usid){
        return Axios.post(`${serverUrl}/api/auth/authentication/memberCheck`,{
            usid:usid,
            head_type:head_type
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res=>res.data)
        .catch(err=>{
            alert('서버와 연결이 고르지 않습니다. 새로고침을 시도해 주세요.');
        })
    }
};

const member_apply = async(usid, head_type, resume) =>{
    // console.log(usid, head_type);
    if(usid){
        return Axios.post(`${serverUrl}/api/auth/member/apply`,{
            usid:usid,
            head_type:head_type,
            resume:resume
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res=>res.data)
        .catch(err=>{
            alert('서버와 연결이 고르지 않습니다. 새로고침을 시도해 주세요.');
        })
    }
};

const member_check_apply = async(usid, head_type) =>{
    if(usid){
        return Axios.post(`${serverUrl}/api/auth/member/checkApply`,{
            usid:usid,
            head_type:head_type
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('서버와 연결이 고르지 않습니다. 새로고침을 시도해 주세요.');
        })
    }
}


export {
    member_check,
    member_apply,
    member_check_apply
};