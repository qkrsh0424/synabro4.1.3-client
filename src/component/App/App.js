import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

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
import { shb_getShbAllList } from '../../handler/cliApi/shb';

// 로딩 관련 컴포넌트
import PageLoading from './PageLoading';

//메인 관련 컴포넌트
import Main from '../Main/Main';
import Contact from '../Contact'

// Shb main 관련 컴포넌트
import ShbMainIntro from '../ShbMain/Intro';
import ShbMainCategory from '../ShbMain/Category';
import ShbMainBoardPoster from '../ShbMain/BoardCategory/BoardCategoryPoster';
import ShbMainBoardWrite from '../ShbMain/MainBoardWrite';

//Shb crew 관련 컴포넌트
import ShbCrewIntro from '../ShbCrew/Intro';
import ShbCrewHome from '../ShbCrew/ShbCrewHome';

//계정관련 컴포넌트
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

//컨트롤바 컴포넌트
import ControlBar from '../ControlBar';
import GotoHomeActionButton from '../ControlBar/GotoHomeActionButton';
import BackActionButton from '../ControlBar/BackActionButton';
import MoreActionButton from '../ControlBar/MoreActionButton';
import UpActionButton from '../ControlBar/UpActionButton';
import BottomNav from '../ControlBar/BottomNav';

//Univ 관련 컴포넌트
import Univ from '../Univ/Univ';
import UnivIntro from '../Univ/Intro';

//각종 하위 컴포넌트
// import RichText from'../RichText/RichText';
import TextAreaDemo from '../RichText/TextAreaDemo';
import DraftJs from '../RichText/DraftJs'
import DraftDemo from '../DraftDemo';
import PostEditorUniv from '../PostEditorV1_Univ';
import PostEditorCommon from '../PostEditorV1_Common';



    

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

        async componentWillMount() {
            this._Authentication();
            this._set_ShbLists();
            this._set_UnivLists().then(data => {
                this.props.handleSetUnivList(data);
            }).catch(err => console.log(err));

        }

        _Authentication = async () => {
            // console.log(this.state.cookiesUSID);
            return await Axios.post(`${serverUrl}/api/auth/authentication`, {
                usid: this.state.cookiesUSID
            })
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
        _set_ShbLists = () => {
            return shb_getShbAllList().then(data => {
                this.props.handleSetShbList(data.data, data.main);
            }).catch(err => console.log(err));
        }

        _set_UnivLists() {
            const url = `${serverUrl}/api/univ`;
            return Axios.get(url).then(response => response.data);
        }

        render() {
            
            if (this.state.auth && this.props._main) {
                
                // console.log(this.props._sess);
                // console.log(this.props._isLogged);
                // console.log(this.props._nickname);
                return (
                    
                    <div className='app-body'>
                        
                        <Route exact path='/' component={Main} />

                        {/* SHB main Route */}
                        <Route exact path='/main' component={ShbMainIntro} />
                        <Route exact path='/main/contact' component={Contact} />
                        <Route exact path='/main/category/:shb_item_id' component={ShbMainCategory} />
                        <Route exact path='/main/category/:shb_item_id/writepost' component={PostEditorCommon} />
                        <Route exact path='/main/category/:shb_item_id/v/:post_id' component={ShbMainBoardPoster} />

                        {/* SHB crew Route */}
                        <Route exact path='/crew' component={ShbCrewIntro}/>
                        <Route exact path='/crew/contype/:shb_num' component={ShbCrewHome} />
                        <Route exact path='/crew/category/:shb_item_id' component={ShbMainCategory} />
                        <Route exact path='/crew/category/:shb_item_id/v/:post_id' component={ShbMainBoardPoster} />
                        <Route exact path='/crew/category/:shb_item_id/writepost' component={PostEditorCommon} />


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

                        {/* 포스터 관련 라우터 */}
                        {/* <Route 
                        exact path='/univ/:univ_id/:board_type/richtext' 
                        component={RichText}
                    /> */}
                        <Route
                            exact path='/textareaDemo'
                            component={TextAreaDemo}
                        />
                        <Route
                            exact path='/draft'
                            component={DraftDemo}
                        />
                        <Route
                            exact path='/draft2'
                            component={DraftJs}
                        />
                        <Route
                            exact path='/univ/:univ_id/:board_type/writepost'
                            component={PostEditorUniv}
                        />

                        {/* Univ 관련 라우터 */}
                        <Route exact path='/univ/:univ_id/:board_type/v/:post_id' component={Univ} />
                        <Route exact path='/univ/:univ_id/:board_type' component={Univ} />
                        <Route exact path='/univ/:univ_id' component={Univ} />
                        <Route exact path='/univ' component={UnivIntro} />
                        <h1 className='position-fixed bomVersionCheck1'>Beta version</h1>
                        
                        <ControlBar/>
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
            _main: state.shb_lists.mainCategory,
            univ_lists: state.univ_lists.univs,
            _sess: state.auth_user._sess,
            _isLogged: state.auth_user._isLogged,
            _nickname: state.auth_user._nickname
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            handleSetShbList: (shbs, mainCategory) => { dispatch(actions.set_shb_list(shbs, mainCategory)) },
            handleSetUnivList: (univs) => { dispatch(actions.set_univ_list(univs)) },
            handleAUTH_SUCCESS: (_sess, _nickname) => { dispatch(actions.auth_success(_sess, _nickname)) },
            handleAUTH_FAILURE: () => { dispatch(actions.auth_failure()) }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(App);