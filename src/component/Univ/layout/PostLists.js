import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';

import ThumbUp_icon from '@material-ui/icons/ThumbUp';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';


const propTypes = {
}

const defaultProps = {

}

class PostLists extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='table-body animate slideIn clearfix'>
                {this.props.post ? this.props.post.map((rows,index)=> {
                    if(rows!==null){
                        return (
                            <div className="table-bar p-3 mb-2 shadow-sm hover_animate" key={index}>
                                <a href="/" className="text-dark">
                                    <div className="table-bar_column clearfix">
                                        {/* <Notification_icon color="secondary"/> */}
                                        <span className="table-bar_writer">{index + 1}작성자: {rows.user_nickname}</span>
                                        {/* <span className="table-bar_time float-right">{this.props.calcTime(currentDate, createDate)}</span> */}
                                    </div>
                                    <div className="table-bar_column">
                                        <p className="text">{rows.post_topic}</p>
                                    </div>
                                </a>
                                <div className="table-bar_column text-right">
                                    <a href="#" className="text-secondary"><ThumbUp_icon />0</a>
                                    &nbsp;
                                            <a href="#" className="text-secondary"><Comment_icon />0</a>
                                    &nbsp;
                                            <span href="#" className="text-secondary"><Eye_icon />0</span>
                                </div>
                            </div>
                        );
                    }
                }) : <p>Loading...</p>}
            </div>
        );
    }
}

PostLists.propTypes = propTypes;

PostLists.defaultProps = defaultProps;


export default PostLists;