import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';

// shb 관련 API
const shb_getShbAllList = async(type) =>{
    if(type){
        return await Axios.get(`${serverUrl}/api/shb/getshbAll`,{
            params:{
                type:type
            }
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
        });
    }else{
        return await Axios.get(`${serverUrl}/api/shb/getshbAll`)
        .then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
        });;
    }
};

//shb_item 관련 API

const shb_getShbAllItemList = async(shb_num) =>{
    return await Axios.get(`${serverUrl}/api/shb/getshbItemAll`,{
        params:{
            shb_num:shb_num
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
    });
}

const shb_getShbOneItem = async(shb_item_id)=>{
    return await Axios.get(`${serverUrl}/api/shb/shbItem/getOne`,{
        params:{
            shb_item_id: shb_item_id
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
        window.location.href='/'
    });
}

// post 관련 API

/**
 * 
 * 지정된 SHB_NUM의 모든 포스터를 로드할때 쓰는 API
 */

 const shb_getShbAllPostForShbNum = async(shb_num, startPostIndex, currentPostIndex) =>{

    if(startPostIndex && currentPostIndex){
        return await Axios.get(`${serverUrl}/api/shb/post/getpost/shbNum/all`,{
            params:{
                shb_num:shb_num,
                startPostIndex:startPostIndex,
                currentPostIndex:currentPostIndex
            }
        }).then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
            window.location.href='/'
        });
    }else{
        return await Axios.get(`${serverUrl}/api/shb/post/getpost/shbNum/all`,{
            params:{
                shb_num:shb_num,
            }
        }).then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
            window.location.href='/'
        });
    }
    
 }

/**
 * 
 * 단일 포스터를 로드 할때 쓰는 API
 */
const shb_getShbOnePost = async(usid, post_id)=>{
    // console.log(shb_num)
    return await Axios.get(`${serverUrl}/api/shb/post/getpost/one`,{
        params:{
            usid:usid,
            post_id: post_id
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
        window.location.href='/'
    });
}

const shb_getAllCommentOfCategory = async(usid, post_id)=>{
    return await Axios.get(`${serverUrl}/api/comment/post_comment/get/all`,{
        params:{
            usid:usid,
            post_id: post_id
        }
    })
    .then(res=>res.data)
    .catch(err=>alert('댓글 불러오기 에러.'));
}

const shb_writeCommentOfCategory = async(usid, cmt_desc, post_id, head_type) =>{
    return await Axios.post(`${serverUrl}/api/comment/post_comment/write`,{
        usid: usid,
        cmt_desc:cmt_desc,
        post_id:post_id,
        head_type:head_type
    })
    .then(res=>res.data)
    .catch(err=>{
        alert('서버와 연결이 고르지 못합니다. 다시 시도해 주세요.');
    })
}

const shb_deleteCommentOfCategory = async(cmt_id, head_type, post_id)=>{
    return await Axios.delete(`${serverUrl}/api/comment/post_comment/delete`,{
        params:{
            cmt_id:cmt_id,
            head_type:head_type,
            post_id:post_id
        }
    })
    .then(res=>res.data)
    .catch(err=>{
        alert('서버와 연걸이 고르지 못합니다. 다시 시도해 주세요.');
    })
}

//_isLogged, _sess, head_type, post_id
const handleLikeOn = async(logincheck, usid, head_type, post_id) =>{
    if(logincheck){
        return await Axios.post(`${serverUrl}/api/post_like/like`,{
            usid:usid,
            head_type:head_type,
            post_id:post_id,
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('좋아요 에러.');
        })
    }else{
        alert('로그인이 필요한 서비스 입니다.');
        window.location.href='/login';
    }
}

//_isLogged, _sess, head_type, post_id
const handleLikeOff = async(logincheck, usid, head_type, post_id) =>{
    if(logincheck){
        return await Axios.post(`${serverUrl}/api/post_like/unlike`,{
            usid:usid,
            head_type:head_type,
            post_id:post_id,
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('좋아요 에러.');
        })
    }else{
        alert('로그인이 필요한 서비스 입니다.');
        window.location.href='/login';
    }
}
export { shb_getShbAllList,shb_getShbAllItemList, shb_getShbOneItem, 
    shb_getShbAllPostForShbNum, shb_getShbOnePost, 
    shb_getAllCommentOfCategory, shb_writeCommentOfCategory,shb_deleteCommentOfCategory,
    handleLikeOn, handleLikeOff };