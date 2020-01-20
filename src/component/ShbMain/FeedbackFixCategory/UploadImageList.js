import React,{useEffect} from 'react';
import styled from 'styled-components';

//Core
import Tooltip from '@material-ui/core/Tooltip';
const ImageListBox = styled.div`

`;
const ImageListContainer = styled.div`
    border:1px solid black;
    min-height:100px;
    height:auto;
    width:auto;
    overflow-x:scroll;
    padding:3px;
`;

const UploadButton = styled.button`
    height:100px;
    width:100px;
    background:none;
    margin:8px 0;
`;
export default function UploadImageList(props) {
    const { 
        feedImageList
    } = props;

    const { 
        _handleUploadImage,
        onImageUpload,
        _handleDeleteImage
     } = props;
    return (
        <ImageListBox>
            <input
                type='file'
                name='file'
                id='file'
                className='btn btn-secondary'
                onChange={onImageUpload}
                hidden
                multiple
                accept="image/*"
            />
                {feedImageList.map((image,index)=>{
                    return(
                        <img 
                            src={image.imgUrl} 
                            className='uploadedImage'
                            onClick={()=>_handleDeleteImage(image.id)}
                            title={image.id}
                        ></img>
                        
                    );
                })}

            <UploadButton type='button' onClick={_handleUploadImage}>+</UploadButton>
        </ImageListBox>
    );
}