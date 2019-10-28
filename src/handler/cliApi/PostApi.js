import Axios from 'axios';
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
            headers: {
                'content-type': `multipart/form-data;`,
            },
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
            headers: {
                'content-type': `multipart/form-data;`,
            },
        }).then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    }
    
}