import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import './BoardCategory.css';
import { Link, NavLink } from 'react-router-dom';

//Core
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

//Icons
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import NewIcon from '@material-ui/icons/FiberNewOutlined';

//Component
import PostLists from './PostLists';

class BoardCategoryBody extends React.Component {
    render() {
        // console.log(this.props.shb);

        const {
            shb_item,
            postLists,
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
                                <Link to={`/classify/${this.props.shb.shb_classify}/contype/${this.props.shb.shb_num}`} className='Text'>
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
                                        <div>
                                            <Link
                                                className='btn btn-outline-secondary float-right'
                                                to={`/classify/${shb_item.parent_route}/category/${shb_item.shb_item_id}/writepost?BomNo=${shb_item.shb_num}&Category=${shb_item.shb_item_id}`}
                                            >
                                                <CreateIcon />
                                            </Link>
                                            <a
                                                className='btn btn-outline-secondary float-right mr-2'
                                                href={process.env.NODE_ENV === 'production' ?
                                                    `http://d2.shbom.com/write?BomNo=${shb_item.shb_num}&Category=${shb_item.shb_item_id}&Pr=${shb_item.parent_route}`
                                                    :
                                                    `http://localhost:3001/write?BomNo=${shb_item.shb_num}&Category=${shb_item.shb_item_id}&Pr=${shb_item.parent_route}`}
                                            >
                                                <CreateIcon /><span className='text-danger bold'>*<NewIcon /><span style={{ fontSize: '10px' }}>권장</span></span>
                                            </a>
                                        </div>

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
                                                        {this.props._isLogged ? "현재 가입신청 처리중 입니다." :
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
                                    />

                                    <div className='text-center'>
                                        {this.props.nextPostLoading ?
                                            <CircularProgress />
                                            :
                                            this.props.postLists && this.props.postLists.length < this.props.currentPostIndex ?
                                                <div>
                                                    <h5>마지막 포스터 입니다.</h5>
                                                    <IconButton type='button' onClick={this.props.handleReloadPost}><RefreshIcon style={{ fontSize: '35px' }} /></IconButton>
                                                </div>
                                                :
                                                <IconButton type='button' onClick={this.props.handleNextPost}><ExpandMoreIcon style={{ fontSize: '35px' }} />더보기</IconButton>
                                        }
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <div className='jumbotron'>
                                    <Link to={`/main/category/11?BomNo=1101001`}>신규 게시판 문의 받습니다.</Link>
                                    <div className='text-center'>
                                        <img
                                            src='https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/bannerImage/%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%86%B7%E1%84%80%E1%85%A9%E1%84%80%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A6%E1%86%AB%E1%84%90%E1%85%A5QR.jpg'
                                            width='150px'
                                            height='150px'
                                        ></img>

                                        <label>상해봄 고객센터</label>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Snackbar
                    open={this.props.reloadSnackOpen}
                    onClose={this.props.handleReloadSnackClose}
                    TransitionComponent={TransitionUp}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={3000}
                    message={<span id="message-id">피드를 새로고침 하였습니다.</span>}
                />
            </div>
        );
    }
}
function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
export default BoardCategoryBody;