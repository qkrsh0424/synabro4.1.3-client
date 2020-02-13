import React from 'react';
// import {Button, Icon} from "semantic-ui-react";
import styled from "styled-components";

const CommentsHeaderBar = styled.div`
    h4 {
        display: inline-block;
        margin-right: 16px;
    }
`;

export function CommentsHeader(props){
    return(
        <CommentsHeaderBar>
            <h4>{props.amountComments} 댓글</h4>
        </CommentsHeaderBar>
    );
}