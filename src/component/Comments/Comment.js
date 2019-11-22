import React from 'react';
import styled from "styled-components";
import { calculateTime } from "../../controler/calculateTime";
import DelComment from './DelComment';

//URL
import {awsImageURL} from '../../config/awsurl';

const CommentBar = styled.div` 
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
`;

const CommentBox = styled.div`
    margin-left: 20px;

`;

const Time = styled.span`
font-weight:500;
font-size: 12px;
margin-left: 8px;
opacity:0.75;

`;

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.comment ? this.props.comment.map((rows, index) => {
          // console.log(rows)
          if (rows !== null) {
            var currentDate = new Date();
            var createDate = new Date(rows.cmt_created);
            return (
              <div>
                <CommentBar>
                  <img
                    className='user-image'
                    src={`${awsImageURL}/logo/peopleNo.png`}
                    circular="true"
                  />
                  <CommentBox>
                    <div className='user-name'>{rows.user_nickname.substring(0, 8)}
                      <Time>{calculateTime(currentDate, createDate)}</Time>
                      

                    </div>
                    <span className='commentSpace'>
                      {rows.cmt_desc}
                    </span>
                    <div className='comment-actions'>
                      <div classname="reply">
                        <button className='btn btn-outline-success' >답글달기</button>
                      </div>
                      {rows.mycomment ?
                        <DelComment
                          className='float-right'
                          _DelComment={this.props._DelComment}
                          post_id = {rows.post_id}
                          head_type={this.props.head_type}
                          cmt_id={rows.cmt_id}
                        /> :
                        ""
                      }
                    </div>
                  </CommentBox>
                </CommentBar>
                <hr/>
              </div>
            )
          }
        }
        ) : <p>Loading...</p>}
      </div>
    );

  }

}

export default Comment;