import React from 'react';
//style-components
import styled from 'styled-components';

//serverUrl
import { awsImageURL } from '../../../config/awsurl';

//handler
import {calculateTime} from '../../../controler/calculateTime';

//Core
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Container
const Container = styled.div`

`;

const CommentHeader = styled.div`
    h4 {
        display: inline-block;
        margin-right: 16px;
    }
`;

const AddCommentBox = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;

  form {
    flex: 1;
    margin-left: 5px;
    width: 100%;
    resize: none;
    overflow-y: hidden; /* prevents scroll bar flash */
    padding: 0.1em; /* prevents text jump on Enter keypress */
    padding-bottom: 0.2em;
    line-height: 1.6;
    text-align: right;
  }

  .user-image {
    vertical-align: middle;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .input {
    
    display: inline-block;
    height: 60px;
  width: 100%;
    margin: 0;
    margin-bottom:10px;
    padding-bottom:-100px;
  }
  .input:after {
    display: block;
    content: "";
    border-bottom: 3px solid #6e6e6e;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  .input:hover:after {
    
    transform: scaleX(1);
  }
  
  .button{
    margin-top:2px;
    
  }
`;

const Textarea = styled.textarea`
  display: inline-block;
  height: 60px;
  width: 100%;
  margin: 0;
  border: none;
  transition: all 300ms;

  &::placeholder {
    -webkit-transform: translateY(20px);
    transform: translateY(20px);
    -webkit-transition: 1s;
    transition: 0.5s;
  }
  &:focus{
    outline:none;
  }
  &:hover {
    &::placeholder {
      color: #bdc3c7;
      height: 160px;
      position: relative;
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
  }
`;

const CommentListWrapper = styled.div`

`;

const CommentListInner = styled.div`
display: flex;
margin: 8px 0;
width: auto;

.user-image {
    vertical-align: middle;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    flex-shrink: 0;
}

.user-name {
    font-weight: 600;
    margin-bottom: 4px;
}
.comment-actions {
    margin-top: 4px;
    display:flex;
    font-size: 12px;
    
    button {
        margin-left: 8px;
    }
}
.action {
  display:flex;
  margin-right:20px;
}
.like{
  margin-right:3px;
}
.commentSpace{
    white-space: pre-wrap;
}
  
.CommonPosterPart .Header-bar{
    font-weight: 700;
    font-size: 18px;
}
`

const CommentListBox = styled.div`
    margin-left: 20px;
`;

const Time = styled.span`
font-weight:500;
font-size: 12px;
margin-left: 8px;
opacity:0.75;

`;
const CommentBody = (props) => {
    //state
    const {
        commentInputData,
        commentListData
    } = props
    //controller
    const {
        handleCommentInputDataChange,
        handleCommentSubmit,
        handleDelComment
    } = props;
    return (
        <Container>
            {/* {console.log(commentInputData)} */}
            <CommentHeader>
                <h4>댓글</h4>
            </CommentHeader>
            <AddCommentBox>
                <img
                    className="user-image"
                    src={`${awsImageURL}/logo/peopleNo.png`}
                    circular="true"
                />
                <form
                    onSubmit={handleCommentSubmit}
                >
                    <div className="input">
                        <Textarea
                            placeholder="댓글을 입력해주세요..."
                            type="text"
                            name="commentData"
                            value={commentInputData}
                            onChange={handleCommentInputDataChange}
                            required
                        />
                    </div>
                    <Button 
                        className="mt-2" 
                        type="submit" 
                        color={'primary'}
                        variant={'contained'}
                    >
                        댓글 입력
                    </Button>
                </form>
            </AddCommentBox>
            <hr/>
            <CommentListWrapper id='comment_part'>
                {commentListData ? commentListData.map(rows => {
                    var currentDate = new Date();
                    var createDate = new Date(rows.cmt_created);
                    return (
                        <CommentListInner>
                            <img
                                className='user-image'
                                src={`${awsImageURL}/logo/peopleNo.png`}
                                circular="true"
                            />
                            <CommentListBox>
                                <div className='user-name'>{rows.user_nickname.substring(0, 8)}
                                    <Time>{calculateTime(currentDate, createDate)}</Time>


                                </div>
                                <span className='commentSpace'>
                                    {rows.cmt_desc}
                                </span>
                                <div className='comment-actions'>
                                    <div classname="reply">
                                        <Button variant={'outlined'} color={'primary'} disabled>답글달기</Button>
                                    </div>
                                    {rows.mycomment ?
                                        <Button 
                                            variant={'outlined'} 
                                            color={'secondary'}
                                            onClick={()=>handleDelComment(rows.cmt_id)}
                                        >
                                            삭제
                                        </Button>
                                        :
                                        ""
                                    }
                                </div>
                            </CommentListBox>
                        </CommentListInner>

                    );
                })
                    :
                    <div className='text-center'>
                        <CircularProgress/>
                    </div>
                }

            </CommentListWrapper>
        </Container>
    );
}
export default CommentBody;