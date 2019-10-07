import Axios from 'axios';

shb_getShbAllList = async() =>{
    return await Axios.get('/api/shb/getshbAll').then(res=>res.data);
}

shb_getShbAllItemList = async(shb_num) =>{
    return await Axios.get('/api/shb/getshbItemAll',{
        params:{
            shb_num:shb_num
        }
    }).then(res=>res.data);
}

export {shb_getShbAllList, shb_getShbAllItemList};