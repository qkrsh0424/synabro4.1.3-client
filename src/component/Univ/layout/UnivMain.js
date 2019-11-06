import React from 'react';

import Axios from 'axios';

import {connect} from 'react-redux';
//API
import * as memberApi from '../../../handler/cliApi/member';

import {PropTypes} from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import UnivHome from './UnivHome';
import UnivBoard from './UnivBoard';
// import UnivPoster from './UnivPoster';
import UnivPoster from './UnivPoster2';

const propTypes = {
    univ_id: PropTypes.string,
    univ_title: PropTypes.string,
    board_type: PropTypes.string,
    post_id: PropTypes.string,
}

const defaultProps = {

}

class UnivMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isMember:false
        }
    }    

    componentDidMount = async() =>{
        this._memberCheck();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.board_type !== this.props.board_type) {
            this._memberCheck();
        }
    }

    _memberCheck = async() =>{
        if(this.props._sess){
            await memberApi.member_check(this.props._sess, this.props.univ_id)
            .then(data=>{
                if(data.message==='valid'){
                    this.setState({isMember:true});
                }else{
                    this.setState({isMember:false});
                }
            });
        }
        
    }
    render(){        
        if(this.props.board_type===undefined){
            return(
                <UnivHome
                    univ_id={this.props.univ_id}
                    univ_title={this.props.univ_title}
                    board_type={this.props.board_type}
                    beneBig={this.props.beneBig}
                    notice_post={this.props.notice_post}
                    isMember = {this.state.isMember}
                />
            );
        }else{
            if(this.props.post_id){
                return(
                    <UnivPoster
                        post_id={this.props.post_id}
                        univ_id={this.props.univ_id}
                        board_type={this.props.board_type}
                        isMember = {this.state.isMember}
                    />
                );
            }else{
                return(
                    <UnivBoard
                        univ_id={this.props.univ_id}
                        univ_title={this.props.univ_title}
                        board_type={this.props.board_type}
                        isMember = {this.state.isMember}
                    />
                );
            }
        }
    }
}

UnivMain.propTypes = propTypes;

UnivMain.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(UnivMain);