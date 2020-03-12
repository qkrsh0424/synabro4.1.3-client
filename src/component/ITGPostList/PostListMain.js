import React from 'react';

//Component
import PostListBody from './PostListBody';

const PostListMain = (props) =>{
    const {
        post
    } = props
    return(
        <div>
            {/* {console.log(post)} */}
            <PostListBody/>
        </div>
        
    );
}

export default PostListMain;