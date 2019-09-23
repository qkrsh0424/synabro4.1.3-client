import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { connect } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';


import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';
import Notification_icon from '@material-ui/icons/NotificationImportant';

import { calculateTime } from '../../../controler/calculateTime';



const propTypes = {
}

const defaultProps = {

}

class PostLists extends React.Component {
    constructor(props) {
        super(props);
    }

    async _onHandleLike(univ_id,post_id){
        if(this.props._isLogged){
            await Axios.post('/api/post_like/like',{
                head_type:univ_id,
                post_id:post_id
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='like ok'){
                    this.props._onClickReloadPost();
                }else{
                    console.log('LIKE FUNCTION IS ERROR');
                }
            });
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }
    }

    async _onHandleUnLike(univ_id,post_id){
        if(this.props._isLogged){
            await Axios.post('/api/post_like/unlike',{
                head_type:univ_id,
                post_id:post_id
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='unlike ok'){
                    this.props._onClickReloadPost();
                }else{
                    console.log('LIKE FUNCTION IS ERROR');
                }
                
            });
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }
    }

    render() {
        return (
            <div className='table-body animate slideIn clearfix'>
                {this.props.post ? this.props.post.map((rows,index)=> {
                    if(rows!==null){
                        
                        return (
                            <div className="table-bar p-3 mb-2 shadow-sm hover_animate" key={index}>
                                <Link to={`/univ/${this.props.univ_id}/${this.props.board_type}/v/${rows.post_id}`} className="text-dark">
                                    <div className="table-bar_column clearfix">
                                        {/* {rows.post_type===10002?<Notification_icon color="secondary"/>:""} */}
                                        <span className="table-bar_writer"><span className='text-primary'>{index + 1}</span>{rows.post_type===10002?<Notification_icon color="secondary"/>:""} 작성자: {rows.user_nickname}</span>
                                        <span className="table-bar_time float-right">{calculateTime(new Date(),new Date(rows.post_created))}</span>
                                    </div>
                                    <div className="table-bar_column">
                                        <p className="font-weight-bold p-2 m-0">{rows.post_topic}</p>
                                    </div>
                                </Link>
                                <div className="table-bar_column text-right">
                                    {rows.liked==='on'?<a onClick={()=>this._onHandleUnLike(rows.univ_id,rows.post_id)} className="text-secondary"><ThumbUpOn_icon />{rows.post_like_count}</a>
                                    :<a onClick={()=>this._onHandleLike(rows.univ_id,rows.post_id)} className="text-secondary"><ThumbUpOff_icon />{rows.post_like_count}</a>}
                                    
                                    &nbsp;
                                            <span href="#" className="text-secondary"><Comment_icon />{rows.post_comment_count}</span>
                                    &nbsp;
                                            <span href="#" className="text-secondary"><Eye_icon />{rows.post_view_count}</span>
                                </div>
                            </div>
                        );
                    }
                }) :""}
            </div>
        );
    }
}

PostLists.propTypes = propTypes;

PostLists.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        _isLogged : state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(PostLists);