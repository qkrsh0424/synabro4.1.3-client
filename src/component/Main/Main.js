import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../../action';

//API
import { shb_getShbAllItemList } from '../../handler/cliApi/shb';
import * as bannerApi from '../../handler/cliApi/banner';


//Component
import Nav from '../Nav/Nav';
import MainBody from './MainInterface';
import ScrollTabs from './ScrollTabs';


const propTypes = {

}

const defaultProps = {

}

class Main extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state={
            shb_main_items:null,
            bannerHeader:null,
            forecastBool:false,
        }
    }

    componentDidMount = ()=>{
        this._isMounted = true;
        if(this._isMounted===true){
            this._getShbItemAllList();
            this._getBanner();
            this.setState({forecastBool:true});
        }
        
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        
    }

    componentWillUnmount = () =>{
        this._isMounted = false;
        this.setState({forecastBool:false});
    }

    _getShbItemAllList = async() =>{
        shb_getShbAllItemList(this.props._main.shb_num)
        .then(data=>{
            if(data.message==='success'){
                if(this._isMounted===true){
                    this.setState({shb_main_items:data.data});
                }
                
            }
        });
    }

    _getBanner = async() =>{
        bannerApi.banner_getBanner_headType_bannerType(1101001, 'header')
        .then(data=>{
            if(data.message==='success'){
                this.setState({bannerHeader:data.data});
            }
        });
    }

    render(){
        return(
            <div>
                <Nav/>
                <ScrollTabs
                    {...this.props}
                    {...this.state}
                    // shb_lists={this.props.shb_lists}
                    // shb_main_items={this.state.shb_main_items}
                    // univ_lists = {this.props.univ_lists}
                    // forecastBool = {this.state.forecastBool}
                />
                {/* <MainBody
                    shb_lists={this.props.shb_lists}
                    shb_main_items={this.state.shb_main_items}
                    univ_lists = {this.props.univ_lists}
                    forecastBool = {this.state.forecastBool}
                /> */}
            </div>
        );
    }
}

Main.propTypes = propTypes;

Main.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname,
        shb_lists: state.shb_lists.shbs,
        _main: state.shb_lists.mainCategory,
        univ_lists: state.univ_lists.univs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleAUTH_SUCCESS: (_sess, _nickname) => { dispatch(actions.auth_success(_sess, _nickname)) },
        handleAUTH_FAILURE: () => { dispatch(actions.auth_failure()) }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);