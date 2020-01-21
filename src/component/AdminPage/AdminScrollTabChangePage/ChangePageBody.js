import React,{useState, useEffect} from 'react';
import styled from 'styled-components';

// Core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

const Container = styled.div`

`;

//Wrapper
const PageTitleWrapper = styled.div`
    margin:10px 0;
    border: 1px dotted #f0f0f0;
    padding:8px;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
    border-radius: 20px;

    .title{
        font-weight:bold;
        font-size:20px;
        padding:15px;
    }

    p{
        color:red;
        font-size:12px;
    }
`;

const PageIntroduceWrapper = styled.div`
    margin:10px 0;
    border: 1px dotted #f0f0f0;
    padding:8px;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
    border-radius: 20px;

    p{
        color:#a0a0a0;
        font-size:12px;
    }
`;

const PageIconWrapper = styled.div`
    margin:10px 0;
    border: 1px dotted #f0f0f0;
    padding:8px;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
    border-radius: 20px;

    img{
        width:200px;
        height:200px;
        border:1px solid #f0f0f0;

        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;
    }

    img:hover{
        transform:scale(1.03);
    }
    img:active {
        border:3px solid #b5d19b;
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
    }

    .noIcon{
        width:100px;
        height:100px;
        border:1px solid #f0f0f0;
        cursor:pointer;
        background:gray;
        text-align:center;
    }

    .noIcon:hover{
        transform:scale(1.03);
    }
    .noIcon:active {
        border:3px solid #b5d19b;
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
    }

    p{
        color:#a0a0a0;
        font-size:12px;
    }
`;

const PageMainImageWrapper = styled.div`

    margin:10px 0;
    border: 1px dotted #f0f0f0;
    padding:8px;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
    border-radius: 20px;

    img{
        background:white;
        width:100%;
        height:32vw;
        object-fit:contain;
        border:1px solid #f0f0f0;

        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;
    }
    img:hover{
        transform:scale(1.03);
    }
    img:active {
        border:3px solid #b5d19b;
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
    }

    .noImage { 
        background:gray;
        width:100%;
        height:32vw;
        object-fit:contain;
        border:1px solid #f0f0f0;
        text-align: center;
        font-size: 18px;

        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        text-decoration: none;
        overflow: hidden;
        cursor: pointer;
    }

    .noImage:hover{
        transform:scale(1.03);
    }
    .noImage:active {
        border:3px solid #b5d19b;
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s
    }

    p{
        color:#a0a0a0;
        font-size:12px;
    }
`;

const PageSubmitWrapper = styled.div`
    margin:10px 0;
    // border: 1px dotted #f0f0f0;
    padding:8px;
`

// Box
const IntroduceValueBox = styled.div`
    background: #f3d18e;
    border-radius:15px;
    padding:8px;
    cursor:pointer;
    white-space: pre-wrap;

    .emptyIntroduce{
        color:#909090;
    }
`;

const IntroduceInputBox = styled.div`
    padding:8px;
    margin: 8px 0;
`;
const ChangePageBody = (props) =>{
    const {
        group,
        introduceInputOpen
    } = props;

    const {
        onImageUpload,
        ImageButtonClick,
        handleOpenIntroduceInput,
        handleIntroduceValueChange,
        onChangeIconNImageNone,
        handleOnUpdate
    } = props;

    return(
        <Container>
            <input
                type='file'
                name='file_image'
                id='file_image'
                className='btn btn-secondary'
                onChange={onImageUpload}
                hidden
                accept="image/*"
            />
            <PageTitleWrapper>
                <h4>1. My 페이지 네임</h4>
                <p>*현재는 페이지 네임 수정을 지원하지 않습니다. 페이지 네임 수정은 고객센터로 직접 연락주시기 바랍니다.</p>
                <span className='title'>{group.shb_name}</span>
            </PageTitleWrapper>
            <PageIntroduceWrapper>
                <h4>2. My 페이지 소개글</h4>
                <p>*소개글 클릭하여 변경</p>
                
                {introduceInputOpen ?
                    <IntroduceInputBox>
                        <TextField
                            id="outlined-multiline-static"
                            label="소개글 편집"
                            multiline
                            fullWidth
                            value={group.shb_introduce}
                            onChange={handleIntroduceValueChange}
                            variant="outlined"
                            style={{marginBottom:'8px'}}
                        />
                        <Button type='button' onClick={handleOpenIntroduceInput} variant='outlined' color='primary'>닫기</Button>
                    </IntroduceInputBox>
                :
                <IntroduceValueBox
                    onClick={handleOpenIntroduceInput}
                    
                >
                    {group.shb_introduce===''?
                        <span className='emptyIntroduce'>현재 소개글이 비어있습니다. 클릭해서 소개글을 작성해 보세요!</span>
                        :
                        group.shb_introduce
                    }
                </IntroduceValueBox>
                }
            </PageIntroduceWrapper>
            <PageIconWrapper>
                <h4>3. My 페이지 아이콘</h4>
                <p>*이미지 가로1 세로1 1:1 비율, 이미지 클릭하여 변경</p>
                {group.shb_icon_url?
                    <div>
                        <div className='mt-2 mb-2'>
                            <Button 
                                type='button' 
                                variant={'outlined'} 
                                color={'secondary'}
                                onClick={()=>onChangeIconNImageNone('icon')}
                            >아이콘 초기화</Button>
                        </div>
                        <img 
                            src={group.shb_icon_url}
                            onClick={(e)=>ImageButtonClick('shb_icon',e)}
                        ></img>
                    </div>
                :
                    <div 
                        className='noIcon'
                        onClick={(e)=>ImageButtonClick('shb_icon',e)}
                    >
                        아이콘 없음
                    </div>
                }
                
            </PageIconWrapper>
            <PageMainImageWrapper>
                <h4>4. My 페이지 이미지</h4>
                <p>*이미지 가로3 세로1 3:1 비율, 이미지 클릭하여 변경</p>
                
                {group.shb_image_url?
                    <div>
                        <div className='mt-2 mb-2'>
                            <Button 
                                type='button' 
                                variant={'outlined'} 
                                color={'secondary'}
                                onClick={()=>onChangeIconNImageNone('image')}
                            >이미지 초기화</Button>
                        </div>
                        <img 
                            src={group.shb_image_url}
                            onClick={(e)=>ImageButtonClick('shb_image',e)}
                        ></img>
                    </div>
                    :
                    <div 
                        className='noImage'
                        onClick={(e)=>ImageButtonClick('shb_image',e)}
                    >
                        등록된 이미지가 없습니다.
                    </div>
                }
                
            </PageMainImageWrapper>
            <PageSubmitWrapper className='clearfix'>
                <div className='text-right text-danger'>*변경사항을 저장하기 전까지는 기존의 데이터가 유지됩니다.</div>
                <Button 
                    type='button' 
                    variant="contained" 
                    color={'primary'} 
                    className='float-right'
                    onClick={handleOnUpdate}
                >변경사항 저장하기</Button>
            </PageSubmitWrapper>
        </Container>
    );
}

export default ChangePageBody;
