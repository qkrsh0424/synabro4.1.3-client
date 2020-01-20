import React, { useEffect } from 'react';
import styled from 'styled-components';

//Core
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Component
import UploadImageList from './UploadImageList';
import FeedbackFixList from './FeedbackFixList';

const Container = styled.div`

`;

const Header = styled.div`
    
`;

const HeaderWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin-top:8px;
    padding:15px;
`;

const Body = styled.div`

`
const BodyWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
    margin-top:8px;
    padding:15px;
`

const SubmitButton = styled(Button)`
    float:right;
`;

const ImageUploadBox = styled.div`
    border:1px solid #f1f1f1;
    border-radius:15px;
    padding: 8px;
    margin:8px 0;

    .uploadedImage{
        width:90px;
        height:90px
        border:1px solid #f1f1f1;
        margin:2px;
    }

    .uploadedImage:hover{
        border:1px solid blue;
    }
`;

const TextFieldWrapper = styled.div`
    padding:8px;
    border-radius:15px;
    margin: 8px 0;
    border:1px solid #f1f1f1;
`

const Body2 = styled.div`

`;
const FeedbackFixBody = (props) => {
    const { 
        description,
        feedImageList,
        getFeedbackList,
    } = props;

    const { 
        handleChangeDescription,
        _handleUploadImage,
        onImageUpload,
        _handleDeleteImage,
        _checkSubmitFeedback,
        handleImageViewDialogOpen
    } = props;

    return (
        <Container>
            <Header className='container'>
                <HeaderWrapper>
                    <h4>개선이 필요해요!</h4>
                </HeaderWrapper>
            </Header>
            <Body className='container'>
                <BodyWrapper>
                    <form className='clearfix' onSubmit={_checkSubmitFeedback}>
                        <ImageUploadBox>
                            <UploadImageList
                                feedImageList = {feedImageList}

                                _handleUploadImage = {_handleUploadImage}
                                onImageUpload={onImageUpload}
                                _handleDeleteImage={_handleDeleteImage}
                            />
                        </ImageUploadBox>
                        <TextFieldWrapper>
                            <TextField
                                id="standard-multiline-static"
                                label="개선사항 내용"
                                multiline
                                value={description}
                                onChange={handleChangeDescription}
                                placeholder="개선사항에 대한 내용을 작성해 주세요! 여러분의 의견은 상해봄에 큰 도움이 됩니다."
                                fullWidth
                                required
                            />
                        </TextFieldWrapper>
                        <SubmitButton 
                            variant="outlined" 
                            color='primary' 
                            type='submit'
                        >개선사항 등록하기</SubmitButton>
                    </form>
                </BodyWrapper>
            </Body>
            <Body2 className='container'>
                <BodyWrapper>
                    <h5>등록된 개선사항</h5>
                    {getFeedbackList ? 
                        <FeedbackFixList
                            getFeedbackList={getFeedbackList}

                            handleImageViewDialogOpen={handleImageViewDialogOpen}
                        />
                        :
                        <div className='text-center'>
                            <CircularProgress/>
                        </div>
                    }
                    
                </BodyWrapper>
            </Body2>
        </Container>
    );
}

export default FeedbackFixBody;