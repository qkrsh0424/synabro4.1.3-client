import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

//Core
import Snackbar from '@material-ui/core/Snackbar';

//Component
import FeedbackFixBody from './FeedbackFixBody';
import ImageUploadLoading from './ImageUploadLoading';
import SubmitConfirmDialog from './SubmitConfirmDialog';
import ImageViewDialog from './ImageViewDialog';
import AfterSubmitLoading from './AfterSubmitLoading';
import Nav from '../../Nav/Nav';

const FeedbackFixMain = (props) => {
    const {
        imageUploadApiAddress,
        writeApiAddress,
        getApiAddress,
        authorizationKey
    } = props;

    const [getFeedbackList, setGetFeedbackList] = useState(null);
    const [description, setDescription] = useState('');
    const [feedImageList, setFeedImageList] = useState([]);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [submitConfirmDialogOpen, setSubmitConfirmDialogOpen] = useState(false);
    const [submitLastConfirm, setSubmitLastConfirm] = useState(false);
    const [afterSubmitLoadingOpen, setAfterSubmitLoadingOpen] = useState(false);
    const [afterSubmitSnackbarOpen, setAfterSubmitSnackbarOpen] = useState(false);

    const [imageViewDialogOpen, setImageViewDialogOpen] = useState(false);
    const [imageViewData, setImageViewData] = useState(null);

    useEffect(()=>{
        getFeedbackFixListAll();
    },[])

    const getFeedbackFixListAll = async() =>{
        await setTimeout(()=>{
            Axios.get(getApiAddress,{
                headers: {
                    Authorization: authorizationKey
                }
            }).then(res=>res.data)
            .then(data=>{
                if(data.message==='success'){
                    setGetFeedbackList(data.data);
                }else{
                    alert('get undefined');
                }
            })
            .catch(err=>alert('error log'));
        },0)
        
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const _handleUploadImage = (e) => {
        e.preventDefault();
        document.getElementById('file').click();

    }

    const onImageUpload = async (e) => {
        if (e.target.files.length !== 0) {
            console.log(e.target.files)
            setImageUploadLoading(true);
            let filesize = e.target.files.length;
            const formData = new FormData();

            for (let i = 0; i < filesize; i++) {
                let filedata = e.target.files[i];
                formData.append(`file`, filedata);
            }

            await Axios.post(imageUploadApiAddress, formData, {
                // onUploadProgress: progressEvent => {
                //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                // }
                headers: {
                    Authorization: authorizationKey
                }
            })
                .then(res => res.data)
                .then(data => {
                    if (data.message === 'successOne') {
                        onAddImage(data);
                        setImageUploadLoading(false);
                    } else if (data.message === 'successMultiple') {

                        // for (let i = 0; i < data.dataLength; i++) {
                        onAddImage(data);
                        // }
                        setImageUploadLoading(false);
                    } else if (data.message === 'failure') {
                        setImageUploadLoading(false);
                        alert('서버가 좋지 않습니다. code: (IU:1)');
                    } else {
                        setImageUploadLoading(false);
                        alert('예상치 못한 오류가 발생했습니다. code: (IU:2)');
                    }
                }).catch(err => {
                    setImageUploadLoading(false);
                    alert('연결 시간이 초과 되었습니다. 네트워크를 다시 확인해 주십시오.');
                })
        } else {
            return;
        }

    }

    const onAddImage = async (imgUrl) => {
        document.getElementById('file').value = '';
        const originImageList = [...feedImageList];
        if (imgUrl.message === 'successOne') {
            originImageList.push({ id: uuid(), imgUrl: imgUrl.url })
        } else {
            for (let i = 0; i < imgUrl.url.length; i++) {
                originImageList.push({ id: uuid(), imgUrl: imgUrl.url[i] })
            }
        }

        // const img = {
        //     imgUrl: imgUrl
        // }
        // originImageList.push(img);
        await setTimeout(() => setFeedImageList(originImageList), 0)

    }

    const _handleDeleteImage = async (id) => {
        setFeedImageList(feedImageList.filter(img => img.id !== id))
    }

    const _checkSubmitFeedback = async (e) => {
        e.preventDefault();
        handleClickDialogOpen();
    }

    const handleClickDialogOpen = () => {
        setSubmitConfirmDialogOpen(true);
    }

    const handleDialogClose = () => {
        setSubmitConfirmDialogOpen(false);
    }

    const _handleSubmitFeedback = async () => {
        if (props._isLogged) {

            await setAfterSubmitLoadingOpen(true);
            await setTimeout(()=>{
                Axios.post(writeApiAddress, {
                    usid: props._sess,
                    description: description,
                    feedImageList: JSON.stringify(feedImageList)
                }, {
                    headers: {
                        Authorization: authorizationKey
                    }
                })
                .then(res => res.data)
                .then(data => {
                    if(data.message==='success'){
                        handleDialogClose();
                        setDescription('');
                        setFeedImageList([]);
                        getFeedbackFixListAll();
                        setAfterSubmitLoadingOpen(false);
                        setAfterSubmitSnackbarOpen(true);
    
                    }else{
                        alert('submit undefined');
                    }
                });
            },0);
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }

    }

    const handleImageViewDialogOpen = (image) => {
        setImageViewDialogOpen(true);
        setImageViewData(image);
    }

    const handleImageViewDialogClose = async() => {
        await setImageViewDialogOpen(false);
        await setTimeout(()=>{
            setImageViewData(null);
        },10);
    }

    const afterSubmitSnackbarClose = async() =>{
        setAfterSubmitSnackbarOpen(false);
    }

    return (
        <>
            <Nav/>
            {/* 이미지 업로드시 이미지가 저장되는 동안의 로딩 */}
            {imageUploadLoading ?
                <ImageUploadLoading
                    imageUploadLoading={imageUploadLoading}
                /> : ""}

            {/* 모듈의 전체적인 바디라인 */}
            <FeedbackFixBody
                description={description}
                feedImageList={feedImageList}
                getFeedbackList = {getFeedbackList}

                handleChangeDescription={handleChangeDescription}
                _handleUploadImage={_handleUploadImage}
                onImageUpload={onImageUpload}
                _handleDeleteImage={_handleDeleteImage}
                _checkSubmitFeedback={_checkSubmitFeedback}
                handleImageViewDialogOpen={handleImageViewDialogOpen}
            />

            {/* 개선사항 등록을 누른후 마지막 서밋 체크 agree시 _handleSubmitFeedback() 불러온다 */}
            <SubmitConfirmDialog
                open={submitConfirmDialogOpen}

                handleClickDialogOpen={handleClickDialogOpen}
                handleDialogClose={handleDialogClose}
                _handleSubmitFeedback={_handleSubmitFeedback}
            />

            {/* 개선사항 리스트에서 이미지를 클릭하여 전체크기 이미지 미리보기 */}
            <ImageViewDialog
                open = {imageViewDialogOpen}
                imageViewData = {imageViewData}

                handleImageViewDialogOpen={handleImageViewDialogOpen}
                handleImageViewDialogClose={handleImageViewDialogClose}
            />

            {/* 작성한 글을 서밋한후 서버에 저장되는 시간동안 대기하는 로딩 */}
            {afterSubmitLoadingOpen && <AfterSubmitLoading/>}

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={2000}
                // severity="success"
                open={afterSubmitSnackbarOpen}
                onClose={afterSubmitSnackbarClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">개선사항이 등록되었습니다. 감사합니다.</span>}
            >
            </Snackbar>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
    }
}

export default connect(mapStateToProps)(FeedbackFixMain);