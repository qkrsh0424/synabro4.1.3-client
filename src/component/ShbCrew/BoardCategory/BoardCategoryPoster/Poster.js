import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import '../../../PublicStyle/SlideAnimation.css';
import './Poster.css';
//API
import * as api from '../../../../handler/cliApi/shb';
import * as postApi from '../../../../handler/cliApi/PostApi';

import Snackbar from '@material-ui/core/Snackbar';

//Component
import Nav from '../../../Nav/Nav';
import PosterBody from './PosterBody';

class Poster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryValues: queryString.parse(this.props.location.search),
            shb: null,
            post: null,
            categoryTitle: null,
            commentData: '',
            comment: '',

            openCommentSnackbar:false,
            openLikeOnSnackbar:false,
            openLikeOffSnackbar:false,

            poster_isValidation: false,
        }
    }

    componentDidMount = () => {
        this._getShb();
        this._loadPost();
        this._loadCategory();
        this._loadComment();
        this._posterValidation();
    }

    _getShb = async () => {
        await api.shb_getShbOne(this.state.queryValues.BomNo) //crew는 선택사항.
            .then(data => this.setState({ shb: data.data[0] }));
    }

    _loadCategory = () => {
        api.shb_getShbOneItem(this.props.match.params.shb_item_id, this.state.queryValues.BomNo)
            .then(data => {
                if (data.message === 'success') {
                    this.setState({ categoryTitle: data.data.shb_item_name });
                } else {
                    alert('서버와 연결이 고르지 않습니다.');
                }

            })
    }
    _loadPost = () => {
        postApi.post_ViewCountPlus(this.props.match.params.post_id);
        api.shb_getShbOnePost(this.props._sess, this.props.match.params.post_id)
            .then(data => {
                // console.log(data[0])
                if (data[0].message === 'success') {
                    // console.log(data)
                    this.setState({ post: data });
                } else if (data[0].message === 'error') {
                    alert('잘못된 접근 방식입니다.');
                    window.location.href = '/'
                }
            });
    }

    _loadComment = () => {
        api.shb_getAllCommentOfCategory(this.props._sess, this.props.match.params.post_id)
            .then(data => this.setState({ comment: data }));
    }

    _handleLikeOn = (head_type, post_id) => {
        const logincheck = this.props._isLogged;
        const usid = this.props._sess;
        api.handleLikeOn(logincheck, usid, head_type, post_id)
            .then(data => {
                if (data.message === 'like ok') {
                    this.setState({openLikeOnSnackbar:true});
                    this._loadPost();
                } else {
                    console.log('LIKE FUNCTION IS ERROR');
                }
            })
    }

    _handleLikeOff = (head_type, post_id) => {
        const logincheck = this.props._isLogged;
        const usid = this.props._sess;
        api.handleLikeOff(logincheck, usid, head_type, post_id)
            .then(data => {
                if (data.message === 'unlike ok') {
                    this.setState({openLikeOffSnackbar:true});
                    this._loadPost();
                } else {
                    console.log('LIKE FUNCTION IS ERROR');
                }
            })
    }

    _scrollMoveToComment = () => {
        document.getElementById('comment_part').scrollIntoView({
            behavior: 'smooth'
        });
    }

    _onHandleCommentDataChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState({ commentData: nextState.commentData });
    }


    _writeComment = async (e) => {
        e.preventDefault();
        // console.log(this.props._sess);
        api.shb_writeCommentOfCategory(this.props._sess, this.state.commentData, this.props.match.params.post_id, this.state.queryValues.BomNo)
            .then(data => {
                if (data.message === 'success') {
                    this._loadComment();
                    this._loadPost();
                    this.setState({ commentData: '' });
                } else if (data.message === 'failure') {
                    alert('댓글 입력 오류입니다. 다시 시도해 주세요.');
                    window.location.reload();
                } else if (data.message === 'non-user') {
                    alert('로그인이 필요한 서비스 입니다.');
                    window.location.href = '/login';
                } else if (data.message === 'error') {
                    alert('네트워크 연결이 고르지 못합니다. 다시 시도해 주세요.');
                    window.location.reload();
                } else {
                    alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.) error num : cmt1');
                }
            })
    }

    _DelComment = async (head_type, cmt_id) => {
        api.shb_deleteCommentOfCategory(cmt_id, head_type, this.props.match.params.post_id)
            .then(data => {
                // console.log(data);
                if (data.message === 'success') {
                    this.setState({ openCommentSnackbar: true });
                    this._loadComment();
                    this._loadPost();
                } else if (data.message === 'failure') {
                    alert('댓글 삭제 오류입니다. 다시 시도해 주세요.');
                    window.location.reload();
                } else {
                    alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.)');
                }
            })
    }

    _posterValidation = async () => {
        if (this.props._isLogged) {
            api.shb_posterValidationAndMenuControl(this.props._sess, this.props.match.params.post_id, this.state.queryValues.BomNo)
                .then(data => {
                    if (data === 'valid') {
                        this.setState({ poster_isValidation: true });
                    } else if (data === 'invalid') {
                        this.setState({ poster_isValidation: false });
                    } else if (data === 'error') {
                        return;
                    } else {
                        return;
                    }
                })
        }
    }

    _deleteMyPoster = async () => {
        api.shb_deletePosterOne(this.props._sess, this.state.queryValues.BomNo, this.props.match.params.post_id)
            .then(data => {
                if (data === 'success') {
                    window.history.back();
                } else {
                    alert('error');
                    window.location.reload();
                }
            });
    }

    handleSnacbarClose = async () => {
        await this.setState({ openCommentSnackbar: false,openLikeOnSnackbar:false, openLikeOffSnackbar:false });
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                <Nav />
                {this.state.post&&
                    <PosterBody
                        {...this.state}
                        {...this.props}
                        _handleLikeOn={this._handleLikeOn}
                        _handleLikeOff={this._handleLikeOff}
                        _scrollMoveToComment={this._scrollMoveToComment}
                        _writeComment={this._writeComment}
                        _onHandleCommentDataChange={this._onHandleCommentDataChange}
                        _DelComment={this._DelComment}
                        _deleteMyPoster={this._deleteMyPoster}
                    />
                }
                

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.openCommentSnackbar}
                    onClose={this.handleSnacbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">댓글이 삭제 되었습니다.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.openLikeOnSnackbar}
                    onClose={this.handleSnacbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">좋아요를 누르셨습니다.</span>}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.openLikeOffSnackbar}
                    onClose={this.handleSnacbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">좋아요를 취소하셨습니다.</span>}
                />
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
    }
}

export default connect(mapStateToProps)(Poster);