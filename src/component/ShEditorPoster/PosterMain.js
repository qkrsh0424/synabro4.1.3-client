import React, { useEffect, useState } from 'react';

//query string
import queryString from 'query-string';

//Axios
import Axios from 'axios';

//redux
import { connect } from 'react-redux';

//server URL
import { serverUrl } from '../../config/serverUrl';

//API
import * as shbApi from '../../handler/cliApi/shb';
import * as postApi from '../../handler/cliApi/PostApi';
import * as notiApi from '../../handler/cliApi/notification';

//Auth key
import AuthKey from '../../config/AuthorizationKey';

//Core
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';

//Component
import PosterBody from './PosterBody';
import Nav from '../Nav/Nav';
import PageLoading from './PageLoading';

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
    },
}));

//////////////////////////////////////////////////////////////
//  qs => BomNo, Category, Pr, PostVal
//////////////////////////////////////////////////////////////


const PosterMain = (props) => {
    const styleClasses = useStyles();
    const [notiReady, setnotiReady] = useState(false);
    const [queryValues, setQueryValues] = useState(queryString.parse(props.location.search));
    const [postModule, setPostModule] = useState(null);
    const [commonFiles, setCommonFiles] = useState(null);
    const [metaData, setMetaData] = useState(null);
    const [pathData, setPathData] = useState(null);

    const [likeSnackbarOpen, setLikeSnackbarOpen] = useState(false);
    const [likeSnackbarMessage, setSnackbarMessage] = useState('');

    const [pageTransMenuOpen, setPageTransMenuOpen] = useState(false);
    const [pageTransMenuAnchor, setPageTransMenuAnchor] = useState(null);
    const [pageTransLoadingOpen, setPageTransLoadingOpen] = useState(false);
    const [pageTransLoadingMessage, setPageTransLoadingMessage] = useState('Translating...');

    useEffect(() => {
        notificationReadedNormal();
        loadPost();
    }, []);

    const notificationReadedNormal = () => {
        if (props._isLogged) {
            notiApi.notification_ReadedNormal(props._sess, queryValues.PostVal)
                .then(res => res.data)
                .then(data => {
                    if (data.message === 'success') {
                        return setnotiReady(true);
                    } else {
                        return setnotiReady(true);
                    }
                })
        } else {
            return setnotiReady(true);
        }
    }

    // ** viewCountCheck result boolean
    const viewCountCheck = () => {
        if (localStorage.getItem('shbom_vp')) {
            let vpArray = JSON.parse(localStorage.getItem('shbom_vp'));
            for (let i = 0; i < vpArray.length; i++) {
                if (vpArray[i] === queryValues.PostVal) {
                    return false;
                }
            }
            if (vpArray.length >= 5) {
                vpArray.shift();
            }
            vpArray.push(queryValues.PostVal);
            localStorage.setItem('shbom_vp', JSON.stringify(vpArray));
            return true;
        } else {
            let vpArray = JSON.stringify([queryValues.PostVal]);
            localStorage.setItem('shbom_vp', vpArray);
            return true;
        }
    }

    const loadPost = async () => {
        if (viewCountCheck()) {
            postApi.post_ViewCountPlus(queryValues.PostVal)
        }

        await Axios.get(`${serverUrl}/api/shb/post/getpost/sheditor/one`, {
            params: {
                usid: props._sess,   //redux
                PostVal: queryValues.PostVal
            },
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'success') {
                    setPostModule(data.postModule);
                    setCommonFiles(JSON.parse(data.commonFiles));
                    setMetaData(data.postMetaData);
                    handleSetPathData(data.postMetaData);
                }
            })
    }


    function handleSetPathData(metaData) {
        // console.log(metaData);
        let shbNum = metaData.shb_num;
        let shbName = metaData.shb_name;
        let shbItemId = metaData.shb_item_id;
        let shbItemName = metaData.shb_item_name;
        let parentRoute = metaData.parent_route;

        let pagePath;
        let boardCategoryPath;
        if (metaData.shb_num === 1101001) {
            shbName = '메인 게시판';
            pagePath = `contentsList`;
            boardCategoryPath = `${metaData.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;
        }
        if (metaData.shb_num !== 1101001) {
            pagePath = `classify/${metaData.parent_route}/contype/${shbNum}`
            boardCategoryPath = `classify/${metaData.parent_route}/category/${shbItemId}?BomNo=${shbNum}`;

        }
        setPathData({
            shbNum: shbNum,
            shbName: shbName,
            shbItemId: shbItemId,
            shbItemName: shbItemName,
            parentRoute: parentRoute,
            pagePath,
            boardCategoryPath
        });
    }

    const _deleteMyPoster = async () => {
        shbApi.shb_deletePosterOne(props._sess, queryValues.BomNo, queryValues.PostVal)
            .then(data => {
                if (data === 'success') {
                    window.history.back();
                } else {
                    alert('error');
                    window.location.reload();
                }
            });
    }

    // like 관련 controll
    const _handleLikeOn = (head_type, post_id) => {
        const logincheck = props._isLogged;
        const usid = props._sess;
        if (logincheck) {
            shbApi.handleLikeOn(logincheck, usid, head_type, post_id)
                .then((data) => {
                    if (data.message === 'like ok') {
                        LikeClickToNotification();
                        loadPost();
                        setSnackbarMessage('좋아요를 누르셨습니다.');
                        setLikeSnackbarOpen(true);
                    } else {
                        console.log('LIKE FUNCTION IS ERROR');
                    }
                })
        } else {
            alert('로그인이 필요한 서비스 입니다.');
            props.history.push('/login');
        }


        function LikeClickToNotification() {
            notiApi.notification_ClickToLike(usid, queryValues)
                .then(res => {
                    if (res.data.message === 'owner') {
                        return;
                    } else {
                        return;
                    }
                })
        }
    }

    const _handleLikeOff = (head_type, post_id) => {
        const logincheck = props._isLogged;
        const usid = props._sess;
        if (logincheck) {
            shbApi.handleLikeOff(logincheck, usid, head_type, post_id)
                .then(data => {
                    if (data.message === 'unlike ok') {
                        LikeCancelToNotification();
                        loadPost();
                        setSnackbarMessage('좋아요를 취소하셨습니다.');
                        setLikeSnackbarOpen(true);
                    } else {
                        console.log('LIKE FUNCTION IS ERROR');
                    }
                })
        } else {
            alert('로그인이 필요한 서비스 입니다.');
            props.history.push('/login');
        }

        function LikeCancelToNotification() {
            notiApi.notification_CancelToLike(usid, queryValues)
                .then(res => {
                    if (res.data.message === 'success') {
                        return;
                    } else if (res.data.message === 'non-user') {
                        return;
                    } else {
                        alert('notiCancel_error');
                    }
                })
        }
    }

    const handleLikeSnackbarClose = () => {
        setLikeSnackbarOpen(false);
    }

    const scrollMoveToComment = async () => {
        await setTimeout(() => {
            document.getElementById('comment_part').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 0)
    }

    const handleTranslateMenuOpen = (e) => {
        setPageTransMenuAnchor(e.currentTarget);
        setPageTransMenuOpen(true);
    }

    const handleTranslateMenuClose = () => {
        setPageTransMenuOpen(false);
    }
    const translatePage = async (transType) => {
        handleTranslateMenuClose();
        let targetHtml = document.getElementById('sheditorPart');
        let sourceLan = 'ko';
        let targetLan = 'zh';
        switch (transType) {
            case 'ko-zh':
                sourceLan = 'ko';
                targetLan = 'zh';
                break;
            case 'ko-en':
                sourceLan = 'ko';
                targetLan = 'en';
                break;
            case 'zh-ko':
                sourceLan = 'zh';
                targetLan = 'ko';
                break;
            case 'zh-en':
                sourceLan = 'zh';
                targetLan = 'en';
                break;
            case 'en-ko':
                sourceLan = 'en';
                targetLan = 'ko';
                break;
            case 'en-zh':
                sourceLan = 'en';
                targetLan = 'zh';
                break;
            default:break;
        }
        // if (transType === 'ko-zh') {
        //     sourceLan = 'ko';
        //     targetLan = 'zh';
        // } else if (transType === 'ko-en') {
        //     sourceLan = 'ko';
        //     targetLan = 'en';
        // }
        setPageTransLoadingOpen(true);
        await setTimeout(async ()=>{
            setPageTransLoadingMessage('Wait a moment...');
            await setTimeout(()=>{
                setPageTransLoadingMessage('Almost completed...');
            },7000)
        },7000)
        Axios.post(`${serverUrl}/api/service/extend/translate/thispageTest`, {
            originHtml: targetHtml.outerHTML,
            sourceLan: sourceLan,
            targetLan: targetLan
        },
            {
                // onUploadProgress: progressEvent => {
                //     let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                //     // do whatever you like with the percentage complete
                //     // maybe dispatch an action that will update a progress bar or something
                //     console.log(percentCompleted);
                // },
                headers: {
                    Authorization: 'Bearer ' + AuthKey
                }
            }).then(res => {
                if (res.data.message === 'success') {
                    targetHtml.innerHTML = res.data.htmlData;
                    setPageTransLoadingOpen(false);
                    window.scrollTo(0,0);
                } else {
                    setPageTransLoadingOpen(false);
                    alert('page translate failed.')
                }
            }).catch(err => {
                setPageTransLoadingOpen(false);
                alert('page translate failed.')
            })
    }
    return (
        <div>
            {/* {console.log(postModule)}
            {console.log(commonFiles)}
            {console.log(metaData)}
            {console.log(pathData)} */}
            <Dialog open={pageTransLoadingOpen} style={{ borderRadius: '15px' }}>
                <div className='text-center' style={{ background: 'rgba(0,0,0,0.8)', padding: '15px' }}>
                    <CircularProgress color="primary" />
                    <hr />
                    <h4 style={{ color: 'white' }}>{pageTransLoadingMessage}</h4>
                </div>

            </Dialog>

            {notiReady ?
                <div>
                    <Nav />
                    {metaData && pathData && postModule &&
                        <PosterBody
                            metaData={metaData}
                            pathData={pathData}
                            postModule={postModule}
                            commonFiles={commonFiles}
                            queryValues={queryValues}
                            _sess={props._sess}   //redux
                            _isLogged={props._isLogged} //redux
                            pageTransMenuOpen={pageTransMenuOpen}
                            pageTransMenuAnchor={pageTransMenuAnchor}

                            _deleteMyPoster={_deleteMyPoster}
                            _handleLikeOn={_handleLikeOn}
                            _handleLikeOff={_handleLikeOff}
                            loadPost={loadPost}
                            scrollMoveToComment={scrollMoveToComment}
                            translatePage={translatePage}
                            handleTranslateMenuOpen={handleTranslateMenuOpen}
                            handleTranslateMenuClose={handleTranslateMenuClose}
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
                :
                <div className='text-center'>
                    <PageLoading />
                </div>
            }

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