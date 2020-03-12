import React from 'react';

//DOM
import {Link} from 'react-router-dom';
//styled-components
import styled from 'styled-components';

//controler
import {calculateTime} from '../../controler/calculateTime';

//Core
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

//icons
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//Component

//Container
const Container = styled.div`

`;

const HeaderContainer = styled.div`
`;

const BodyContainer = styled.div`

`;
//Wrapper
const HeaderWrapper = styled.div`
    margin:8px 0;
    padding:16px;
    border:1px solid #f1f1f1;
    border-radius:15px;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
`;

const BodyWrapper = styled.div`
    margin:8px 0;

    .notReaded{
        background:rgba(147, 199, 255, 0.2);
    }
`;
//Box
const HeaderBox = styled.div`

`;

const NotificationBox = styled.div`
    padding:16px;
    border:1px solid #f1f1f1;
    border-radius:15px;
    margin-bottom:8px;
    cursor:pointer;

    &:hover{
        transform:scale(1.01);
    }
`;

const NotificationClassifyBox = styled.div`
    margin:0 0;
    padding:8px;
`;

const WriterImageBox = styled.figure`
    margin:0 0;
    padding:8px;
`;

const TimeDisplayBox = styled.div`

`;
//Element
const InfoNotiEl = styled.div`
    font-size:15px;
    font-weight:700;
`;


const WriterImageEl = styled.img`
    width:50px;
    height:50px;
    border-radius:50px;
`;

const PostTitleEl = styled.div`
    font-size:13px;
    color:gray;
`;

const TimeDisplayEl1 = styled.span`
    font-size:13px;
    color:gray;
    margin-right: 8px;
`;

const TimeDisplayEl2 = styled.span`
    font-size:13px;
    color:skyblue;
`;


const currentTime = new Date();

const NotiBody = (props) =>{
    const {
        notiList,
        notiLimitUpLoading,
        notiListLimit
    } = props;

    const {
        handleListLimitUp,
        ReloadNotificationList,
        handleChangeRouter
    } = props;
    

    return(
        <Container>
            <HeaderContainer className='container'>
                <HeaderWrapper>
                    <HeaderBox>
                        <h3>알림</h3>
                    </HeaderBox>
                </HeaderWrapper>
            </HeaderContainer>
            <BodyContainer className='container'>
                <BodyWrapper>
                    {notiList && notiList.map(rows=>{
                        // console.log(rows);
                        let notiTime = new Date(rows.noti_created);
                        return(
                            <NotificationBox 
                                className={`clearfix ${rows.noti_isReaded===0?'notReaded':''}`}
                                onClick={()=>handleChangeRouter(rows.data.postUrl)}
                            >
                                <WriterImageBox className='float-left'>
                                    <WriterImageEl src={rows.writerImage?rows.writerImage:`https://synabrodemo.s3.ap-northeast-2.amazonaws.com/logo/peopleNo.png`}/>
                                </WriterImageBox>
                                <NotificationClassifyBox className='float-left'>
                                    {rows.notiType==='postComment' &&
                                        <InfoNotiEl>
                                            <em>{rows.writerNickName}</em> 님이 <span className='text-success'>댓글</span>을 등록하였습니다.
                                        </InfoNotiEl>
                                    }
                                    {rows.notiType==='postLike' &&
                                        <InfoNotiEl>
                                            <em>{rows.writerNickName}</em> 님이 <span className='text-primary'>좋아요</span>를 눌렀습니다.
                                        </InfoNotiEl>
                                    }
                                    <PostTitleEl>포스트 : {rows.data.postTitle}</PostTitleEl>
                                    <TimeDisplayBox>
                                        <TimeDisplayEl1>작성일 : {notiTime.getFullYear()}년 {notiTime.getMonth()+1}월 {notiTime.getDate()}일</TimeDisplayEl1>
                                        <TimeDisplayEl2>{calculateTime(currentTime, notiTime)}</TimeDisplayEl2>
                                    </TimeDisplayBox>
                                </NotificationClassifyBox>
                            </NotificationBox>
                        );
                    })}
                    <div className='text-center'>
                        {notiLimitUpLoading ?
                            <CircularProgress />
                            :
                            notiList && notiList.length < notiListLimit ?
                                <div>
                                    {/* <h5>더이상 저장된 알림이 없습니다.</h5> */}
                                    <IconButton type='button' onClick={ReloadNotificationList}><RefreshIcon style={{ fontSize: '35px' }} /></IconButton>
                                </div>
                                :
                                <IconButton type='button' onClick={handleListLimitUp}><ExpandMoreIcon style={{ fontSize: '35px' }} /></IconButton>
                        }
                    </div>
                </BodyWrapper>
            </BodyContainer>
            
        </Container>
    );
}

export default NotiBody;