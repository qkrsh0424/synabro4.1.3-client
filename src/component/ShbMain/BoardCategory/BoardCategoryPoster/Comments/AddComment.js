import React from "react";
import styled from "styled-components";
import { __sendComment } from "../../../../../handler/cliApi/CommentApi";
//URL
import {awsImageURL} from '../../../../../config/awsurl';
const AddCommentBar = styled.div`
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
const Input = styled.input`
  display: inline-block;
  height: 60px;
  width: 100%;
  margin: 0;
  border: none;
  transition: all 300ms;

  &::placeholder {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
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
      -webkit-transform: translateY(-20px);
      transform: translateY(-20px);
    }
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

export default class AddComment extends React.Component {

  render() {
    return (
      <div>
        <AddCommentBar>
          <img
            className="user-image"
            src={`${awsImageURL}/logo/peopleNo.png`}
            circular="true"
          />
          <form onSubmit={this.props._writeComment} >
            <div className="input">
              {/* <Input
                placeholder="댓글을 입력해주세요..."
                type="text"
                name="commentData"
                value={this.props.commentData}
                onChange={this.props._onHandleCommentDataChange}
              /> */}
              <Textarea
                placeholder="댓글을 입력해주세요..."
                type="text"
                name="commentData"
                value={this.props.commentData}
                onChange={this.props._onHandleCommentDataChange}
              />
            </div>
            <button className="submit" type="submit" class="btn btn-outline-secondary">
              댓글 입력
            </button>
          </form>
        </AddCommentBar>
        <hr/>
      </div>
    );
  }
}
