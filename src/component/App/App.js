import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

//bootstrap load
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { connect } from 'react-redux';
import * as actions from '../../action';

import PageLoading from './PageLoading'
import Main from '../Main/Main';
import Login from '../Login/Login';
import Univ from '../Univ/Univ';
import RichText from'../RichText/RichText';

const propTypes = {

}

const defaultProps = {

}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            auth:false
        }
        this._set_UnivLists = this._set_UnivLists.bind(this);
    }

    componentDidMount(){
        this._Authentication();
        this._set_UnivLists().then(data=>{
            this.props.handleSetUnivList(data);
        }).catch(err=>console.log(err));
    }

    _Authentication(){
      return Axios.post('/api/auth/authentication')
      .then(response=>response.data)
      .then(data=>{
        if(data.message==='connect success'){
            // console.log(data.sessid);
          this.props.handleAUTH_SUCCESS(data.sessid, data.user_nickname);
        }else{
          this.props.handleAUTH_FAILURE();
        
        }
          this.setState({auth:true});
      });
    }

    _set_UnivLists(){
        const url = '/api/univ';
        return Axios.get(url).then(response=>response.data);
    }

    render(){
        
        if(this.state.auth){
            // console.log(this.props._sess);
            // console.log(this.props._isLogged);
            // console.log(this.props._nickname);
            return(
                <div>
                    <Route exact path='/' component={Main}/>
                    <Route 
                        exact path='/login' 
                        component={Login}
                    />
                    <Route 
                        exact path='/univ/:univ_id/:board_type/richtext' 
                        component={RichText}
                    />
                    <Route exact path='/univ/:univ_id/:board_type' component={Univ}/>
                    <Route exact path='/univ/:univ_id' component={Univ}/>
                </div>
            );
        }else{
            return(
                <div><PageLoading/></div>
            );
        }
            
    }
}

App.propTypes = propTypes;

App.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        univ_lists: state.univ_lists.univs,
        _sess:state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleSetUnivList: (univs)=>{dispatch(actions.set_univ_list(univs))},
        handleAUTH_SUCCESS: (_sess, _nickname)=>{dispatch(actions.auth_success(_sess, _nickname))},
        handleAUTH_FAILURE: ()=>{dispatch(actions.auth_failure())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);