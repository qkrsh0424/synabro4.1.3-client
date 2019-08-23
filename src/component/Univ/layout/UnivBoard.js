import React from 'react';
import '../../PublicStyle/SlideAnimation.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CreateIcon from '@material-ui/icons/Create';

import PostLists from './PostLists';

const propTypes = {
    univ_id: PropTypes.string,
    univ_title: PropTypes.string,
    board_type: PropTypes.string
}

const defaultProps = {

}

class UnivBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board_title: '',
            post: '',
            startPostIndex: 0,
            currentPostIndex: 20,
            nextBtnOn: true,
            isLoading:false
        }

        this._getPostApi = this._getPostApi.bind(this);
        this._getMorePost = this._getMorePost.bind(this);
        this._reloadPost = this._reloadPost.bind(this);
    }

    async componentDidMount() {
        await Promise.all([this._getPostApi(), this._getBoardTitle()])
            .then(([res1, res2]) => this.setState({ post: res1, board_title: res2.univ_item_title }))
    }

    // async componentWillReceiveProps(nextProps) {
    //     if (nextProps.board_type !== this.props.board_type) {
    //         await Promise.all([this._getPostApi()])
    //             .then(([res1]) => this.setState({ post: res1 }))
    //     }
    // }
    async componentDidUpdate(prevProps) {
        if (prevProps.board_type !== this.props.board_type) {
            await Promise.all([this._getPostApi(), this._getBoardTitle()])
                .then(([res1, res2]) => this.setState({ post: res1, board_title: res2.univ_item_title }))
        }
    }

    _getBoardTitle() {
        return Axios.get('/api/univ_item/' + this.props.univ_id, {
            params: {
                board_type: this.props.board_type
            }
        })
            .then(response => response.data);
    }

    _getPostApi() {
        return Axios.get('/api/univ_post/' + this.props.univ_id + '/btpost', {
            params: {
                board_type: this.props.board_type,
                startPostIndex: this.state.startPostIndex,
                currentPostIndex: this.state.currentPostIndex
            }
        })
            .then(response => response.data);
    }

    async _getMorePost() {
        await this.setState({ isLoading:true,currentPostIndex: this.state.currentPostIndex + 10 });
        await this._getPostApi().then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i] === null) {
                    this.setState({ nextBtnOn: false })
                }
            }
            return this.setState({ post: data, isLoading:false })
        });
    }

    async _reloadPost() {
        await this.setState({ isLoading:true, currentPostIndex: 20 });
        document.documentElement.scrollTop=document.body.scrollTop=0;
        await this._getPostApi().then(data => {
            return this.setState({ post: data, nextBtnOn: true, isLoading:false })
        });
    }
    render() {
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
            <div className='container animate slideIn'>
                <div style={style.Grid}>
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid item xs={12} sm={12}>
                            <Paper style={style.paperHeader}>
                                {this.state.board_title}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper
                                style={style.paperBody}
                                className='clearfix'
                            >
                                <Link
                                    className='btn btn-outline-secondary float-right'
                                    to={`/univ/${this.props.univ_id}/${this.props.board_type}/richtext`}
                                >
                                    <CreateIcon />
                                </Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9} className='clearfix'>
                            <PostLists
                                post={this.state.post}
                            />
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
                            {this.state.isLoading?<h1>Loading...</h1>:""}
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div className='jumbotron'>
                                hi
                        </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

UnivBoard.propTypes = propTypes;

UnivBoard.defaultProps = defaultProps;

export default (UnivBoard);