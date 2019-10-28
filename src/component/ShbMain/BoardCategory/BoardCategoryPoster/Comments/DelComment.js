import React from 'react';
import styled from "styled-components";
// import {_getCommentAPI} from '../../../../Univ/layout/UnivPoster'
const DelCommentBar=styled.span`
font-size:12px;
`;

const Input=styled.input``;

export default class DelComment extends React.Component{
    
    render(){        
      // console.log(e.target)
        return (
            <DelCommentBar>
              <button 
              className='btn btn-outline-danger'
              onClick={()=>this.props._DelComment(this.props.head_type,this.props.cmt_id)}
              // value={}
              >삭제</button>
            </DelCommentBar>
          )
    }
}
