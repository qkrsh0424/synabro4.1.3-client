import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

//Cookie
import cookie from 'react-cookies';

//Server Url
import { serverUrl } from '../../config/serverUrl';
//bootstrap load
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { connect } from 'react-redux';
import * as actions from '../../action';

//API
import { shb_getParentRouteAll, shb_getShbAllList } from '../../handler/cliApi/shb';

// 로딩 관련 컴포넌트
import PageLoading from './PageLoading';

//메인 관련 컴포넌트
import Main from '../Main/Main';

// Shb main 관련 컴포넌트
import ShbMainIntro from '../ShbMain/Intro';
import ShbMainCategory from '../ShbMain/Category';
import ShbMainBoardPoster from '../ShbMain/BoardCategory/BoardCategoryPoster';

//Shb crew 관련 컴포넌트
import ShbCrewIntro from '../ShbCrew/Intro';
import ShbCrewHome from '../ShbCrew/ShbCrewHome';
import ShbCrewCategory from '../ShbCrew/Category';
import ShbCrewBoardPoster from '../ShbCrew/BoardCategory/BoardCategoryPoster';

//계정관련 컴포넌트
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

//컨트롤바 컴포넌트
import ControlBar from '../ControlBar';

//AdminPage 관련 컴포넌트
import AdminPage from '../AdminPage';

//그룹 신청 관련 컴포넌트
import GroupApply from '../GroupApply';

//각종 하위 컴포넌트
import PostEditorCommon from '../PostEditorV1_Common';
import PostModifyShbMain from '../PostModifyV1_Main';

//Error Page
import ErrorPage404 from '../ErrorPage';


import {saveScrollZero, getScrollValY} from '../Scroll/SaveScrollPosition';



const propTypes = {

}

const defaultProps = {

}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            cookiesUSID: cookie.load('usid')
        }
        this._set_UnivLists = this._set_UnivLists.bind(this);
    }

    async componentDidMount() {
        this._Authentication();
        this._set_parentRoutes();
        this._set_ShbLists();
        this._set_UnivLists().then(data => {
            this.props.handleSetUnivList(data);
        }).catch(err => console.log(err));
        localStorage.clear();
        // localStorage.setItem("mNumPost",10);
        // await saveScrollZero();
        await setTimeout(()=>{
            getScrollValY();
        },0);
        
    }

    _Authentication = async () => {
        // console.log(this.state.cookiesUSID);
        return await Axios.post(`${serverUrl}/api/auth/authentication`, {
            usid: this.state.cookiesUSID
        }, {
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        }
        )
            .then(response => response.data)
            .then(data => {
                //   console.log(data.message);
                if (data.message === 'connect success') {
                    this.props.handleAUTH_SUCCESS(data.sessid, data.user_nickname);
                } else {
                    this.props.handleAUTH_FAILURE();
                }
                this.setState({ auth: true });
            })
            .catch(err => alert('서버를 다시 확인해 주세요'));
    }
    _set_parentRoutes = async() =>{
        return shb_getParentRouteAll().then(data=>{
            if(data.message==='success'){
                this.props.handleSetParentRoute(data.data);
            }else{
                return;
            }
        })
    }
    _set_ShbLists = () => {
        return shb_getShbAllList().then(data => {
            this.props.handleSetShbList(data.data, data.main);
        }).catch(err => console.log(err));
    }

    _set_UnivLists() {
        const url = `${serverUrl}/api/univ`;
        return Axios.get(url, {
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        }).then(response => response.data);
    }

    render() {
        // console.log(this.props._parentRoute);
        if (this.state.auth && this.props._main) {

            // console.log(this.props._sess);
            // console.log(this.props._isLogged);
            // console.log(this.props._nickname);
            return (

                <div className='app-body'>
                    <Switch>
                        <Route exact path='/' component={Main} />

                        {/* SHB main Route */}
                        <Route exact path='/main' component={ShbMainIntro} />
                        {/* <Route exact path='/main/contact' component={Contact} /> */}
                        <Route exact path='/main/category/:shb_item_id' component={ShbMainCategory} />
                        <Route exact path='/main/category/:shb_item_id/writepost' component={PostEditorCommon} />
                        <Route exact path='/main/category/:shb_item_id/v/:post_id' component={ShbMainBoardPoster} />
                        <Route
                            exact path='/main/modifypost'
                            component={PostModifyShbMain}
                        />

                        {/* SHB crew Route */}
                        <Route exact path='/classify/:crew' component={ShbCrewIntro} />
                        <Route exact path='/classify/:crew/contype/:shb_num' component={ShbCrewHome} />
                        <Route exact path='/classify/:crew/category/:shb_item_id' component={ShbCrewCategory} />
                        <Route exact path='/classify/:crew/category/:shb_item_id/v/:post_id' component={ShbCrewBoardPoster} />
                        <Route exact path='/classify/:crew/category/:shb_item_id/writepost' component={PostEditorCommon} />
                        <Route
                            exact path='/classify/:crew/modifypost'
                            component={PostModifyShbMain}
                        />
                        {/* 계정 관련 라우터 */}
                        {/* 회원가입 */}
                        <Route
                            exact path='/signup'
                            component={Signup}
                        />
                        {/* 로그인 */}
                        <Route
                            exact path='/login'
                            component={Login}
                        />
                        {/* 프로필 */}
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/profile/:conType' component={Profile} />

                        {/* AdminPage 관련 라우터 */}
                        <Route exact path='/admin' component={AdminPage}/>

                        <Route exact path='/apply' component={GroupApply}/>

                        {/* error 관련 라우터 */}
                        <Route exact path='/error' component={ErrorPage404} />
                        <Route component={ErrorPage404} />


                    </Switch>
                    <h1 className='position-fixed bomVersionCheck1'>Beta version</h1>

                    <ControlBar />
                </div>
            );
        } else {
            return (
                <div>
                    <PageLoading />
                </div>
            );
        }

    }
}

App.propTypes = propTypes;

App.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        _parentRoute:state.parent_route.parentRoute,
        _main: state.shb_lists.mainCategory,
        univ_lists: state.univ_lists.univs,
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSetParentRoute:(parentRoute)=>{dispatch(actions.set_shb_parentRoute(parentRoute))},
        handleSetShbList: (shbs, mainCategory) => { dispatch(actions.set_shb_list(shbs, mainCategory)) },
        handleSetUnivList: (univs) => { dispatch(actions.set_univ_list(univs)) },
        handleAUTH_SUCCESS: (_sess, _nickname) => { dispatch(actions.auth_success(_sess, _nickname)) },
        handleAUTH_FAILURE: () => { dispatch(actions.auth_failure()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);