import React from 'react';

//server Url
import { awsImageURL } from '../../config/awsurl';

//handler
import { calculateTime } from '../../controler/calculateTime';

//styled-components
import styled from 'styled-components';

//react-router-dom
import { Link } from 'react-router-dom';

// Module
import CopyToClipboard from 'react-copy-to-clipboard';

//Core
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Icons
import Share_icon from '@material-ui/icons/Share';
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';
import TranslateIcon from '@material-ui/icons/TranslateRounded';


//Component
import ImageSliderForm from './ImageSliderForm';
import PosterMenuControl from './PosterMenuControl';
import Comments from './Comments';

const style = {
    paperHeader: {
        padding: '1rem',
        fontSize: '1.5rem'
    },
    paperBody: {
        padding: '1rem',
        fontSize: '1rem'
    },
    Grid: {
        padding: '8px'
    }
}

//Container
const Container = styled.div`
    .text-huge{
        font-size:1.8em;
    }
    .text-big{
        font-size:1.4em;
    }
    .text-small{
        font-size:.85em;
    }
    .text-tiny{
        font-size:.7em;
    }

    blockquote{
        overflow: hidden;
        padding-right: 1.5em;
        padding-left: 1.5em;
        margin-left: 0;
        margin-right: 0;
        font-style: italic;
        border-left: 5px solid #ccc;
    }
`;

const HeaderContainer = styled.div`
    padding:8px 0;
`;

const BodyContainer = styled.div`

`;

const CategoryTitleLink = styled(Link)`

`;

//Wrapper
const TitleWrapper = styled.div`

`;

const ContentWrapper = styled.div`
    border:1px solid #f1f1f1;
    padding-top:8px;
    padding-bottom:8px;

    
`;

//Box
const UserInfoBox = styled.div`

`;
const TitleBox = styled.div`

`;

const MainContentBox = styled.div`

`;

const CommonFilesBox = styled.div`

`;

const PostCountInfoBox = styled.div`
    margin-bottom:10px;
    margin-top:1rem;
    .likeOnStyle{
        color:#6c757d;
    }
`;

const TranslateFunctionBox = styled.div`

`;
const CommentBox = styled.div`

`;

// Elements 
const FigureEl = styled.figure`
    // text-align:right;
`;

const ImageEl = styled.img`
    // width: 50%;
`;

const TitleEl = styled.div`
    // margin:16px 0;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 20px;
    font-weight:700;
`;

const User = styled.div`
display: flex;
justify-content: space-between;
margin-bottom : 1rem;
`;

const User_pro = styled.div`
display: flex;
`;

const User_name = styled.div`
font-size:12px;
opacity:0.7;
margin-left:8px;
`;

const Post_time = styled.div`
font-size : 8px;
`;

const User_id = styled.div``;

const IconButtonEl = styled(IconButton)`
    font-size:15px !important;
    padding:0 !important;
`;

const TranslateMenuButton = styled(Button)`
    background:#fbcd41 !important;
    color:white !important;
    &:hover{
        background:#f99e1c !important;
        color:#9484e8 !important;
    }
    
`;
const ITEM_HEIGHT = 48;

const PosterBody = (props) => {
    //state
    const {
        metaData,
        pathData,
        postModule,
        commonFiles,
        queryValues,
        pageTransMenuOpen,
        pageTransMenuAnchor
    } = props;

    const {
        _sess,
        _isLogged
    } = props;  //redux props

    //controller
    const {
        _deleteMyPoster,
        _handleLikeOn,
        _handleLikeOff,
        loadPost,
        scrollMoveToComment,
        translatePage,
        handleTranslateMenuOpen,
        handleTranslateMenuClose
    } = props;

    var currentDate = new Date();
    // var createDate = new Date(metaData.post_created);

    return (
        <Container>
            {/* Header */}
            <HeaderContainer className='container'>
                <Paper style={style.paperHeader}>
                    {pathData &&
                        <div>
                            <CategoryTitleLink
                                to={`/`}
                                className='text-dark'
                            >
                                홈
                            </CategoryTitleLink>
                            >
                            <CategoryTitleLink
                                to={`/${pathData.pagePath}`}
                                className='text-success'
                            >
                                {pathData.shbName}
                            </CategoryTitleLink>
                            >
                            <CategoryTitleLink
                                to={`/${pathData.boardCategoryPath}`}
                                className='text-primary'
                            >
                                {pathData.shbItemName}
                            </CategoryTitleLink>
                        </div>
                    }
                </Paper>
            </HeaderContainer>

            {/* Body */}
            <BodyContainer>
                <ContentWrapper className='container'>
                    <TitleBox className='clearfix'>
                        <TitleEl
                            id="max-width-dialog-title"
                            className={
                                window.innerWidth <= '900' ? '' : '',
                                'float-left'
                            }
                        >
                            {metaData && metaData.post_title}
                        </TitleEl>
                        <span className='float-right'>
                            {_isLogged ?
                                <PosterMenuControl
                                    postOwner={metaData.postOwner}
                                    queryValues={queryValues}

                                    _deleteMyPoster={_deleteMyPoster}
                                /> : ""
                            }
                        </span>
                    </TitleBox>
                    <hr />
                    <UserInfoBox>
                        <User>
                            <User_pro>
                                <img src={`${awsImageURL}/logo/peopleNo.png`} height="40px" width="40px" />
                                <User_name>
                                    <User_id>
                                        {metaData.post_user_isSecret && metaData.post_user_isSecret === 1 ?
                                            '익명' :
                                            metaData.user_nickname
                                        }
                                    </User_id>
                                    <Post_time>{calculateTime(currentDate, new Date(metaData.post_created))}</Post_time>
                                </User_name>
                            </User_pro>
                            {/* <div>
                                <MenuList />
                            </div> */}
                            <CopyToClipboard text={window.location.href}>
                                <a className="btn btn-outline-secondary float-right">
                                    <Share_icon />
                                </a>
                            </CopyToClipboard>
                        </User>
                    </UserInfoBox>
                    <MainContentBox id='sheditorPart' >
                        {postModule ?
                            postModule.map(moduler => {
                                if (moduler.imageSliderOn) {
                                    return (
                                        <div>
                                            {moduler.videoData&&
                                                <div className='text-center'>
                                                    <video 
                                                        id="videoPlayer"
                                                        controls
                                                        autoplay={false}
                                                        width='80%'
                                                        poster={moduler.videoData.videoThumbnail?moduler.videoData.videoThumbnail:`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`}
                                                        controlsList="nodownload"
                                                    >
                                                        {/* <source src={`${serverUrl}/api/service/extend/video`} type="video/mp4"/> */}
                                                        <source src={`${moduler.videoData.videoUrl}`} type={moduler.videoData.type}/>
                                                    </video>
                                                </div>
                                            }
                                            {moduler.imageList[0] &&
                                                <ImageSliderForm
                                                    imageList={moduler.imageList}
                                                />
                                            }
                                            <div className='ck-content' dangerouslySetInnerHTML={{ __html: moduler.editorData }}>
                                            </div>
                                        </div>

                                    );
                                } else {
                                    return (
                                        <div>
                                            {moduler.videoData&&
                                                <div className='text-center'>
                                                    <video 
                                                        id="videoPlayer"
                                                        controls
                                                        autoplay={false}
                                                        width='80%'
                                                        poster={moduler.videoData.videoThumbnail?moduler.videoData.videoThumbnail:`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`}
                                                        controlsList="nodownload"
                                                    >
                                                        {/* <source src={`${serverUrl}/api/service/extend/video`} type="video/mp4"/> */}
                                                        <source src={`${moduler.videoData.videoUrl}`} type={moduler.videoData.type}/>
                                                    </video>
                                                </div>
                                            }
                                            {moduler.imageList ?
                                                moduler.imageList.map(image => {
                                                    return (
                                                        <FigureEl className={`text-${image.align}`}>
                                                            <ImageEl
                                                                src={image.imgUrl}
                                                                width={image.imgSize}
                                                            ></ImageEl>
                                                        </FigureEl>
                                                    );

                                                })
                                                :
                                                'image loading...'
                                            }
                                            <div className='ck-content' dangerouslySetInnerHTML={{ __html: moduler.editorData }}>
                                            </div>
                                        </div>
                                    );
                                }

                            })
                            :
                            'loading...'
                        }
                    </MainContentBox>
                    <CommonFilesBox>
                        {commonFiles && commonFiles[0] ?
                            <div>
                                <p><strong>첨부파일</strong></p>
                                <ul>
                                    {commonFiles.map(mat => {

                                        return (
                                            <li>
                                                <a href={mat.url} target='_black' download>{mat.name}</a>
                                            </li>
                                        )

                                    })}
                                </ul>
                            </div>
                            : ""}
                    </CommonFilesBox>
                    <PostCountInfoBox>
                        {metaData.liked === 'on' ? <a onClick={() => _handleLikeOff(metaData.shb_num, metaData.post_id)} className="text-secondary"><span id='currentLikeOn'><ThumbUpOn_icon /></span> {metaData.post_like_count}</a> :
                            <a onClick={() => _handleLikeOn(metaData.shb_num, metaData.post_id)} className="text-secondary"><span id="currentLikeOff"><ThumbUpOff_icon /></span> {metaData.post_like_count}</a>}
                        &nbsp;
                            <a onClick={scrollMoveToComment} className="text-secondary"><Comment_icon /> {metaData.post_comment_count}</a>
                        &nbsp;
                            <span href="#" className="text-secondary"><Eye_icon />{metaData.post_view_count}</span>
                    </PostCountInfoBox>
                    <TranslateFunctionBox>
                        <TranslateMenuButton 
                            type='button' 
                            onClick={handleTranslateMenuOpen} 
                        ><TranslateIcon/>Translate</TranslateMenuButton>
                        
                        <Menu
                            id="long-menu"
                            anchorEl={pageTransMenuAnchor}
                            keepMounted
                            open={pageTransMenuOpen}
                            onClose={handleTranslateMenuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: 200,
                                },
                            }}
                        >
                            <MenuItem onClick={() => translatePage('ko-zh')}>
                                한국어->中文
                            </MenuItem>
                            <MenuItem onClick={() => translatePage('ko-en')}>
                                한국어->English
                            </MenuItem>
                            <MenuItem onClick={() => translatePage('zh-ko')}>
                                中文->한국어
                            </MenuItem>
                            <MenuItem onClick={() => translatePage('zh-en')}>
                                中文->English
                            </MenuItem>
                            <MenuItem onClick={() => translatePage('en-ko')}>
                                English->한국어
                            </MenuItem>
                            <MenuItem onClick={() => translatePage('en-zh')}>
                                English->中文
                            </MenuItem>
                        </Menu>
                    </TranslateFunctionBox>
                    <hr />
                    <CommentBox id='comment_part'>
                        <Comments
                            head_type={metaData.shb_num}
                            queryValues={queryValues}
                            _sess={_sess}
                            _isLogged={_isLogged}

                            loadPost={loadPost}
                        // commentData={this.props.commentData}
                        // comment={this.props.comment}
                        // _writeComment={this.props._writeComment}
                        // _onHandleCommentDataChange={this.props._onHandleCommentDataChange}
                        // _DelComment={this.props._DelComment}
                        />
                    </CommentBox>
                </ContentWrapper>

            </BodyContainer>
        </Container>
    );
}

export default PosterBody;