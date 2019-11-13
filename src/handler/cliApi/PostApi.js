import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

import { serverUrl } from '../../config/serverUrl';

export function __sendPost(typeOfPost,_sess, header_id, category_id, post_topic, post_desc) {
    if(typeOfPost==='univ'){
        let url = `${serverUrl}/api/univ_post/writePost`;

        return Axios.post(url, {
            usid: _sess,
            univ_id: header_id,
            post_type: category_id,
            post_topic: post_topic,
            post_desc: post_desc,
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    }else{
        let url = `${serverUrl}/api/shb/post/writepost/category`;

        return Axios.post(url,{
            parent_route:typeOfPost,
            usid: _sess,
            shb_num: header_id,
            shb_item_id: category_id,
            post_topic: post_topic,
            post_desc: post_desc,
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

export function __modifyPost(typeOfPost,_sess, header_id, category_id,post_id, post_topic, post_desc) {
    if(typeOfPost==='univ'){
        let url = `${serverUrl}/api/univ_post/updatePost`;

        return Axios.post(url, {
            usid: _sess,
            univ_id: header_id,
            post_type: category_id,
            post_id:post_id,
            post_topic: post_topic,
            post_desc: post_desc,
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    }
    else{
        // console.log(_sess);
        let url = `${serverUrl}/api/shb/post/updatePost/category`;

        return Axios.post(url, {
            usid: _sess,
            shb_num: header_id,
            shb_item_id: category_id,
            post_id:post_id,
            post_title: post_topic,
            post_desc: post_desc,
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    }
    
}

export function post_ViewCountPlus(post_id){
    Axios.post(`${serverUrl}/api/shb/post/postCount/plus`,{
        post_id:post_id
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
    .catch(err=>{
        console.log(err);
    })
}

// headers:{
//     'content-type': `multipart/form-data;`,
//     Authorization:'Bearer ' + AuthKey
// }