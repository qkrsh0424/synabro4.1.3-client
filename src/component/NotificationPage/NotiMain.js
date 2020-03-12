import React,{useEffect, useState} from 'react';

//redux
import {connect} from 'react-redux';

//Cookie
import cookie from 'react-cookies';

//API
import * as notiApi from '../../handler/cliApi/notification';

//Component
import Nav from '../Nav/Nav';
import NotiBody from './NotiBody';
const NotiMain = (props) =>{
    const [notiList, setNotiList] = useState(null);
    const [notiListLimit, setNotiListLimit] = useState(20);
    const [notiLimitUpLoading, setNotiLimitUpLoading] = useState(false);

    useEffect(()=>{
        getNotificationLists();
    },[notiListLimit]);

    const getNotificationLists = async () =>{
        setNotiLimitUpLoading(true);
        notiApi.notification_GetNotificationList(props._sess, notiListLimit)
        .then(res=>{
            // console.log(res.data);
            if(res.data.message==='success'){
                setNotiList(res.data.notiData);
                setNotiLimitUpLoading(false);
            }
        });
    }

    const handleListLimitUp = ()=>{
        setNotiListLimit(notiListLimit+2);
    }

    const ReloadNotificationList = ()=>{
        window.scrollTo(0,0);
        getNotificationLists();
    }

    const handleChangeRouter = (url) =>{
        props.history.push(url);
    }

    if(props._isLogged){
        return(
            <div>
                <Nav/>
                {notiList && 
                    <NotiBody
                        notiList = {notiList}
                        notiListLimit={notiListLimit}
                        notiLimitUpLoading={notiLimitUpLoading}

                        handleListLimitUp={handleListLimitUp}
                        ReloadNotificationList={ReloadNotificationList}
                        handleChangeRouter={handleChangeRouter}
                    />
                }
                
            </div>
        );
    }else{
        window.location.href='/'
    }
    
}
const mapStateToProps = (state) => {
  return {
    _isLogged: state.auth_user._isLogged,
    _nickname: state.auth_user._nickname,
    _sess: state.auth_user._sess,
  }
}
export default connect(mapStateToProps)(NotiMain);