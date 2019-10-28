import React from 'react';
import Axios from 'axios';
import { CommentsHeader } from "./CommentHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";
import DelComment from "./DelComment";
// import Reply from "./Reply"




export default class Comments extends React.Component {

  render() {
    // console.log(this.props.comment)
    return (
      <div>
        <CommentsHeader amountComments={this.props.amountComments} />
        <AddComment
          head_type={this.props.head_type}
          _writeComment={this.props._writeComment}
          _onHandleCommentDataChange={this.props._onHandleCommentDataChange}
          commentData={this.props.commentData}
        />
        <Comment
          head_type={this.props.head_type}
          comment={this.props.comment}
         _DelComment={this.props._DelComment}
        />

      </div>
    );
  }
}