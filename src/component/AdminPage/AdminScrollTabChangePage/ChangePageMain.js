import React,{useState, useEffect} from 'react';

import Axios from 'axios';
import {serverUrl} from '../../../config/serverUrl';
import AuthKey from '../../../config/AuthorizationKey';

//Core
import Snackbar from '@material-ui/core/Snackbar';

//Component
import ChangePageBody from './ChangePageBody';
import ImageUploadLoading from './ImageUploadLoading';

const ChangePageMain = (props) =>{
    const [groupSetting, setGroupSetting] = useState(null);
    const [changeImageType, setChangeImageType] = useState(null);
    const [imgUploadLoading, setImgUploadLoading] = useState(false);
    const [introduceInputOpen, setIntroduceInputOpen] = useState(false);
    const [openIconNImageNoneSnackbar, setOpenIconNImageNoneSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(()=>{
        handleGetGroup();
    },[]);

    const handleGetGroup = () =>{
        setGroupSetting(props.group);
    }

    const ImageButtonClick =(type,e) =>{
        e.preventDefault();
        setChangeImageType(type);
        document.getElementById('file_image').click();
    }

    const onImageUpload = async(e) =>{
        
        const formData = new FormData();
        if(changeImageType==='shb_image'){
            formData.append('imageTarget','pageMainImage');
        }else if(changeImageType==='shb_icon'){
            formData.append('imageTarget','categoryIcons');
        }else{
            return;
        }
        
        formData.append(`file`, e.target.files[0]);
        // console.log(e.target.files.length);
        if(e.target.files.length===1){
            setImgUploadLoading(true);
            await Axios.post(`${serverUrl}/api/uploadimg/draft-oss`, formData, {
                // onUploadProgress: progressEvent => {
                //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                // }
                headers: {
                    Authorization: 'Bearer ' + AuthKey
                }
            })
            .then(res=>res.data)
            .then(data=>{
                // console.log(data);
                if(data.message==='successOne' && changeImageType==='shb_image'){
                    onChangeMainImage(data.url);
                    setImgUploadLoading(false);
                }else if(data.message==='successOne' && changeImageType==='shb_icon'){
                    onChangeIconImage(data.url);
                    setImgUploadLoading(false);
                }
                
            })
        }else{
            document.getElementById('file_image').value = '';
            setChangeImageType(null);
        }
    }

    const onChangeMainImage = (imgUrl) =>{
        document.getElementById('file_image').value = '';
        setChangeImageType(null);
        setGroupSetting({
            ...groupSetting,
            shb_image_url:imgUrl
        });
        setSnackbarMessage('페이지 아이콘이 등록되었습니다.')
        setOpenIconNImageNoneSnackbar(true);
    }

    const onChangeIconImage = (imgUrl) =>{
        document.getElementById('file_image').value = '';
        setChangeImageType(null);
        setGroupSetting({
            ...groupSetting,
            shb_icon_url:imgUrl
        });
        setSnackbarMessage('페이지 이미지가 등록되었습니다.')
        setOpenIconNImageNoneSnackbar(true);
    }

    const handleOpenIntroduceInput = () =>{
        setIntroduceInputOpen(!introduceInputOpen);
    }

    const handleIntroduceValueChange = (e) =>{
        setGroupSetting({...groupSetting, shb_introduce:e.target.value});
    }

    const onChangeIconNImageNone = (type) =>{
        if(type==='icon'){
            setSnackbarMessage('페이지 아이콘이 삭제되었습니다.')
            setOpenIconNImageNoneSnackbar(true);
            setGroupSetting({...groupSetting,shb_icon_url:null})
        }else if(type==='image'){
            setSnackbarMessage('페이지 이미지가 삭제되었습니다.')
            setOpenIconNImageNoneSnackbar(true);
            setGroupSetting({...groupSetting,shb_image_url:null})
        }else{
            return;
        }
    }

    const handleOnUpdate = () => {
        Axios.post(`${serverUrl}/api/auth/admin/pageInfo/update`,{
            group:groupSetting
        },{
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        }).then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                localStorage.setItem('tab_value',4);
                alert('수정된 데이터가 저장되었습니다.');
                window.location.reload();
            }else{
                alert('undefined');
            }
        })
    }

    const handleCloseIconNImageNoneSnackbar = () =>{
        setOpenIconNImageNoneSnackbar(false);
    }

    return(
        <>
            {groupSetting && 
                <ChangePageBody
                    group = {groupSetting}
                    introduceInputOpen={introduceInputOpen}

                    ImageButtonClick={ImageButtonClick}
                    onImageUpload={onImageUpload}
                    handleOpenIntroduceInput={handleOpenIntroduceInput}
                    handleIntroduceValueChange={handleIntroduceValueChange}
                    onChangeIconNImageNone={onChangeIconNImageNone}
                    handleOnUpdate={handleOnUpdate}
                />
            }
            {imgUploadLoading && 
                <ImageUploadLoading
                    imgUploadLoading={imgUploadLoading}
                />
            }
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openIconNImageNoneSnackbar}
                onClose={handleCloseIconNImageNoneSnackbar}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{snackbarMessage}</span>}
            />
            
        </>
    );
}

export default ChangePageMain;
