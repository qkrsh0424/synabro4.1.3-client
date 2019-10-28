import React from "react";
import PropTypes from "prop-types";

//router dom
import { Link } from "react-router-dom";

//Style
import styled from "styled-components";

//Material Core
import { IconButton } from "@material-ui/core";

//Icons
import searchIcon from '@material-ui/icons/Search';
import Card_giftcard from "@material-ui/icons/CardGiftcard";
import Language from "@material-ui/icons/Translate";
import Contact from "@material-ui/icons/ContactPhone";
import DropdownIcon from '@material-ui/icons/ArrowDownward';
import DropUpIcon from '@material-ui/icons/ArrowUpward';

//Component
import Forecast from "../Forecast";
import MainSearch from "../../MainSearch/FullDialog";
import LoginCard from '../../Login/LoginCard';
import MainPostCard1 from './MainPostCard1';
import MainPostCard2 from './MainPostCard2';

const Container = styled.div`
    padding-top: 30px;

    .box {
        background-color: red;
    }

    .mainBene {
        font-size: 200px;
        max-height: 283px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        padding: 0px;
        background-color: #636e72;
        color: #636e72;
    }
    input {
        width: 100%;
        margin-bottom: 3px;
    }
    .card {
        background-color: white;
        margin: 0 0 2rem;
        border: none;
        /* min-width: 255px; */
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
    }

    .cardWrapper{
        background-color: white;
        margin: 0 0 2rem;
        border: none;
        box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
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
        height: 283px;
        border: none;
        padding: 0px 0px;
        border-radius: 0.25rem;
    }
    .main {
        max-height: 283px;
        background-color: #636e72;
        color: white;
    }
    .nav {
        /* display:flex; */
        flex-wrap: wrap;
        overflow: auto;
        overflow-y: hidden;
        weight: 825px;
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
const propTypes = {};

const defaultProps = {};

class MainBody extends React.Component {
    _isMounted = false;
    categoryCount = 0;
    constructor(props) {
        super(props);
        this.state = {
            dropdownHeight: "128px",
            isDropdown: false
        }
    }
    categoryDropdown = () => {
        var navHeight = this.state.dropdownHeight === '128px' ? '410px' : '128px';
        this.setState({ dropdownHeight: navHeight, isDropdown: !this.state.isDropdown });
    }

    render() {
        const beneLoading = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">image Loading...</span>
                </div>
            </div>
        );
        return (
            <Container>
                <div className="container shadow-sm animate slideIn clearfix">
                    <div className="row">
                        <div className="col-md-9">
                            <div
                                id="carouselExampleControls"
                                className="carousel slide shadow-sm animate slideIn"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner card mainBene">
                                    <div
                                        className="carousel-item active main"
                                        data-interval="4000"
                                    >
                                        <img
                                            // src={require("../../asset/6.jpg")}
                                            src={"https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/bannerImage/synabrologo2.png"}
                                            className="d-block bene_Big_Size"
                                            alt="..."
                                        />
                                    </div>

                                    <div className="carousel-item main" data-interval="4000">
                                        {/* <div
                                            src={require("../../asset/6.jpg")}
                                            className="d-block bene_Big_Size"
                                            alt="..."
                                            /> */}
                                        상해봄
                                    </div>
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
                            <div className="loginCard">
                                <LoginCard />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-9">
                            <div className='cardWrapper'>
                                <div className="card nav m-0" style={{ height: this.state.dropdownHeight }}>

                                    {/* 
                                                *** 메인 카테고리 ***
                                            */}
                                    {this.props.shb_lists ? this.props.shb_lists.map(rows => {
                                        if (rows.shb_num === 1101001) {
                                            return (
                                                <StyledLink to={`/${rows.shb_classify}`}>
                                                    <div className="item">
                                                        <div className="item_icon">
                                                            {/* <Card_giftcard
                                                                        style={{
                                                                            fontSize: "50px"
                                                                        }}
                                                                    /> */}
                                                            {rows.shb_icon_url ?
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
                                    }) : ""}

                                    {/* 
                                                *** 서브 메인 카테고리 ***
                                            */}
                                    {this.props.shb_main_items ? this.props.shb_main_items.map(rows => {
                                        if (rows) {
                                            return (
                                                <StyledLink to={`/${rows.parent_route}/category/${rows.shb_item_id}`}>
                                                    <div className="item">
                                                        <div className="item_icon">
                                                            {rows.shb_item_icon_url ?
                                                                <img src={rows.shb_item_icon_url} width="50px" height="50px" /> :
                                                                <img src={`https://synabrodemo.s3.ap-northeast-2.amazonaws.com/synabrologo/noLogo.png`} width="50px" height="50px" />
                                                            }
                                                        </div>
                                                        <div className="item_name">{rows.shb_item_name}</div>
                                                    </div>
                                                </StyledLink>

                                            );
                                        }
                                    }) : ""}

                                </div>
                                <button className='btn btn-lg btn-block shadow-sm' onClick={this.categoryDropdown}>
                                    {this.state.isDropdown ? <DropUpIcon /> : <StyleDropdown />}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="right card">
                                forecast
                                {this.props.forecastBool?<Forecast />:"loading..."}
                            </div>
                        </div>
                    </div>
                    <h3>상해봄</h3>
                    <div className="row">
                        {this.props.shb_main_items?this.props.shb_main_items.map((rows,index)=>{
                            if(index<3)
                                return(
                                    <MainPostCard1
                                        category={rows}
                                    />
                                );
                        })
                            :
                            "loading"
                        }
                        
                        {/* 베너 오는곳 */}
                        <div className="col-md-3">
                            <div className="right card">banner</div>
                            <div className="right card">banner</div>
                        </div>
                    </div>

                    <h3>대학교</h3>
                    <div className="row">
                        {this.props.univ_lists?this.props.univ_lists.map((rows,index)=>{
                            return(
                                <MainPostCard2
                                    univ={rows}
                                />
                            );
                        }):""}
                        
                        {/* <div className="col-md-4">
                            <div className="card board">
                                <div className="board_title">제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card board">
                                <div className="board_title">제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                            </div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card board">
                                <div className="board_title">제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card board">
                                <div className="board_title">제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card board">
                                <div className="board_title">제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                                <div className="post title">포스트제목</div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="right card">bene</div>
                            <div className="right card">bene</div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="card board poster">
                                <div className="board_title">문화</div>
                                <p className="board_desc">문화생활 하는 포스터 </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card board poster">
                                <div className="board_title">전시회</div>
                                <p className="board_desc">상해의 전시회 포스터</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card board poster">
                                <div className="board_title">대학생창업</div>
                                <p className="board_desc">
                                    당신의 프로젝트를 알려주세요! 저희가 홍보해 드리겠습니다.
                                        </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="right card">bene</div>
                            <div className="right card">bene</div>
                        </div>
                    </div>

                </div>
            </Container>
        );
    }
}

export default MainBody;