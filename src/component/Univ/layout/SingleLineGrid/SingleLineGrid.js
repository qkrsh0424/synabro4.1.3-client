import React from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import { calculateTime } from "../../../../controler/calculateTime";

import {Link} from 'react-router-dom';

import ThumbUp_icon from "@material-ui/icons/ThumbUp";
import Comment_icon from "@material-ui/icons/Comment";
import Eye_icon from "@material-ui/icons/RemoveRedEye";

const Container = styled.div`
    .text-secondary{
        margin-right:3px;
    }
`;

const Header = styled.div`
    font-size: 12px;
    margin-top:8px;
    margin-bottom:8px;
`;

const GridList = styled.div`
  margin: 0;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 0;
`;

const ScrollingWrapper = styled.div`
  display: flex;
`;

const Card = styled.li`
  color: black;
  background-color: white;
  list-style: none;
  text-decoration: none;
  width: 170px;
  height: auto;
  margin: 3px;
  padding:10px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);
  transition: 0.3s;

  :hover{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 13px;
  margin-bottom:8px;
`;

const Desc = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-left: 8px;
  opacity: 0.75;
  height:40%;
  margin-bottom:35px;
  padding:5px;
  word-break:break-all;
`;

const Time = styled.span`
  font-weight: 500;
  font-size: 12px;
  opacity: 0.75;
`;

const Count = styled.span`
  font-size:12px
`;

class SingleLineGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h4>최신글</h4>
        <GridList>
          {this.props.postListData ? (
            this.props.postListData.map(rows => {
              if (rows !== null) {
                var currentDate = new Date();
                var createDate = new Date(rows.post_created);
                return (
                    <ScrollingWrapper>
                      <Link
                        to={`/univ/${rows.univ_id}/${rows.post_type}/v/${rows.post_id}`}
                      >
                      <Card>
                      <Title>{rows.post_topic.length>45?`${rows.post_topic.substring(0,45)}...`:rows.post_topic}</Title>
                        
                        {/* <Desc>{renderHTML(rows.post_desc.substring(0, 93))}</Desc> */}
                        {/* <Desc>{rows.post_desc.length > 78 ? `${rows.post_desc.substring(0, 80)}...` : `${rows.post_desc}`}</Desc> */}
                        <img src={`https://ddpf5wamlzit3.cloudfront.net/logo/peopleNo.png`} width={'150px'} height={'100px'}/>
                        <Header>
                          작성자 : {rows.user_nickname.length>6?`${rows.user_nickname.substring(0,6)}...`:rows.user_nickname}
                          <br/>
                          
                        </Header>
                        <Count>
                          <span href="#" className="text-secondary">
                            좋아요 {rows.post_like_count}
                          </span>
                          &nbsp;
                          <span href="#" className="text-secondary">
                            댓글 {rows.post_comment_count}
                          </span>
                          &nbsp;
                          <br/>
                          <div className='clearfix'>
                            <span className="text-secondary">
                              조회수 {rows.post_view_count}
                            </span>
                            <span className="text-secondary float-right">{calculateTime(currentDate, createDate)}</span>
                          </div>
                        </Count>
                          
                      </Card>
                      </Link>
                    </ScrollingWrapper>
                );
              }
            })
          ) : (
            <p>Loading.....</p>
          )}
        </GridList>
      </div>
    );
  }
}

export default SingleLineGrid;
