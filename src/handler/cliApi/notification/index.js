import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';


const notification_UpToComment = async(writerSess, queryValues, commentId)=>{
    let postUrl = `/postPage?BomNo=${queryValues.BomNo}&Category=${queryValues.Category}&Pr=${queryValues.Pr}&PostVal=${queryValues.PostVal}`
    let type='postComment';
    return await Axios.post(`${serverUrl}/api/utill/notification/comment/write`, {
        writerSess:writerSess,
        postUrl:postUrl,
        PostVal:queryValues.PostVal,
        commentId:commentId,
        type:type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
}

const notification_ClickToLike = async(writerSess, queryValues)=>{
    let postUrl = `/postPage?BomNo=${queryValues.BomNo}&Category=${queryValues.Category}&Pr=${queryValues.Pr}&PostVal=${queryValues.PostVal}`
    let type='postLike';
    return await Axios.post(`${serverUrl}/api/utill/notification/like/click`, {
        writerSess:writerSess,
        postUrl:postUrl,
        PostVal:queryValues.PostVal,
        type:type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
}

const notification_CancelToLike = async (writerSess, queryValues)=>{
    let type='postLike';
    return await Axios.post(`${serverUrl}/api/utill/notification/like/cancel`, {
        writerSess:writerSess,
        PostVal:queryValues.PostVal,
        type:type
    },{
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
}

const notification_GetNotificationList = async(usid, notiListLimit)=>{
    return await Axios.get(`${serverUrl}/api/utill/notification/getlist/all`,{
        params:{
            usid:usid,
            notiListLimit:notiListLimit
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
}

const notification_GetNotificationListLength = async(usid)=>{
    return await Axios.get(`${serverUrl}/api/utill/notification/getlist/notiLength`,{
        params:{
            usid:usid
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    })
}

const notification_ReadedNormal = async(usid,PostVal)=>{
    // console.log(usid);
    return await Axios.post(`${serverUrl}/api/utill/notification/readed/normal`,{
            usid:usid,
            PostVal:PostVal
        },
        {
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }
    )
}

export {
    notification_UpToComment,
    notification_ClickToLike,
    notification_CancelToLike,
    notification_GetNotificationList,
    notification_GetNotificationListLength,
    notification_ReadedNormal
}