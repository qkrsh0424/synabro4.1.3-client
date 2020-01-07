import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import LoginCard from "../../Login/LoginCard";


const Container = styled.div`
    margin-top: 8px;
`;
const Col_md = styled.div`
  position: relative;
  width: 45%;
  margin-right: 15px;
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 15px;
  border-right: 1px solid gray;

  :nth-child(2n+1) {
    margin-right: 0px;
    border-right: none;
  }
  @media (min-width: 800px) {
    flex: 0 0 23%;
    width: 23%;
    text-align: center;
    

    :nth-child(2n+1) {
      border-right: 1px solid gray;
  }
    :nth-child(4n+1) {
      border-right: none;
    }
  }
`;

const IndexBanner = styled.div`
  margin-bottom: 30px;
  padding-top: 30px;
`;

const StyledBox = styled.div`
  background-color: gray;
  height: 100%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const IndexCard = styled.div`
  width: 100%;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
  padding: 15px;
  text-align:center;
  margin:0 15px 15px 15px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  :active {
    text-decoration: none;
    color: gray;
  }

  :hover {
    color: #636e72;
    
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

const ViewCard = styled.div`
    padding:10px 20px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    font-size:13px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const Boadrs = styled.div`
    width:100%;
    padding-bottom:1rem;

`;


const ContentsListsBody = (props) => {
    const { shb_main_items } = props;
    const n = shb_main_items.length;
    const itemRow = 6;
    const itemList = Math.floor(n / itemRow + 1);
    // for(let i=1; i=itemRow ; i++){
    //     const array[i] = shb_main_items.slice([i-1] * itemList, [i] * itemList);
    // }
    const array1 = shb_main_items.slice(0 * itemList, 1 * itemList);
    const array2 = shb_main_items.slice(1 * itemList, 2 * itemList);
    const array3 = shb_main_items.slice(2 * itemList, 3 * itemList);
    const array4 = shb_main_items.slice(3 * itemList, 4 * itemList);
    const array5 = shb_main_items.slice(4 * itemList, 5 * itemList);
    const array6 = shb_main_items.slice(5 * itemList, n);
    const arrays = [array1, array2, array3, array4, array5, array6];

    return (
            <Container className="container shadow-sm clearfix pb-5">
                    <IndexBanner>
                        <div className="row">
                            <div className="col-md-9">
                                <StyledBox />
                                {/* <StyledBox /> */}
                            </div>
                            <div className="col-md-3">
                                <div className="loginCard shadow-sm">
                                    <LoginCard />
                                </div>
                            </div>
                        </div>
                    </IndexBanner>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">

                                <IndexCard>
                                    <Boadrs>
                                        <h3 className="text-center">전체 게시판</h3>
                                    </Boadrs>
                                    {arrays
                                        ? arrays.map(array => (
                                            <Col_md>
                                                {array.map(rows => {
                                                    if (rows) {
                                                        return (
                                                            <>
                                                                <StyledLink
                                                                    to={`/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`}
                                                                    // onClick={this.memoryScroll}
                                                                >
                                                                    <div className="item">
                                                                        <div className="item_name">
                                                                            {rows.shb_item_name}
                                                                        </div>
                                                                    </div>
                                                                </StyledLink>
                                                            </>
                                                        );
                                                    }
                                                })}
                                            </Col_md>
                                        ))
                                        : ""}
                                </IndexCard>
                            </div>
                        </div>
                        {props._isLogged ?

                            <div className="col-md-3 shadow-md table-bar_column">
                                <ViewCard>
                                    <Boadrs>
                                        <h6 className="text-md-center">최근 본 게시물</h6>
                                    </Boadrs>
                                    현재 준비중에 있습니다.
                                    {/* {this.props.postHistory_Shb
                                        ? this.props.postHistory_Shb.slice(0, 11).map((rows, index) => {
                                            return (
                                                <Link
                                                    to={`/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`}
                                                    className="text-dark"
                                                >
                                                    <div className="">
                                                        <div className="p-1 m-0 clearfix font-size-120">
                                                            {rows.post_title.length > 20
                                                                ? `${rows.post_title.slice(0, 20)}...`
                                                                : rows.post_title}
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                        : ""} */}
                                    {/* <Link to="/profile/posthistory"><p className="text-md-right pt-2">최근 본 게시물 더보기</p></Link> */}
                                </ViewCard>
                            </div>
                            :
                            <div className="col-md-3 shadow-md table-bar_column">
                                <ViewCard>
                                    <h6 className="text-md-center">최근 본 게시물</h6>
                                    <p>로그인이 필요합니다.</p>
                                    {/* {this.props.randomPost
                                        ? this.props.randomPost.slice(0,11).map((rows, index) => {
                                            return (
                                                <Link
                                                    to={`/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`}
                                                    className="text-dark"
                                                >
                                                    <div className="">
                                                    <div className="p-1 m-0 clearfix font-size-120">
                                                        {rows.post_title.length > 20
                                                        ? `${rows.post_title.slice(0,20)}...`
                                                        : rows.post_title}
                                                    </div>
                                                    </div>
                                                </Link>
                                            );
                                            })
                                            : ""} */}
                                    {/* <Link to="/profile/posthistory"><p className="text-md-right">최근 본 게시물 더보기</p></Link> */}
                                </ViewCard>
                            </div>
                        }
                    </div>
            </Container>
    );
}

const mapStateToProps = (state)=>{
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged
    }
  }

export default connect(mapStateToProps)(ContentsListsBody);