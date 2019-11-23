import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { serverUrl } from '../../config/serverUrl';


const _fileUploadButtonClick = (e) =>{
    e.preventDefault();
    document.getElementById('commonfile').click();
}

const FileUploadButton = styled.button`
    border:1px solid #afafaf;
`;
const UploadListBox = styled.div`
    border:1px solid #afafaf;
    padding:5px;
`;

export default function FileUploadPart(props){
    const {commonFiles,_fileUploaded,_fileDeleteIndex} = props;
    return(
        <div>
            <input 
                type='file'
                name='commonfile'
                id='commonfile'
                className='btn btn-secondary'
                onChange={_fileUploaded}
                hidden
                multiple
            />
            <FileUploadButton 
                className='btn mb-2'
                type='button'
                onClick={_fileUploadButtonClick}
            >
                파일 업로드
            </FileUploadButton>
            {commonFiles && commonFiles[0] && 
                <UploadListBox>
                        {commonFiles.map((rows,index)=>{
                            return(
                                <div className='clearfix p-2'>
                                    <a href={rows.url}
                                        target='_blank'
                                        download
                                    >{rows.name}</a>
                                    <span> | </span>
                                    <button type='button' className='btn btn-sm btn-danger' onClick={()=>_fileDeleteIndex(rows)}>삭제</button>
                                </div>
                            );
                        })}
                </UploadListBox>
            }
            
        </div>
    );
}