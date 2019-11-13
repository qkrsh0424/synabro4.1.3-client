import React from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

//redux
import {connect} from 'react-redux';
//URL
import {awsImageURL} from '../../../config/awsurl';
import {serverUrl} from '../../../config/serverUrl';
//react-router-dom
import { Link } from 'react-router-dom';
import Notification_icon from '@material-ui/icons/NotificationImportant';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';

//CSS
import '../ProfileBody.css';

//Core
import Divider from '@material-ui/core/Divider';

class MyPostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postList_Shb:null,
            postList_Univ: null,
            startIndexUniv: 0,
            lastIndexUniv: 5,
            startIndexShb: 0,
            lastIndexShb: 5,
        }
    }

    async componentDidMount() {
        await this._getPostListShb();
        await this._getPostListUniv();
        
    }

    _getPostListUniv = () => {
        return Axios.get(`${serverUrl}/api/auth/profile/mypostlist/univ`,{
            params:{
                usid: this.props._sess
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if(data[0].message==='success'){
                    this.setState({ postList_Univ: data })
                }else if(data[0].message==='error'){
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:messageError) 고객센터에 문의 바랍니다.');
                }else if(data[0].message==='invalidUser'){
                    alert('로그인이 기간이 만료 되었습니다. 로그인을 시도해 주세요.');
                    window.location.href='/login';
                }else if(data[0].message==='notPost'){
                    this.setState({ postList_Univ: data })
                }else{
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:elseError) 고객센터에 문의 바랍니다.');
                }
                
            })
            .catch(err=>alert('서버 연결이 고르지 않습니다.'))
    }

    _getPostListShb = () => {
        return Axios.get(`${serverUrl}/api/auth/profile/mypostlist/shb`,{
            params:{
                usid: this.props._sess
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if(data[0].message==='success'){
                    this.setState({ postList_Shb: data })
                }else if(data[0].message==='error'){
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:messageError) 고객센터에 문의 바랍니다.');
                }else if(data[0].message==='invalidUser'){
                    alert('로그인이 기간이 만료 되었습니다. 로그인을 시도해 주세요.');
                    window.location.href='/login';
                }else if(data[0].message==='notPost'){
                    this.setState({ postList_Shb: data })
                }else{
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:elseError) 고객센터에 문의 바랍니다.');
                }
                
            })
            .catch(err=>alert('서버 연결이 고르지 않습니다.'))
    }

    _onHandleChageNextUniv = () => {
        this.setState({ startIndexUniv: this.state.startIndexUniv + 5, lastIndexUniv: this.state.lastIndexUniv + 5 });
    }

    _onHandleChagePrevUniv = () => {
        this.setState({ startIndexUniv: this.state.startIndexUniv - 5, lastIndexUniv: this.state.lastIndexUniv - 5 });
    }
    _onHandleChageNextShb = () => {
        this.setState({ startIndexShb: this.state.startIndexShb + 5, lastIndexShb: this.state.lastIndexShb + 5 });
    }

    _onHandleChagePrevShb = () => {
        this.setState({ startIndexShb: this.state.startIndexShb - 5, lastIndexShb: this.state.lastIndexShb - 5 });
    }

    render() {
        return (
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>작성한 글</h4>
                </div>
                <div className='list-group border p-3 __border_radius mb-5'>
                    <h5 className='text-center'>일반 게시글</h5>
                    <p>
                        {this.state.startIndexShb <= 0 ? "" : <button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrevShb}>이전</button>}
                        {this.state.postList_Shb && this.state.postList_Shb.length <= this.state.lastIndexShb ? "" : <button className="btn btn-outline-info float-right" onClick={this._onHandleChageNextShb}>다음</button>}
                    </p>
                    {this.state.postList_Shb ? this.state.postList_Shb.map((rows, index) => {
                        if(rows.message==='success'){
                            if (index >= this.state.startIndexShb && index < this.state.lastIndexShb) {
                                if(rows.parent_route==='main'){
                                    return (
                                        <div class="list-group-item __profile_field __border_radius shadow-sm border p-3 mb-2">
                                            {rows.post_thumbnail_url==='none'?<img src={`${awsImageURL}/logo/imageNo2.gif`} className='float-right thumbnailImage'/> :<img src={rows.post_thumbnail_url} className='float-right thumbnailImage'/>}
                                            <Link to={`/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="text-dark">
                                                <div className="table-bar_column">
        
                                                    <span className="table-bar_writer">
                                                        <span className='text-primary'>{index + 1}</span> 
                                                        작성자: {rows.user_nickname.length > 6 ? `${rows.user_nickname.substring(0, 6)}...` : rows.user_nickname}
                                                        {rows.post_user_isSecret && rows.post_user_isSecret===1?
                                                            <span className='text-danger'> *익명</span>:
                                                            ""
                                                        }
                                                    </span>
                                                    {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                                </div>
                                                <div className="table-bar_column">
                                                    <div className="font-weight-bold p-2 m-0 clearfix">
                                                    {rows.post_title.length > 25 ?
                                                        `${rows.post_title.substring(0, 25)}...` :
                                                        rows.post_title
                                                    }
                                                    </div>
                                                    
                                                </div>
                                                <span className='float-left'>{rows.shb_name}/{rows.shb_item_name}</span>
                                                <span className='float-right count_text'>
                                                    좋아요[{rows.post_like_count}]
                                                    댓글[{rows.post_comment_count}]
                                                    조회수[{rows.post_view_count}]
                                                </span>
                                                {rows.post_image_count !== 0 ? <span className='float-right count_text'><PhotoLibraryOutlinedIcon style={{ fontSize: "20px" }} />({rows.post_image_count})</span> : ""}
                                            </Link>
                                            
                                        </div>
                                    );
                                }else{
                                    return (
                                        <div class="list-group-item __profile_field __border_radius shadow-sm border p-3 mb-2">
                                            {rows.post_thumbnail_url==='none'?<img src={`${awsImageURL}/logo/imageNo2.gif`} className='float-right thumbnailImage'/> :<img src={rows.post_thumbnail_url} className='float-right thumbnailImage'/>}
                                            <Link to={`/classify/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="text-dark">
                                                <div className="table-bar_column">
        
                                                    <span className="table-bar_writer">
                                                        <span className='text-primary'>{index + 1}</span> 
                                                        작성자: {rows.user_nickname.length > 6 ? `${rows.user_nickname.substring(0, 6)}...` : rows.user_nickname}
                                                        {rows.post_user_isSecret && rows.post_user_isSecret===1?
                                                            <span className='text-danger'> *익명</span>:
                                                            ""
                                                        }
                                                    </span>
                                                    {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                                </div>
                                                <div className="table-bar_column">
                                                    <div className="font-weight-bold p-2 m-0 clearfix">
                                                    {rows.post_title.length > 25 ?
                                                        `${rows.post_title.substring(0, 25)}...` :
                                                        rows.post_title
                                                    }
                                                    </div>
                                                    
                                                </div>
                                                <span className='float-left'>{rows.shb_name}/{rows.shb_item_name}</span>
                                                <span className='float-right count_text'>
                                                    좋아요[{rows.post_like_count}]
                                                    댓글[{rows.post_comment_count}]
                                                    조회수[{rows.post_view_count}]
                                                </span>
                                                {rows.post_image_count !== 0 ? <span className='float-right count_text'><PhotoLibraryOutlinedIcon style={{ fontSize: "20px" }} />({rows.post_image_count})</span> : ""}
                                            </Link>
                                            
                                        </div>
                                    );
                                }
                                
                            }
                        }else if(rows.message==='notPost'){
                            return(
                                <p>등록된 게시물이 없습니다.</p>
                            );
                        }
                    }) : ""}
                    <br/>
                </div>
                {this.state.postList_Univ && this.state.postList_Univ[0].message!=="notPost"?
                    <div className='list-group border p-3 __border_radius'>
                        <h5 className='text-center'>대학교 게시글</h5>
                        <p>
                            {this.state.startIndexUniv <= 0 ? "" : <button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrevUniv}>이전</button>}
                            {this.state.postList_Univ && this.state.postList_Univ.length <= this.state.lastIndexUniv ? "" : <button className="btn btn-outline-info float-right" onClick={this._onHandleChageNextUniv}>다음</button>}
                        </p>
                        {this.state.postList_Univ ? this.state.postList_Univ.map((rows, index) => {
                            if(rows.message==='success'){
                                if (index >= this.state.startIndexUniv && index < this.state.lastIndexUniv) {
                                    return (
                                        <div class="list-group-item __profile_field __border_radius shadow-sm border p-3 mb-2">
                                            {rows.post_thumbnail_url==='none'?<img src={`${awsImageURL}/logo/imageNo2.gif`} className='float-right thumbnailImage'/> :<img src={rows.post_thumbnail_url} className='float-right thumbnailImage'/>}
                                            <Link to={`/univ/${rows.univ_id}/${rows.post_type}/v/${rows.post_id}`} className="text-dark">
                                                <div className="table-bar_column">

                                                    <span className="table-bar_writer"><span className='text-primary'>{index + 1}</span> {rows.post_type === 10002 ? <Notification_icon color="secondary" /> : ""}작성자: {rows.user_nickname.length > 6 ? `${rows.user_nickname.substring(0, 6)}...` : rows.user_nickname}</span>
                                                    {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                                </div>
                                                <div className="table-bar_column">
                                                    <div className="font-weight-bold p-2 m-0 clearfix">
                                                    {rows.post_topic.length > 25 ?
                                                        `${rows.post_topic.substring(0, 25)}...` :
                                                        rows.post_topic
                                                    }
                                                    </div>
                                                    
                                                </div>
                                                <span className='float-left'>{rows.univ_title}/{rows.univ_item_title}</span>
                                                <span className='float-right count_text'>
                                                    좋아요[{rows.post_like_count}]
                                                    댓글[{rows.post_comment_count}]
                                                    조회수[{rows.post_view_count}]
                                                </span>
                                                {rows.post_image_count !== 0 ? <span className='float-right count_text'><PhotoLibraryOutlinedIcon style={{ fontSize: "20px" }} />({rows.post_image_count})</span> : ""}
                                            </Link>
                                            
                                        </div>
                                    );
                                }
                            }else if(rows.message==='notPost'){
                                return(
                                    <p>등록된 게시물이 없습니다.</p>
                                );
                            }
                        }) : ""}
                        <br/>
                </div>
                :""}
                
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(MyPostList);