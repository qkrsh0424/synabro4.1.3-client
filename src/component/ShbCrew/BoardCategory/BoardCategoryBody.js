import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import './BoardCategory.css';
import { Link, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import CreateIcon from '@material-ui/icons/Create';

//Component
import PostLists from './PostLists';

class BoardCategoryBody extends React.Component {
    render() {
        // console.log(this.props.shb);

        const {
            shb_item, postLists,
            nextBtnOn
        } = this.props;


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
        return (
            <div>
                <div className='container CrewBoardCategory' id='board_ScrollTop'>
                    <div className='jumbotron mt-3 shadow bg-light HeaderPart'>
                        {this.props.shb ?
                            <h3 className='text-center clearfix'>
                                <Link to={`/crew/contype/${this.props.shb.shb_num}`} className='Text'>
                                    <span>{this.props.shb.shb_name}</span>
                                </Link>
                                {/* <button className='float-right'>B</button> */}
                            </h3> :
                            ""}
                    </div>
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
                                    
                                    {this.props.isMember && this.props._isLogged ?
                                        <Link
                                            className='btn btn-outline-secondary float-right'
                                            to={`/${shb_item.parent_route}/category/${shb_item.shb_item_id}/writepost?BomNo=${shb_item.shb_num}&Category=${shb_item.shb_item_id}`}
                                        >
                                            <CreateIcon />
                                        </Link>
                                        :
                                        <div>
                                            <div>
                                             {this.props.canApplyGroup && this.props._isLogged ?
                                                <div>
                                                    <Link
                                                        className='btn btn-outline-secondary float-right'
                                                        to={`/apply?BomNo=${this.props.shb.shb_num}&Classify=Shb`}
                                                    >
                                                        그룹 가입요청
                                                    </Link>
                                                    <label className='float-right text-danger'>*가입 후 게시글 작성가능</label>
                                                </div>
                                                :
                                                <div>
                                                    {this.props._isLogged ? "현재 가입신청 처리중 입니다.":
                                                    <div>
                                                        <Link
                                                            className='btn btn-outline-secondary float-right'
                                                            to={`/login`}
                                                        >
                                                            로그인 해주세요
                                                        </Link>
                                                    </div>
                                                    }
                                                </div>
                                                }

                                            </div>
                                        </div>
                                    }
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={9} className='clearfix'>

                                <div>
                                    <PostLists
                                        postLists={postLists}
                                        _onClickReloadPost={this.props._onClickReloadPost}
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
                                    hi
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