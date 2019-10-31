import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import PropTypes from 'prop-types';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';


import { connect } from 'react-redux';
import { awsImageURL } from '../../../config/awsurl';
import '../PostList.css';
import { Link, NavLink } from 'react-router-dom';

//URL
import {serverUrl} from '../../../config/serverUrl'

import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

class PostLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false
        }
    }

    async _onHandleLike(univ_id, post_id) {
        if (this.props._isLogged) {
            await Axios.post(`${serverUrl}/api/post_like/like`, {
                usid: this.props._sess,
                head_type: univ_id,
                post_id: post_id,
                parentType:'univ'
            },{
                headers:{
                    Authorization:'Bearer ' + AuthKey
                }
            })
                .then(res => res.data)
                .then(data => {
                    if (data.message === 'like ok') {
                        this.props._onClickReloadPost();
                    } else {
                        console.log('LIKE FUNCTION IS ERROR');
                    }
                });
        } else {
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href = '/login';
        }
    }

    async _onHandleUnLike(univ_id, post_id) {
        if (this.props._isLogged) {
            await Axios.post(`${serverUrl}/api/post_like/unlike`, {
                usid: this.props._sess,
                head_type: univ_id,
                post_id: post_id,
                parentType:'univ'
            },{
                headers:{
                    Authorization:'Bearer ' + AuthKey
                }
            })
                .then(res => res.data)
                .then(data => {
                    if (data.message === 'unlike ok') {
                        this.props._onClickReloadPost();
                    } else {
                        console.log('LIKE FUNCTION IS ERROR');
                    }

                });
        } else {
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href = '/login';
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
            <div className='table-body animate slideIn clearfix'>
                {this.props.post ? this.props.post.map((rows, index) => {

                    if (rows !== null) {
                        return (
                            <div className="table-bar p-3 mb-2 shadow-sm hover_animate" key={index}>
                                <Tooltip title={
                                    <React.Fragment>
                                        {rows.post_thumbnail_url === 'none' ? <em>No Thumbnail</em> :
                                            <div>
                                                <p><em>Thumbnail</em></p>
                                                <img src={rows.post_thumbnail_url} width="200px" height="200px" />
                                            </div>}
                                    </React.Fragment>
                                }>

                                    <Link to={`/univ/${this.props.univ_id}/${this.props.board_type}/v/${rows.post_id}`} className="text-dark">

                                        <div className="table-bar_column">

                                            {/* {rows.post_type===10002?<Notification_icon color="secondary"/>:""} */}
                                            <div className="table-bar_column">
                                                <div className="font-weight-bold m-0 clearfix">   
                                                    <span className='float-right mt-1 mb-1'>{rows.post_thumbnail_url === 'none' ? <img src={`${awsImageURL}/logo/imageNo2.gif`} /> : <img src={rows.post_thumbnail_url}/>}</span>       
                                                    <p className='topic_custom'>
                                                        <span className='text-primary'>{index + 1}</span>{rows.post_type === 10002 ? <Notification_icon color="secondary" /> : ""}
                                                        &nbsp;
                                                        {rows.post_topic.length > 80 ?
                                                            `${rows.post_topic.substring(0, 80)}...` :
                                                            rows.post_topic
                                                        }

                                                        {rows.post_image_count !== 0 ?
                                                            <span href="#" className="font-weight-normal"><PhotoLibraryOutlinedIcon style={{ fontSize: "20px" }} />({rows.post_image_count})</span>
                                                            : ""
                                                        }
                                                        
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        </div>

                                    </Link>

                                </Tooltip>
                                <span className="table-bar_writer float-left"> 작성자: {rows.user_nickname.length > 6 ? `${rows.user_nickname.substring(0, 6)}...` : rows.user_nickname}</span>
                                <br/>
                                <span className="table-bar_time float-left font-weight-normal">{calculateTime(new Date(), new Date(rows.post_created))}</span>
                                <div className="table-bar_column text-right">

                                    {/* 리스트에서 좋아요 누를수 있음 */}
                                    {/* {rows.liked === 'on' ? <a onClick={() => this._onHandleUnLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</a>
                                        : <a onClick={() => this._onHandleLike(rows.univ_id, rows.post_id)} className="text-secondary"><ThumbUpOff_icon />{rows.post_like_count}</a>} */}

                                    {/* 리스트에서 좋아요 누를수 없음 */}
                                        {rows.liked === 'on' ? <span className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</span>
                                        : <span className="text-secondary"><ThumbUpOff_icon />{rows.post_like_count}</span>}
                                    &nbsp;
                                            <span href="#" className="text-secondary"><Comment_icon />{rows.post_comment_count}</span>
                                    &nbsp;
                                            <span href="#" className="text-secondary"><Eye_icon />{rows.post_view_count}</span>

                                </div>
                            </div>
                        );
                    }
                }) : ""}
            </div>
        );
    }
}

PostLists.propTypes = propTypes;

PostLists.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        _sess:state.auth_user._sess,
        _isLogged: state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(PostLists);