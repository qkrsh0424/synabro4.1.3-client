import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import { Link, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import CreateIcon from '@material-ui/icons/Create';

//Component
import PostLists from './PostLists';




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

class BoardCategoryBody extends React.Component {
    render() {
        // console.log(this.props);
        const { 
            shb_item, postLists,
            nextBtnOn
        } = this.props;

        
        return (
            <div>
                <div className='container' id='board_ScrollTop'>
                    <div style={style.Grid}>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} sm={12}>
                                <Paper style={style.paperHeader}>
                                    {shb_item.shb_item_name}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Paper
                                    style={style.paperBody}
                                    className='clearfix'
                                >
                                    {/* <Link
                                        className='btn btn-outline-secondary float-right'
                                        to={`/univ/${this.props.univ_id}/${this.props.board_type}/richtext`}
                                    >
                                        <CreateIcon />
                                    </Link> */}
                                    <Link
                                        className='btn btn-outline-secondary float-right'
                                        to={`/${shb_item.parent_route}/category/${shb_item.shb_item_id}/writepost?BomNo=${shb_item.shb_num}&Category=${shb_item.shb_item_id}`}
                                    >
                                        <CreateIcon />
                                    </Link>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={9} className='clearfix'>
                                
                                <div>
                                    <PostLists
                                        postLists={postLists}
                                        _onClickReloadPost = {this.props._onClickReloadPost}
                                        // univ_id = {this.props.univ_id}
                                        // board_type = {this.props.board_type}
                                        // _onClickReloadPost = {this._onClickReloadPost}
                                    />
                                
                                    {/* {this.state.nextBtnOn ? "":<span>마지막 포스터 입니다.</span>}
                                    {this.state.nextBtnOn ?
                                        <button
                                            className='btn btn-outline-info float-right'
                                            onClick={this._getMorePost}
                                        >NEXT
                                        </button> :
                                        <button
                                            className='btn btn-outline-info float-right'
                                            onClick={this._reloadPost}
                                        >새로고침
                                        </button>
                                    }
                                    {this.state.isLoading?<CircularProgress/>:""} */}
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div className='jumbotron'>
                                    <a href={`/main/category/11?BomNo=1101001`}>신규 게시판 문의 받습니다.</a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default BoardCategoryBody;