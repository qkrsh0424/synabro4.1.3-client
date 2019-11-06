import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

/**
 * 베너 겟
 * @param {*} headType 헤더 타입
 * @param {*} bannerType 베너 타입
 */

const banner_getBanner_headType_bannerType = async(headType, bannerType) =>{
    return await Axios.get(`${serverUrl}/api/banner/getBanner/mainPage/header`,{
        params:{
            head_type:headType,
            banner_type:bannerType
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
};

export {
    banner_getBanner_headType_bannerType
}