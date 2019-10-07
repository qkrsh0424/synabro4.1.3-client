import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';

const shb_getShbAllList = async() =>{
    return await Axios.get(`${serverUrl}/api/shb/getshbAll`).then(res=>res.data);
};

const shb_getShbAllItemList = async(shb_num) =>{
    return await Axios.get(`${serverUrl}/api/shb/getshbItemAll`,{
        params:{
            shb_num:shb_num
        }
    }).then(res=>res.data);
}

export { shb_getShbAllList,shb_getShbAllItemList };