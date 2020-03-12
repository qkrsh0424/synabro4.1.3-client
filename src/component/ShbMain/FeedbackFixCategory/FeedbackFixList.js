import React from 'react';
import styled from 'styled-components';

//CalcTime Function
import { calculateTime } from "../../../controler/calculateTime";

// Core
import Button from '@material-ui/core/Button';

const Container = styled.div`
    
`;

const ItemWrapper = styled.div`
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: 0.25rem;
    border-radius:15px;
    padding: 8px;
    margin: 8px 0;
`;

const StatusPart = styled.div`
    .smallText{
        font-size: 12px;
        color: rgba(0,0,0,0.325);
    }
`

const ImageListPart = styled.div`
    img{
        margin:2px 4px;
        border:1px solid rgba(0,0,0,0.125);
        object-fit: scale-down;
    }
    img:hover{
        border:2px solid #d0c903;
    }

    
`

const DescriptionPart = styled.div`
    white-space: pre-wrap;
    margin:8px 0;
    padding: 8px;
    background: #cce7f3;
    border-radius: 15px;
`

const DebatePartWrapper = styled.div`
    border:1px solid gray;
    padding:8px;
`;

const DebatePartBox = styled.div`

`;
const _proccessStatus = (stn) =>{
    switch(stn){
        case 0: 
            return <span className='text-warning'>검토중</span>;
            break;
        case 1: 
            return <span className='text-primary'>진행중</span>;
            break;
        case 2: 
            return <span className='text-success'>완료됨</span>;
            break;
        case 3:
            return <span className='text-danger'>삭제됨</span>;
            break;
        default:
            return <span className='text-warning'>검토중</span>;
            break;
    }
}

const getFormatDate = (dat) =>{
    var date = new Date(dat);
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '년 ' + month + '월 ' + day + '일';
}

const FeedbackFixList = (props) =>{
    const {
        getFeedbackList,
        debatePartOpen,
        debateSelected
    } = props;

    const {
        handleImageViewDialogOpen,
        handleDebatePartOpen
    } = props;
    return(
        <Container>
            {getFeedbackList && getFeedbackList.map((item, index)=>{
                var currentDate = new Date();

                return(
                    <ItemWrapper>
                        <StatusPart>
                            <span className='text-primary'>{index+1}</span> 진행 상태 : {_proccessStatus(item.fdState)}
                            <br/>
                            <span className='smallText'>작성일 : {getFormatDate(item.fdCreated)} | </span><span className='smallText'>마지막 업데이트 : {calculateTime(currentDate,new Date(item.fdUpdated))}</span> 
                            <br/>
                            <span className='smallText'>작성자 닉네임: {item.fdUserNickname}</span>
                        </StatusPart>
                        
                        <ImageListPart>
                            {item.fdImageList && item.fdImageList.map((image,imageIndex)=>{
                                return(
                                    <img src={image.imgUrl} width='70px' height='70px' onClick={()=>handleImageViewDialogOpen(image)}></img>
                                )
                                
                            })}
                        </ImageListPart>
                        
                        <DescriptionPart>
                            {item.fdDesc}
                        </DescriptionPart>
                        {debateSelected===item.fdId && debatePartOpen &&
                            <DebatePartWrapper>
                                준비중입니다.
                            </DebatePartWrapper>
                        }
                        
                        {debatePartOpen ?
                            <Button 
                                type='button'
                                onClick={()=>handleDebatePartOpen(item)}
                            >
                                토론 닫기
                            </Button>
                            :
                            
                            <Button 
                                type='button'
                                onClick={()=>handleDebatePartOpen(item)}
                            >
                                토론 보기
                            </Button>
                        }

                    </ItemWrapper>
                );
            })}
            
        </Container>
    );
}

export default FeedbackFixList;