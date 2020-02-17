import React from 'react';

//Core
import Grid from '@material-ui/core/Grid';

//Component
import OnePost from './OnePost';

const PostListBody = () =>{
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={9}>
                    <OnePost
                    
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    여기는 오룬ㅉㅎㄱ
                </Grid>
            </Grid>
        </div>
    );
}

export default PostListBody;