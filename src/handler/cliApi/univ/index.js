import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

const univ_getUnivOne = async(head_type) =>{
    // console.log(head_type);
    return await Axios.get(`${serverUrl}/api/univ`,{
        params:{
            selectedIndex:head_type
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
            }
    })
    .then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
    });
};

export {
    univ_getUnivOne
}