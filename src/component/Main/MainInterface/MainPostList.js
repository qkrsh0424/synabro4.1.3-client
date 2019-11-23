import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { connect } from 'react-redux';
import { awsImageURL } from '../../../config/awsurl';
// import '../PostList.css';
import { Link, NavLink } from 'react-router-dom';

//URL
import { serverUrl } from '../../../config/serverUrl'

import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material Icons
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';
import Notification_icon from '@material-ui/icons/NotificationImportant';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';

import { calculateTime } from '../../../controler/calculateTime';



const propTypes = {
}

const defaultProps = {

}

const Wrapper = styled.div`

.table-body-MainPostList{
    margin-bottom:30px
}

img{
    height:125px;
}
.box-MainPostList{
    display:flex;
    justify-content:space-between;
    /* width:100%; */
}

.text{
    font-size:10px;
}
.table-bar_writer{
    font-size:10px;
}
.table-bar_column img{
    border-radius: 0px 20px 20px 0px;
    /* border-radius:0px; */
}
.tb-border-MainPostList{
    border: 1px solid #f0f0f0
}

`;

class PostLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false
        }
    }

    handleTooltipClose = () => {
        this.setState({ tooltipOpen: false });
    };

    handleTooltipOpen = () => {
        this.setState({ tooltipOpen: true });
    };

    render() {
        return (
            <Wrapper className='MainPostList'>
                <div className='table-body animate slideIn clearfix '>
                    {this.props.post ? this.props.post.map((rows, index) => {

                        if (rows !== null) {
                            if(rows.parent_route==='main'){
                                return (
                                    <div className="table-bar mb-2 hover_animate tb-border-MainPostList" key={index}>
                                        <Tooltip title={
                                            <React.Fragment>
                                                {rows.post_thumbnail_url === 'none' ? <em>No Thumbnail</em> :
                                                    <div>
                                                        <p><em>Thumbnail</em></p>
                                                        <img src={rows.post_thumbnail_url} width="250" height="150" />
                                                    </div>}
                                            </React.Fragment>
                                        }>
    
                                            <Link to={`/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="text-dark">
    
                                                <div className="table-bar_column  box-MainPostList">
                                                    <div className="table-bar_column">
                                                        <div className="font-weight-bold px-3 pt-3  m-0 clearfix">
                                                            <div>
    
                                                                <div className='topic_custom mb-0' style={{ fontSize: "16px" }}>
                                                                    <span className='text-primary' fontSize="14px" >{index + 1}</span>
                                                                    &nbsp;
                                                                    {rows.post_title && rows.post_title.length > 32 ?
                                                                        `${rows.post_title.substring(0, 32)}...` :
                                                                        rows.post_title
                                                                    }
    
                                                                    {rows.post_image_count !== 0 ?
                                                                        <span href="#" className="font-weight-normal"><PhotoLibraryOutlinedIcon style={{ fontSize: "14px" }} />({rows.post_image_count})</span>
                                                                        : ""
                                                                    }
    
                                                                </div>
                                                                <div className="table-bar_column">
                                                                    <span className="table-bar_writer" style={{ fontSize: "14px" }}>
                                                                        {rows.post_user_isSecret && rows.post_user_isSecret===1?
                                                                            '익명':
                                                                            rows.user_nickname.length > 12 ? `${rows.user_nickname.substring(0, 12)}...` : rows.user_nickname
                                                                        }
                                                                    </span>
    
    
    
                                                                </div>
                                                                <div className="table-bar_column">
    
                                                                    {/* 리스트에서 좋아요 누를수 있음 */}
                                                                    {/* {rows.liked === 'on' ? <a onClick={() => this._onHandleUnLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</a>
                                                            : <a onClick={() => this._onHandleLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOff_icon />{rows.post_like_count}</a>} */}
    
                                                                    {/* 리스트에서 좋아요 누를수 없음 */}
                                                                    <span className="table-bar_time text-secondary text"> {calculateTime(new Date(), new Date(rows.post_created))} </span>
                                                                    {rows.liked === 'on' ? <span className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</span>
                                                                        : <span className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                            {/* <ThumbUpOff_icon  style={{fontSize:'14px'}} /> */}
                                                                            <span className="text">추천 </span>
                                                                            {rows.post_like_count}</span>}
                                                                    &nbsp;
                                                                <span href="#" className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                        {/* <Comment_icon style={{fontSize:'14px'}} /> */}
                                                                        <span className="text">댓글  </span>
                                                                        {rows.post_comment_count}</span>
                                                                    &nbsp;
                                                                <span href="#" className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                        {/* <Eye_icon style={{fontSize:'14px'}} /> */}
                                                                        <span className="text">조회 </span>
                                                                        {rows.post_view_count}
                                                                    </span>
    
                                                                </div>
                                                            </div>
    
    
                                                        </div>
    
                                                    </div>
                                                    <div>
                                                        <span className='mt-1 mb-1'>{rows.post_thumbnail_url === 'none' ? <img src={`${awsImageURL}/logo/imageNo2.gif`} /> : <img src={rows.post_thumbnail_url} />}</span>
                                                    </div>
                                                </div>
    
    
                                            </Link>
    
                                        </Tooltip>
    
                                    </div>
                                );
                            }else{
                                return (
                                    <div className="table-bar mb-2 hover_animate tb-border-MainPostList" key={index}>
                                        <Tooltip title={
                                            <React.Fragment>
                                                {rows.post_thumbnail_url === 'none' ? <em>No Thumbnail</em> :
                                                    <div>
                                                        <p><em>Thumbnail</em></p>
                                                        <img src={rows.post_thumbnail_url} width="200px" height="200px" />
                                                    </div>}
                                            </React.Fragment>
                                        }>
    
                                            <Link to={`/classify/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="text-dark">
    
                                                <div className="table-bar_column  box-MainPostList">
                                                    <div className="table-bar_column">
                                                        <div className="font-weight-bold px-3 pt-3  m-0 clearfix">
                                                            <div>
    
                                                                <div className='topic_custom mb-0' style={{ fontSize: "16px" }}>
                                                                    <span className='text-primary' fontSize="14px" >{index + 1}</span>
                                                                    &nbsp;
                                                            {rows.post_title && rows.post_title.length > 15 ?
                                                                        `${rows.post_title.substring(0, 15)}...` :
                                                                        rows.post_title
                                                                    }
    
                                                                    {rows.post_image_count !== 0 ?
                                                                        <span href="#" className="font-weight-normal"><PhotoLibraryOutlinedIcon style={{ fontSize: "14px" }} />({rows.post_image_count})</span>
                                                                        : ""
                                                                    }
    
                                                                </div>
                                                                <div className="table-bar_column">
                                                                    <span className="table-bar_writer" style={{ fontSize: "14px" }}>
                                                                        {rows.post_user_isSecret && rows.post_user_isSecret===1?
                                                                            '익명':
                                                                            rows.user_nickname.length > 12 ? `${rows.user_nickname.substring(0, 12)}...` : rows.user_nickname
                                                                        }
                                                                    </span>
    
    
    
                                                                </div>
                                                                <div className="table-bar_column">
    
                                                                    {/* 리스트에서 좋아요 누를수 있음 */}
                                                                    {/* {rows.liked === 'on' ? <a onClick={() => this._onHandleUnLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</a>
                                                            : <a onClick={() => this._onHandleLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOff_icon />{rows.post_like_count}</a>} */}
    
                                                                    {/* 리스트에서 좋아요 누를수 없음 */}
                                                                    <span className="table-bar_time text-secondary text"> {calculateTime(new Date(), new Date(rows.post_created))} </span>
                                                                    {rows.liked === 'on' ? <span className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</span>
                                                                        : <span className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                            {/* <ThumbUpOff_icon  style={{fontSize:'14px'}} /> */}
                                                                            <span className="text">추천 </span>
                                                                            {rows.post_like_count}</span>}
                                                                    &nbsp;
                                                                <span href="#" className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                        {/* <Comment_icon style={{fontSize:'14px'}} /> */}
                                                                        <span className="text">댓글  </span>
                                                                        {rows.post_comment_count}</span>
                                                                    &nbsp;
                                                                <span href="#" className="text-secondary text" style={{ fontSize: '14px' }}>
                                                                        {/* <Eye_icon style={{fontSize:'14px'}} /> */}
                                                                        <span className="text">조회 </span>
                                                                        {rows.post_view_count}
                                                                    </span>
    
                                                                </div>
                                                            </div>
    
    
                                                        </div>
    
                                                    </div>
                                                    <div>
                                                        <span className='mt-1 mb-1'>{rows.post_thumbnail_url === 'none' ? <img src={`${awsImageURL}/logo/imageNo2.gif`} /> : <img src={rows.post_thumbnail_url} />}</span>
                                                    </div>
                                                </div>
    
    
                                            </Link>
    
                                        </Tooltip>
    
                                    </div>
                                );
                            }
                            
                        }
                    }) : <div className='text-center'><CircularProgress/></div>}
                </div>
            </Wrapper>
        );
    }
}

PostLists.propTypes = propTypes;

PostLists.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(PostLists);