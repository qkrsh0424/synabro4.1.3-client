import React from "react";
import styled from "styled-components";
// import Loader from "../Loader";
// import PostList from "../Univ/layout/PostLists";
import PostList from './PostLists';
import { calculateTime } from "./handler";
import Message from "./message";

// import {
//   Notification_icon,
//   ViewList_icon,
//   ViewModule_icon,
//   ThumbUp_icon,
//   Comment_icon,
//   Eye_icon,
// } from '../../UiIcons';

// Search 시작
//
//

const Container = styled.div`
  padding: 0px 20px;
  width:100%;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  -webkit-transform: translateY(23px);
  transform: translateY(23px);
`;


// const {noticeIcon} = [];
// const {calculateTime} = "";
// const {postListIndex} = null;
const MainsearchPresenter = ({
  postVals,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm
}) => (
    
  <Container>
    <Form onSubmit={handleSubmit}>
                  <Input
                    placeholder="정보를 검색하세요."
                    value={searchTerm}
                    onChange={updateTerm}
                  />
                </Form>
    {loading ? (
      <div className="loader"></div>
    ) : (
      <div>
      
        {postVals && postVals.length > 0 && (
          // console.log(postVals),
          <PostList
            key="list"
            // noticeIcon={noticeIcon}
            post={postVals}
            calcTime={calculateTime}
            // postListIndex = {postListIndex}
          />
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {postVals && postVals.length === 0 && (
          <Message text={`Nothing Found For ${searchTerm}`} color="#95a5a6" />
        )}
      </div>
    )}
  </Container>
);

export default MainsearchPresenter;

//
//
//Search 끝
