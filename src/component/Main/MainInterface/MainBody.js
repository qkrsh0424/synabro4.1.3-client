import React,{lazy} from "react";
import PropTypes from "prop-types";

//router dom
import { Link } from "react-router-dom";

//Style
import styled from "styled-components";

//API
import * as shbApi from '../../../handler/cliApi/shb';

//Material Core
import { IconButton } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

//Icons
// import searchIcon from '@material-ui/icons/Search';
// import Card_giftcard from "@material-ui/icons/CardGiftcard";
// import Language from "@material-ui/icons/Translate";
// import Contact from "@material-ui/icons/ContactPhone";
import DropdownIcon from '@material-ui/icons/ArrowDownward';
// import DropUpIcon from '@material-ui/icons/ArrowUpward';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Component
// import Forecast from "../Forecast";
import MainSearch from "../../MainSearch/FullDialog";
import LoginCard from '../../Login/LoginCard';
// import MainPostCard1 from './MainPostCard1';
// import MainPostCard2 from './MainPostCard2';
import MainPostList from './MainPostList';
import MainContentsSingleLists from './MainContentsSingleLists';

// const CoronaComponent = lazy(()=>import('../../DemoFile/CoronaMain'));
const ContentsListPart = lazy(()=>import('../ContentsListPart'));
const ITGPostList = lazy(()=>import('../../ITGPostList'));
const RecomendPost = lazy(()=>import('../RecomentPost'));

const Container = styled.div`
    padding-top: 30px;

    .bene_Big_Size{
        width:100%;
        height:300px;
    }

    .mainBene {
        font-size: 200px;
        height: 21vw;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        padding: 0px;
        color: #636e72;
    }
    input {
        width: 100%;
        margin-bottom: 3px;
    }
    .card {
        margin: 0 0 2rem;
        /* min-width: 255px; */
        // box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
    }

    .cardWrapper{
        background-color: white;
        margin: 0 0 2rem;
        border: none;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    }

    .cardWrapper .card{
        background-color: white;
        margin: 0 0 2rem;
        border: none;
        box-shadow: none;
    }
    
    .right {
        height: 128px;
        text-align: center;
    }
    .mainBene img {
        /* background-color: #e9ecef; */
        height: 21vw;
        border: none;
        padding: 0px 0px;
        border-radius: 0.25rem;
    }
    .main {
        height: 21vw;
        color: white;
    }
    .nav {
        /* display:flex; */
        flex-wrap: wrap;
        overflow: auto;
        overflow-y: hidden;
        height: 128px;
        
    }
    .board {
        min-height: 285px;
    }
    .user-image {
        vertical-align: middle;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        flex-shrink: 0;
    }
    .board_title {
        border-bottom: 2px solid #9f9f9f;
        padding: 10px;
        font-weight:bold;
    }
    .post {
        border-bottom: 1px solid #bfbfbf;
        padding: 4.5px 10px;
    
        :last-child {
          border: none;
        }
    }
    .login {
        font-size: 12px;
        height: 187px;
        padding: 40px 20px;
        opacity: 0.8;
        /* vertical-align:center; */
    }
    .greeting {
        margin-bottom: 5px;
    }
    .loginCard {
        
        top:50%;
        width: 100%;
        margin-bottom: 5px;
    }
    .loginFooter {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        color: black;
    }
    
    .item {
        width: 80px;
        height: 100px;
        margin: 15px 0px 20px 20px;
        text-align: center;
        text-decoration: none;
    }
    .item_icon {
        padding: 10px;
        font-size: 32px;
        font-weight: 600;
    }
    
    .item_name {
        font-size: 14px;
        font-weight: 600;
    }
    
    .poster {
        background-color: #0984e3;
        text-align: center;
    }
    
    .mainSearch{
        text-align:center;
    }
    .carousel-inner{
        border-radius:30px;
    }

    .carousel{
        border-radius:30px;
        height: 21vw;
    }

    @media screen and (max-width:800px){
        .carousel{
            border-radius:15px;
            height: 45vw;
        }   
        .carousel-inner{
            border-radius:15px;
        }
        .main {
            height: 45vw;
            color: white;
        }
        .mainBene {
            font-size: 200px;
            height: 45vw;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
              Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            padding: 0px;
            color: #636e72;
        }

        .mainBene img {
            /* background-color: #e9ecef; */
            height: 45vw;
            border: none;
            padding: 0px 0px;
            border-radius:15px;
        }
        
        
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
        color: black;
        &:focus,
        &:hover,
        &:visited,
        &:link,
    &:active {
        text-decoration: none;
        color: black;
    }
    color: #f06060;

    :hover {
        color:#636e72;
    }
    :hover:after {
        -webkit-transform: scale(1.3);
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        transform: scale(1.3);
        opacity: 0;
    }

    .item {
        box-shadow: 0 0 0 4px #fff;
        -webkit-transition: color 0.3s;
        -moz-transition: color 0.3s;
        transition: color 0.3s;
    }
    .item:after {
        top: -2px;
        left: -2px;
        padding: 2px;
        z-index: -1;
        background: #fff;
        -webkit-transition: -webkit-transform 0.2s, opacity 0.3s;
        -moz-transition: -moz-transform 0.2s, opacity 0.3s;
        transition: transform 0.2s, opacity 0.3s;
    }
`;

const StyleDropdown = styled(DropdownIcon)`
    text-align:center;
    // visibility:hidden;
    // @media only screen and (max-width:400px){
    //     visibility: visible;
    //     transform: translate(160px, -45px);
    // }
`;

const Footer = styled.div`
    text-align:center
`;

const propTypes = {};

const defaultProps = {};


const defaultNumIndex = 20;

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

class MainBody extends React.Component {
    _isMounted = false;
    categoryCount = 0;
    constructor(props) {
        super(props);
        this.state = {
            dropdownHeight: "128px",
            isDropdown: false,
            post: null,
            numIndex: localStorage.getItem("mNumPost") ? localStorage.getItem("mNumPost") : 20,
            // numIndex:20,
            nextPostLoading: false,
            reloadSnackOpen: false,
        }
    }

    componentDidMount = async () => {
        await this._getMainAllPosts();
        await setTimeout(() => {
            import('../../Scroll/SaveScrollPosition')
                .then(ret => ret.getScrollValY());
        }, 0);
    }

    categoryDropdown = () => {
        var navHeight = this.state.dropdownHeight === '128px' ? '410px' : '128px';
        this.setState({ dropdownHeight: navHeight, isDropdown: !this.state.isDropdown });
    }

    _getMainAllPosts = async () => {
        return shbApi.shb_getShbAllPostForAllBoundary(this.state.numIndex)
            .then(data => {
                if (data.message === 'success') {
                    this.setState({ post: data.data });
                } else if (data.message === 'none') {
                    this.setState({ post: null });
                } else {
                    alert('포스트 에러');
                }
            });


    }

    memoryScroll = () => {
        import('../../Scroll/SaveScrollPosition')
            .then(ret => ret.saveScrollZero());
    }

    nextPost = async () => {
        // window.localStorage.setItem("mNumPost",);
        await this.setState({ nextPostLoading: true });
        window.localStorage.setItem("mNumPost", Number(this.state.numIndex) + 20);
        await this.setState({ numIndex: window.localStorage.getItem("mNumPost") });
        await this._getMainAllPosts(this.state.numIndex);
        await this.setState({ nextPostLoading: false });

    }

    reloadPost = async () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        await this.setState({ numIndex: window.localStorage.getItem("mNumPost"), reloadSnackOpen: true });
        await this._getMainAllPosts(this.state.numIndex);

    }

    reloadSnackClose = async () => {
        await this.setState({ reloadSnackOpen: false });
    }

    render() {
        const beneLoading = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">image Loading...</span>
                </div>
            </div>
        );
        // console.log(this.state.post);
        // console.log(this.props.bannerHeader)
        return (
            <Container>
                <ContentsListPart
                    {...this.props}
                />
                {/* corona */}
                {/* <CoronaComponent/> */}
                <div className="container shadow-sm animate slideIn clearfix pb-5">
                    <div className="row">
                        <div className="col-md-9">
                            <div
                                id="carouselExampleControls"
                                className="carousel slide shadow-sm animate slideIn"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner mainBene">
                                    {this.props.bannerHeader ? this.props.bannerHeader.map((rows, index) => {
                                        if (rows && index === 0) {
                                            return (
                                                <div
                                                    className="carousel-item active main"
                                                    data-interval="4000"
                                                >
                                                    <img
                                                        // src={require("../../asset/6.jpg")}
                                                        src={rows.banner_image}
                                                        className="d-block bene_Big_Size"
                                                        alt="..."
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                className="carousel-item main"
                                                data-interval="4000"
                                            >
                                                <img
                                                    // src={require("../../asset/6.jpg")}
                                                    src={rows.banner_image}
                                                    className="d-block bene_Big_Size"
                                                    alt="..."
                                                />
                                            </div>
                                        );

                                    })

                                        :
                                        (beneLoading)

                                    }
                                </div>
                                <a
                                    className="carousel-control-prev"
                                    href="#carouselExampleControls"
                                    role="button"
                                    data-slide="prev"
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a
                                    className="carousel-control-next"
                                    href="#carouselExampleControls"
                                    role="button"
                                    data-slide="next"
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="mainSearch">
                                <MainSearch />
                            </div>
                            <div className="loginCard shadow-sm">
                                <LoginCard />
                            </div>
                        </div>
                    </div>


                    {/* 
                        Old version of contents lists
                    */}

                    {/* <div className="row">
                        <div className="col-md-9">
                            <div className='cardWrapper'>
                                <div className="card nav m-0" style={{ height: this.state.dropdownHeight }}> */}

                    {/* 
                                                *** 메인 카테고리 ***
                                            */}
                    {/* {this.props.shb_lists ? this.props.shb_lists.map(rows => {
                                        if (rows.shb_num === 1101001) {
                                            return (
                                                <StyledLink to={`/${rows.shb_classify}`} onClick={this.memoryScroll}>
                                                    <div className="item">
                                                        <div className="item_icon"> */}
                    {/* <Card_giftcard
                                                                        style={{
                                                                            fontSize: "50px"
                                                                        }}
                                                                    /> */}
                    {/* {rows.shb_icon_url ?
                                                                <img src={rows.shb_icon_url} width="50px" height="50px" /> :
                                                                <img src={`https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/noLogo.png`} width="50px" height="50px" />
                                                            }
                                                        </div>
                                                        <div className="item_name">
                                                            {rows.shb_name}
                                                        </div>
                                                    </div>
                                                </StyledLink>
                                            );
                                        }
                                    }) : ""} */}

                    {/* 
                                                *** 서브 메인 카테고리 ***
                                            */}
                    {/* {this.props.shb_main_items ? this.props.shb_main_items.map(rows => {
                                        if (rows) {
                                            return (
                                                <StyledLink to={`/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`} onClick={this.memoryScroll}>
                                                    <div className="item">
                                                        <div className="item_icon">
                                                            {rows.shb_item_icon_url ?
                                                                <img src={rows.shb_item_icon_url} width="50px" height="50px" /> :
                                                                <img src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`} width="50px" height="50px" />
                                                            }
                                                        </div>
                                                        <div className="item_name">{rows.shb_item_name}</div>
                                                    </div>
                                                </StyledLink>

                                            );
                                        }
                                    }) : ""} */}

                    {/* </div>
                                <button className='btn btn-lg btn-block shadow-sm' onClick={this.categoryDropdown}>
                                    {this.state.isDropdown ? <DropUpIcon /> : <StyleDropdown />}
                                </button>
                            </div>
                        </div> */}
                    {/* <div className="col-md-3">
                            <div className="right card shadow-sm">
                                forecast
                                {this.props.forecastBool?<Forecast />:"loading..."}
                            </div>
                        </div> */}
                    {/* </div> */}

                    <div className='row'>
                        <div className='col-md-9'>

                            <MainContentsSingleLists
                                {...this.props}
                            />
                        </div>
                    </div>
                    {/* <ITGPostList
                        {...this.props}
                        {...this.state}
                    /> */}
                    <RecomendPost
                        {...this.props}
                        {...this.state}
                    />
                    <MainPostList
                        {...this.props}
                        {...this.state}
                    />
                    <div className='text-center'>
                        {this.state.nextPostLoading ?
                            <CircularProgress />
                            :
                            this.state.post && this.state.post.length < this.state.numIndex ?
                                <div>
                                    <h5>마지막 포스터 입니다.</h5>
                                    <IconButton type='button' onClick={this.reloadPost}><RefreshIcon style={{ fontSize: '35px' }} /></IconButton>
                                </div>
                                :
                                <IconButton type='button' onClick={this.nextPost}><ExpandMoreIcon style={{ fontSize: '35px' }} /></IconButton>
                        }
                    </div>
                </div>
                <Snackbar
                    open={this.state.reloadSnackOpen}
                    onClose={this.reloadSnackClose}
                    TransitionComponent={TransitionUp}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={3000}
                    message={<span id="message-id">피드를 새로고침 하였습니다.</span>}
                />
                <hr />
                <Footer>
                    Icon support
                    <div>Material Icons : <a href='https://material.io/resources/icons' target='_blank'>www.material.io</a></div>
                    <div>
                        Flaticon : <a href="https://www.flaticon.com/" title="Flaticon" target='_blank'>www.flaticon.com</a>
                        <br />
                        (<a href="https://www.flaticon.com/authors/freepik" title="Freepik" target='_blank'>Freepik</a>, <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a>)
                    </div>
                </Footer>

            </Container>
        );
    }
}

export default MainBody;