import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';


export function __sendComment(post_id,cmt_desc) {
    let url = '/api/comment/write_comment';
    // console.log(post_id)
    return Axios.post(url, {
        post_id : post_id,
        cmt_desc: cmt_desc,
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
        .then(res => res.data)
        .catch(function (error) {
            console.log(error);
        });

}

// export function __DeleteComment(cmt_id,cmt_isDeleted) {
//     let url = '/api/comment/delete_comment';
//     console.log(cmt_id,cmt_isDeleted)
//     return Axios.post(url, {
//         cmt_id: cmt_id,
//         cmt_isDeleted : cmt_isDeleted,
//     })
//         .then(res => res.data)
//         .catch(function (error) {
//             console.log(error);
//         });

// }