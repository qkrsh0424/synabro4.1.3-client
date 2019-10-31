import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

//URL
import {serverUrl} from '../../../config/serverUrl';
import { calculateTime } from '../../../controler/calculateTime';

import Notification_icon from '@material-ui/icons/NotificationImportant';
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';

import {connect} from 'react-redux';

class MyLikeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likeListUniv: null,
            likeListShb:null,
            startIndexShb:0,
            lastIndexShb:5,
            startIndexUniv:0,
            lastIndexUniv:5,
        }

    }

    async componentDidMount() {
        await this._getLikeListShb();
        await this._getLikeListUniv();
    }

    _getLikeListShb = () =>{
        return Axios.get(`${serverUrl}/api/post_like/get_list/shb`,{
            params:{
                usid: this.props._sess
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => this.setState({ likeListShb: data }));
    }

    _getLikeListUniv = () =>{
        return Axios.get(`${serverUrl}/api/post_like/get_list/univ`,{
            params:{
                usid: this.props._sess
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => this.setState({ likeListUniv: data }));
    }

    _onHandleChageNextShb = () => {
        this.setState({startIndexShb:this.state.startIndexShb+5,lastIndexShb:this.state.lastIndexShb+5});
    }

    _onHandleChagePrevShb = () =>{
        this.setState({startIndexShb:this.state.startIndexShb-5,lastIndexShb:this.state.lastIndexShb-5});
    }

    _onHandleChageNextUniv = () => {
        this.setState({startIndexUniv:this.state.startIndexUniv+5,lastIndexUniv:this.state.lastIndexUniv+5});
    }

    _onHandleChagePrevUniv = () =>{
        this.setState({startIndexUniv:this.state.startIndexUniv-5,lastIndexUniv:this.state.lastIndexUniv-5});
    }

    _onHandleUnLike = async(head_type,post_id, parentType) =>{
        if(this.props._isLogged){
            if(parentType && parentType==='univ'){
                await Axios.post(`${serverUrl}/api/post_like/unlike`,{
                    usid: this.props._sess,
                    head_type:head_type,
                    post_id:post_id,
                    parentType:'univ'
                },{
                    headers:{
                        Authorization:'Bearer ' + AuthKey
                    }
                })
                .then(res=>res.data)
                .then(data=>{
                    if(data.message==='unlike ok'){
                        this._getLikeListUniv();
                    }else{
                        console.log('LIKE FUNCTION IS ERROR');
                    }
                    
                })
                .catch(err=>{
                    alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                    // console.log(err);
                });
            }else{
                await Axios.post(`${serverUrl}/api/post_like/unlike`,{
                    usid: this.props._sess,
                    head_type:head_type,
                    post_id:post_id,
                },{
                    headers:{
                        Authorization:'Bearer ' + AuthKey
                    }
                })
                .then(res=>res.data)
                .then(data=>{
                    if(data.message==='unlike ok'){
                        this._getLikeListShb();
                    }else{
                        console.log('LIKE FUNCTION IS ERROR');
                    }
                    
                })
                .catch(err=>{
                    alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                    // console.log(err);
                });
            }
            
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }
    }

    render() {
        return (
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>좋아요 목록</h4>
                </div>
                <div className='list-group border p-3 __border_radius mb-5'>
                    <h5 className='text-center'>일반 게시글</h5>
                    <p>
                        {this.state.startIndexShb<=0?"":<button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrevShb}>이전</button>}
                        {this.state.likeListShb && this.state.likeListShb.length<=this.state.lastIndexShb?"":<button className="btn btn-outline-info float-right" onClick={this._onHandleChageNextShb}>다음</button>}
                    </p>
                    {this.state.likeListShb && this.state.likeListShb.length>0?"":<p>등록된 좋아요가 없습니다.</p>}
                    {this.state.likeListShb ? this.state.likeListShb.map((rows, index) => {
                        if(index >= this.state.startIndexShb && index < this.state.lastIndexShb){
                            return (
                                <div class="list-group-item __profile_field __border_radius shadow-sm border p-3 mb-2 clearfix">
                                    <Link to={`/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="text-dark">
                                        <div className="table-bar_column clearfix">
                                            
                                            <span className="table-bar_writer"><span className='text-primary'>{index + 1}</span>작성자: {rows.user_nickname}</span>
                                            {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                        </div>
                                        <div className="table-bar_column">
                                            <p className="font-weight-bold p-2 m-0">{rows.post_title}</p>
                                        </div>
                                    </Link>
                                    <button className="float-right btn btn-outline-info" onClick={()=>this._onHandleUnLike(rows.shb_num, rows.post_id)}>좋아요 취소</button>
                                </div>
                            );
                        }
                    }) : <h3>Loading...</h3>}
                    <br/>
                </div>

                {this.state.likeListUniv && this.state.likeListUniv.length>0?
                    (
                        <div className='list-group border p-3 __border_radius'>
                            {console.log(this.state.likeListUniv.length)}
                            <h5 className='text-center'>대학교 게시글</h5>
                            <p>
                                {this.state.startIndexUniv<=0?"":<button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrevUniv}>이전</button>}
                                {this.state.likeListUniv && this.state.likeListUniv.length<=this.state.lastIndexUniv?"":<button className="btn btn-outline-info float-right" onClick={this._onHandleChageNextUniv}>다음</button>}
                            </p>
                            {this.state.likeListUniv ? this.state.likeListUniv.map((rows, index) => {
                                if(index >= this.state.startIndexUniv && index < this.state.lastIndexUniv){
                                    return (
                                        <div class="list-group-item __profile_field __border_radius shadow-sm border p-3 mb-2 clearfix">
                                            <Link to={`/univ/${rows.univ_id}/${rows.post_type}/v/${rows.post_id}`} className="text-dark">
                                                <div className="table-bar_column clearfix">
                                                    
                                                    <span className="table-bar_writer"><span className='text-primary'>{index + 1}</span> {rows.post_type === 10002 ? <Notification_icon color="secondary" /> : ""}작성자: {rows.user_nickname}</span>
                                                    {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                                </div>
                                                <div className="table-bar_column">
                                                    <p className="font-weight-bold p-2 m-0">{rows.post_topic}</p>
                                                </div>
                                            </Link>
                                            <button className="float-right btn btn-outline-info" onClick={()=>this._onHandleUnLike(rows.univ_id, rows.post_id, "univ")}>좋아요 취소</button>
                                        </div>
                                    );
                                }
                            }) : <h3>Loading...</h3>}
                            <br/>
                        </div>
                    )
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

export default connect(mapStateToProps)(MyLikeList);