import React from 'react';

//DOM
import {Link} from 'react-router-dom';
//styled
import styled from 'styled-components';

//Core
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

//Icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

const Container = styled.div`
    border: 1px solid #f1f1f1;
    border-radius: 15px;
`;


// Header
const HeaderContainer = styled.div`
    // border-bottom: 1px solid #f1f1f1;
    padding:8px;
    margin:8px;
`;


const AvatarEl = styled.img`
    width: 40px;
    height: 40px;
    display: flex;
    overflow: hidden;
    position: relative;
    font-size: 1.25rem;
    align-items: center;
    flex-shrink: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    user-select: none;
    border-radius: 50%;
    justify-content: center;
`;

const BasicInfoBox = styled.div`
    padding:0 15px;
`;

const UserNicknameEl = styled.div`

`;

const DateEl = styled.div`

`;

// ImagePart
const ImagePartContainer = styled.div`
`;
const ImagePartWrapper = styled.figure`

`;

const ImageEl = styled.img`
    width:100%;
    object-fit:cover;
    &:hover{
        cursor:pointer;
    }
`;

// Body Part
const BodyContainer = styled.div`
    // border-top: 1px solid #f1f1f1;
    padding:8px;
    margin:8px;
`;

const BodyWrapper = styled(Link)`
    &:hover{
        cursor:pointer;
        // text-decoration: underline;
    }
    color:black !important;
`;

const TitleBox = styled.div`
    border-left: 5px solid gray;
    border-radius:15px;
    padding-left: 3px;
`;
const DescriptionBox = styled.div`
    padding:8px;
`;
const OnePost = () => {
    return(
        <Container>
            <HeaderContainer className='clearfix'>
                <AvatarEl 
                    src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/logo/peopleNo.png" 
                    className='float-left'
                />
                <BasicInfoBox className='float-left'>
                    <UserNicknameEl>
                        컴맹
                    </UserNicknameEl>
                    <DateEl>1일전</DateEl>
                </BasicInfoBox>
                <IconButton className='float-right'>
                    <MoreVertIcon/>
                </IconButton>
            </HeaderContainer>
            <ImagePartContainer>
                {/* <ImagePartWrapper>
                    <ImageEl 
                        src='https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/catalog-flaticon.png'
                        height={window.innerWidth<900?'300px':'600px'}
                    />
                </ImagePartWrapper> */}
            </ImagePartContainer>
            <hr/>
            <BodyContainer>
                <BodyWrapper>
                    <TitleBox>
                        <h5>안녕하세여ㅛ </h5>
                    </TitleBox>
                    <DescriptionBox>
                        안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고안녕하세요 하지만 어쩌고 저쩌고
                    </DescriptionBox>
                </BodyWrapper>
            </BodyContainer>
        </Container>
    );
}

export default OnePost;