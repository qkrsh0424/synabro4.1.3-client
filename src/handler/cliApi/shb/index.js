import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

//shb parentRoute 관련 API
const shb_getParentRouteAll = async()=>{
    return await Axios.get(`${serverUrl}/api/shb/getParentRoute/all`,{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
    });
}
// shb 관련 API
const shb_getShbAllList = async(type) =>{
    if(type){
        return await Axios.get(`${serverUrl}/api/shb/getshbAll`,{
            params:{
                type:type
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
              }
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
        });
    }else{
        return await Axios.get(`${serverUrl}/api/shb/getshbAll`,{
            headers:{
                Authorization:'Bearer ' + AuthKey
              }
        })
        .then(res=>res.data)
        .catch(err=>{
            alert('잘못된 방식 입니다.');
        });;
    }
};

const shb_getShbOne = async(shb_num) =>{
    return await Axios.get(`${serverUrl}/api/shb/getshbOne`,{
        params:{
            shb_num:shb_num
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

//shb_item 관련 API

const shb_getShbAllItemList = async(shb_num) =>{
    return await Axios.get(`${serverUrl}/api/shb/getshbItemAll`,{
        params:{
            shb_num:shb_num
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
          }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
    });
}

const shb_getShbOneItem = async(shb_item_id,shb_num)=>{
    return await Axios.get(`${serverUrl}/api/shb/shbItem/getOne`,{
        params:{
            shb_num:shb_num,
            shb_item_id: shb_item_id
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
          }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
        window.location.href='/'
    });
}

// post 관련 API

const shb_getShbAllPostForAllBoundary = async() =>{
    return await Axios.get(`${serverUrl}/api/shb/post/getpost/all`,{
        
        headers:{
            Authorization:'Bearer ' + AuthKey
          }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
        window.location.href='/'
    });
}
/**
 * 
 * 지정된 SHB_NUM의 모든 포스터를 로드할때 쓰는 API
 */

 const shb_getShbAllPostForShbNum = async(shb_num, startPostIndex, currentPostIndex) =>{

    var hasBoundary = false;
    if(currentPostIndex){
        hasBoundary = true;
    }

    if(hasBoundary){
        return await Axios.get(`${serverUrl}/api/shb/post/getpost/shbNum/all`,{
            params:{
                shb_num:shb_num,
                startPostIndex:startPostIndex,
                currentPostIndex:currentPostIndex,
                hasBoundary:hasBoundary
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
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
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
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
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
          }
    }).then(res=>res.data)
    .catch(err=>{
        alert('잘못된 방식 입니다.');
        window.location.href='/'
    });
}

/**
 * 
 * 포스터 작성자 유효성 검사
 * 
 */

 const shb_posterValidationAndMenuControl = async(usid, post_id, shb_num) =>{
    let url = `${serverUrl}/api/shb/post/posterValidation/shb`;
    return await Axios.post(url, {
        usid: usid,
        post_id: post_id,
        head_type: shb_num
    }, {
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    })
        .then(res => res.data)
        .catch(err => alert('서버와 연결이 고르지 않습니다. (poster_valid error *univposter'));
 }

 /**
  * 
  * 포스터 유효성 검사를 통과한 항목에 대한 포스터 삭제기능
  * @param {*} usid 
  * @param {*} head_type (shb_num)
  * @param {*} post_id 
  * 
  */

const shb_deletePosterOne = async(usid, head_type, post_id) =>{
    return await Axios.post(`${serverUrl}/api/shb/post/deletePoster/shb/one`, {
        usid:usid,
        head_type: head_type,
        post_id: post_id,
    }, {
        headers: {
            Authorization: 'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        alert('error');
        window.location.reload();
    })
  }

const shb_getAllCommentOfCategory = async(usid, post_id)=>{
    return await Axios.get(`${serverUrl}/api/comment/post_comment/get/all`,{
        params:{
            usid:usid,
            post_id: post_id
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
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
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
          }
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
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
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
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
              }
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
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
              }
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
export { 
    shb_getParentRouteAll,
    shb_getShbAllList, shb_getShbOne,
    shb_getShbAllItemList, shb_getShbOneItem, 
    shb_getShbAllPostForAllBoundary,shb_getShbAllPostForShbNum, shb_getShbOnePost, shb_posterValidationAndMenuControl, shb_deletePosterOne,
    shb_getAllCommentOfCategory, shb_writeCommentOfCategory,shb_deleteCommentOfCategory,
    handleLikeOn, handleLikeOff };