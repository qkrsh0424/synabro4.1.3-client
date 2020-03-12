import React from 'react';

//styled 
import styled from 'styled-components';

//controller
import {calculateTime} from '../../../controler/calculateTime';

//Icons
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
const Container = styled.div`
    margin: 15px 0;
    padding: 8px 0;
    border-top:3px solid #f1f1f1;
    border-bottom:3px solid #f1f1f1;
`;

const PostWrapper = styled.div`
    border: 1px solid #f1f1f1;
    border-radius:15px;
    padding:15px;
    margin-bottom:8px;

    &:hover{
        cursor:pointer;
        transform:scale(1.005);
        background:rgba(251,205,65,0.1);
    }
`;

const PostInfoBox = styled.div`
`;

const PostTitleEl = styled.div`
    font-size:14px;
    font-weight:700;
    padding-bottom:8px;
`;

const AuthorEl = styled.div`
    font-size:12px;
    color: #9e9e9e;
    font-weight:600;
`;

const PathEl = styled.div`
    font-size:12px;
    color: #9e9e9e;
    font-weight:600;
`;

const ParentPathEl = styled.span`

`;

const CategoryPathEl = styled.span`

`;

const CountEl = styled.div`
    font-size:12px;
    color: #6c757d;
    font-weight:600;
    padding-top:8px;

`;
const ThumbnailBox = styled.figure`
    float:right;
    margin:0;
`;

const ThumbnailEl = styled.img`
    width:125px;
    height:125px;
    border:1px solid #f1f1f1;
    border-radius:15px;
    object-fit:cover;

`;

let currentTime = new Date();

const RecomendBody = (props) => {
    const {
        recomendPostList
    } = props;

    const {
        handleChangeRoute
    } = props;
    return (
        <Container>
            <h4 style={{fontWeight:'700', color:'#fdaa30'}}>HOT</h4>
            {recomendPostList && recomendPostList.map((rows) => {
                let createdTime = new Date(rows.post_created);
                return (
                    <PostWrapper 
                        className='clearfix'
                        onClick={()=>handleChangeRoute(rows.editorType, rows.parent_route, rows.shb_num, rows.shb_item_id, rows.post_id)}
                    >
                        <ThumbnailBox>
                            {rows.post_thumbnail_url==='none' ? 
                                <ThumbnailEl src={`https://synabrodemo.s3.ap-northeast-2.amazonaws.com/logo/imageNo2.gif`}/>
                                :
                                <ThumbnailEl src={rows.post_thumbnail_url} />
                            }
                        </ThumbnailBox>
                        <PostInfoBox>
                            
                            <PostTitleEl>
                                <FavoriteIcon style={{color:'white', background: 'linear-gradient(to right, #fbcd41 0%, #fda42d 100%)', borderRadius:'10px'}} /> {rows.post_title}
                                {rows.post_image_count ? <span><PhotoLibraryOutlinedIcon/>({rows.post_image_count})</span>:''}
                            </PostTitleEl>
                            <AuthorEl>
                                글쓴이>{rows.user_nickname}
                            </AuthorEl>
                            <PathEl>
                                작성지><ParentPathEl className='text-success'>{rows.shb_name}</ParentPathEl>><CategoryPathEl className='text-primary'>{rows.shb_item_name}</CategoryPathEl>
                            </PathEl>
                            <CountEl>
                                <span>{calculateTime(currentTime, createdTime)} </span>
                                <span>추천수 {rows.post_like_count} </span>
                                <span>댓글 {rows.post_comment_count} </span>
                                <span>조회수 {rows.post_view_count} </span>
                            </CountEl>
                            
                        </PostInfoBox>
                        
                    </PostWrapper>
                );
            })}


        </Container>
    );
}

export default RecomendBody;