import React from 'react';

import './Univ.css';

import { connect } from 'react-redux';
import * as actions from '../../action';

import { Route } from 'react-router-dom';
import Axios from 'axios';

//URL
import { serverUrl } from '../../config/serverUrl';

//Components
import Nav from '../Nav/Nav';
import UnivNav from '../Univ/layout/UnivNav';
import UnivMain from '../Univ/layout/UnivMain';

import ArrowUp_icon from '@material-ui/icons/ArrowUpward';



const propTypes = {

}

const defaultProps = {

}

class Univ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            univ_item_list: '',
            // univ_title: undefined,
            univ_post: '',
            beneBig: '',
            notice_post: ''
        }
        this._loadUnivItems = this._loadUnivItems.bind(this);
        this._getUnivTitle = this._getUnivTitle.bind(this);
        this._callBigBene = this._callBigBene.bind(this);
        this._getNoticePost = this._getNoticePost.bind(this);
        this._scrollUp = this._scrollUp.bind(this);
        this._PageBack = this._PageBack.bind(this);
    }

    async componentDidMount() {
        // this.setState({selectedUniv:this.props.match.params.univ_id});
        // await this._loadUnivItems();
        // await this._getUnivTitle();
        // await this._callBigBene();
        // await this._getNoticePost();
        await Promise.all([this._loadUnivItems(), this._callBigBene(), this._getUnivTitle(), this._getNoticePost()])
            .then(([res1, res2, res3, res4]) => {
                this.setState({ univ_item_list: res1, beneBig: res2, univ_title: res3.univ_title, notice_post:res4 });
            });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.location != this.props.location) {
            // this.setState({selectedUniv:this.props.match.params.univ_id});
            // await this._loadUnivItems();
            // await this._getUnivTitle();
            // await this._callBigBene();
            // await this._getNoticePost();
            await Promise.all([this._loadUnivItems(), this._callBigBene(), this._getUnivTitle()])
                .then(([res1, res2, res3]) => {
                    this.setState({ univ_item_list: res1, beneBig: res2, univ_title: res3.univ_title });
                });
        }
    }

    _callBigBene() {
        if (this.props.match.params.board_type === undefined) {
            return Axios.get(`${serverUrl}/api/bene/` + this.props.match.params.univ_id, {
                params: {
                    bene_type: 'big'
                }
            })
                .then(response => response.data)
            // .then(data=>this.setState({beneBig:data}));
        } else {
            return Axios.get(`${serverUrl}/api/bene/` + this.props.match.params.univ_id + '/' + this.props.match.params.board_type)
                .then(response => response.data)
            // .then(data=>this.setState({beneBig:data}));
        }
    }

    _loadUnivItems() {
        return Axios.get(`${serverUrl}/api/univ_item/` + this.props.match.params.univ_id)
            .then(response => response.data)
        // .then(data=>this.setState({univ_item_list:data}));
    }

    _getUnivTitle() {
        // this.props.univ_lists.map(row => {
        //     if (Number(row.univ_id) === Number(this.props.match.params.univ_id)) {
        //         this.setState({ univ_title: row.univ_title });
        //         // return row.univ_title;
        //     }
        // });
        if (this.props.match.params.univ_id) {
            return Axios.get(`${serverUrl}/api/univ`, {
                params: {
                    selectedIndex: this.props.match.params.univ_id
                }
            })
                .then(response => response.data);
        }
    }

    _getNoticePost() {
        const startIndex = 0;
        const lastIndex = 3;
        return Axios.get(`${serverUrl}/api/univ_post/` + this.props.match.params.univ_id, {
            params: {
                boardType: 10002,
                startIndex: startIndex,
                lastIndex: lastIndex
            }
        })
            .then(response => response.data.slice(startIndex, lastIndex))
        // .then(data => {
        //     return this.setState({ notice_post: data })
        // });
    }

    _scrollUp() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    _PageBack(){
        this.props.history.goBack();
    }
    render() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        return (
            <div>
                <Nav />
                <UnivNav
                    univ_id={this.props.match.params.univ_id}
                    univ_title={this.state.univ_title === undefined ? <div>Home</div> : this.state.univ_title}
                    univ_item_list={this.state.univ_item_list}
                />
                <UnivMain
                    univ_id={this.props.match.params.univ_id}
                    univ_title={this.state.univ_title}
                    board_type={this.props.match.params.board_type}
                    beneBig={this.state.beneBig}
                    notice_post={this.state.notice_post}
                    post_id = {this.props.match.params.post_id}
                />
                {/* <button className="btn shadow-lg position-fixed buttonTest2" onClick={this._PageBack}>BACK</button>
                <button className="btn shadow-lg position-fixed buttonTest" onClick={this._scrollUp}><ArrowUp_icon /></button> */}
            </div>
        );
    }
}

Univ.propTypes = propTypes;

Univ.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        univ_lists: state.univ_lists.univs,
        _isLogged: state.auth_user._isLogged,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Univ);