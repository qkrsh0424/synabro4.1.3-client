import React from 'react';

import Axios from 'axios';
import {PropTypes} from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import UnivHome from './UnivHome';
import UnivBoard from './UnivBoard';

const propTypes = {
    univ_id: PropTypes.string,
    univ_title: PropTypes.string,
    board_type: PropTypes.string,
}

const defaultProps = {

}

class UnivMain extends React.Component{
    constructor(props){
        super(props);
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
                />
            );
        }else{
            return(
                <UnivBoard
                    univ_id={this.props.univ_id}
                    univ_title={this.props.univ_title}
                    board_type={this.props.board_type}
                />
            );
        }
    }
}

UnivMain.propTypes = propTypes;

UnivMain.defaultProps = defaultProps;


export default UnivMain;