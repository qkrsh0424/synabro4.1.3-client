import React, { useEffect, useState } from 'react';

//query string
import queryString from 'query-string';

//Axios
import Axios from 'axios';

//redux
import {connect} from 'react-redux';

//server URL
import {serverUrl} from '../../config/serverUrl';

//API
import * as shbApi from '../../handler/cliApi/shb';
import * as postApi from '../../handler/cliApi/PostApi';

//Auth key
import AuthKey from '../../config/AuthorizationKey';

//Core
import Snackbar from '@material-ui/core/Snackbar';

//Component
import PosterBody from './PosterBody';
import Nav from '../Nav/Nav';


//////////////////////////////////////////////////////////////
//  qs => BomNo, Category, Pr, PostVal
//////////////////////////////////////////////////////////////


const PosterMain = (props) =>{
    const [queryValues, setQueryValues] = useState(queryString.parse(props.location.search));
    const [postModule, setPostModule] = useState(null);
    const [commonFiles, setCommonFiles] = useState(null);
    const [metaData,setMetaData] = useState(null);
    const [pathData, setPathData] = useState(null);

    const [likeSnackbarOpen, setLikeSnackbarOpen] = useState(false);
    const [likeSnackbarMessage, setSnackbarMessage] = useState('');

    useEffect(()=>{
        loadPost();
    },[]);

    const loadPost = async () =>{
        postApi.post_ViewCountPlus(queryValues.PostVal);
        await Axios.get(`${serverUrl}/api/shb/post/getpost/sheditor/one`,{
            params:{
                usid:props._sess,   //redux
                PostVal:queryValues.PostVal
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                setPostModule(data.postModule);
                setCommonFiles(JSON.parse(data.commonFiles));
                setMetaData(data.postMetaData);
                handleSetPathData(data.postMetaData);
            }
        })
    }


    function handleSetPathData(metaData){
        // console.log(metaData);
        let shbNum = metaData.shb_num;
        let shbName = metaData.shb_name;
        let shbItemId = metaData.shb_item_id;
        let shbItemName = metaData.shb_item_name;
        let parentRoute = metaData.parent_route;
    
        let pagePath;
        let boardCategoryPath;
        if(metaData.shb_num===1101001){
            shbName='메인 게시판';
            pagePath = `contentsList`;
            boardCategoryPath = `${metaData.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;
        }
        if(metaData.shb_num!==1101001){
            pagePath=`classify/${metaData.parent_route}/contype/${shbNum}`
            boardCategoryPath = `classify/${metaData.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;
    
        }
        setPathData({
            shbNum:shbNum,
            shbName:shbName,
            shbItemId:shbItemId,
            shbItemName:shbItemName,
            parentRoute:parentRoute,
            pagePath,
            boardCategoryPath
        });
    }

    const _deleteMyPoster = async() => {
        shbApi.shb_deletePosterOne(props._sess, queryValues.BomNo, queryValues.PostVal)
        .then(data=>{
            if(data==='success'){
                window.history.back();
            }else{
                alert('error');
                window.location.reload();
            }
        });
    }

    // like 관련 controll
    const _handleLikeOn = (head_type ,post_id) =>{
        const logincheck = props._isLogged;
        const usid = props._sess;
        shbApi.handleLikeOn(logincheck, usid, head_type ,post_id)
        .then((data)=>{
            if (data.message === 'like ok') {
                loadPost();
                setSnackbarMessage('좋아요를 누르셨습니다.');
                setLikeSnackbarOpen(true);
            } else {
                console.log('LIKE FUNCTION IS ERROR');
            }
        })
        
    }

    const _handleLikeOff = (head_type ,post_id) =>{
        const logincheck = props._isLogged;
        const usid = props._sess;
        shbApi.handleLikeOff(logincheck, usid, head_type ,post_id)
        .then(data=>{
            if (data.message === 'unlike ok') {
                loadPost();
                setSnackbarMessage('좋아요를 취소하셨습니다.');
                setLikeSnackbarOpen(true);
            } else {
                console.log('LIKE FUNCTION IS ERROR');
            }
        })
    }

    const handleLikeSnackbarClose = () =>{
        setLikeSnackbarOpen(false);
    }

    const scrollMoveToComment = async() =>{
        await setTimeout(()=>{
            document.getElementById('comment_part').scrollIntoView({
                behavior: 'smooth',
                block:'center'
              });
        },0)
    }

    return(
        <div>
            {/* {console.log(postModule)}
            {console.log(commonFiles)}
            {console.log(metaData)}
            {console.log(pathData)} */}
            <Nav/>
            {metaData && pathData && postModule &&
                <PosterBody
                    metaData = {metaData}
                    pathData = {pathData}
                    postModule= {postModule}
                    commonFiles={commonFiles}
                    queryValues={queryValues}
                    _sess = {props._sess}   //redux
                    _isLogged={props._isLogged} //redux

                    _deleteMyPoster={_deleteMyPoster}
                    _handleLikeOn={_handleLikeOn}
                    _handleLikeOff={_handleLikeOff}
                    loadPost={loadPost}
                    scrollMoveToComment={scrollMoveToComment}
                />
            }
            <Snackbar
                open={likeSnackbarOpen}
                onClose={handleLikeSnackbarClose}
                transitionDuration={1000}
                autoHideDuration={3000}
                message={likeSnackbarMessage}
            />
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
    }
}


export default connect(mapStateToProps)(PosterMain);