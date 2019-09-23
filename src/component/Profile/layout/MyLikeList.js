import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

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
            likeList: '',
            startIndex:0,
            lastIndex:5,
        }

        this._getLikeList = this._getLikeList.bind(this);
        this._onHandleChageNext = this._onHandleChageNext.bind(this);
        this._onHandleChagePrev = this._onHandleChagePrev.bind(this);
        this._onHandleUnLike = this._onHandleUnLike.bind(this);
    }

    async componentDidMount() {
        await this._getLikeList()
    }

    _getLikeList() {
        return Axios.get('/api/post_like/get_list')
            .then(res => res.data)
            .then(data => this.setState({ likeList: data }));
    }

    _onHandleChageNext(){
        this.setState({startIndex:this.state.startIndex+5,lastIndex:this.state.lastIndex+5});
    }

    _onHandleChagePrev(){
        this.setState({startIndex:this.state.startIndex-5,lastIndex:this.state.lastIndex-5});
    }

    async _onHandleUnLike(post_id){
        if(this.props._isLogged){
            await Axios.post('/api/post_like/unlike',{
                post_id:post_id
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='unlike ok'){
                    this._getLikeList();
                }else{
                    console.log('LIKE FUNCTION IS ERROR');
                }
                
            })
            .catch(err=>{
                alert('네트워크 상태를 확인해 주세요. (*같은 문제가 계속 발생시 고객센터에 문의 바랍니다.)');
                // console.log(err);
            })
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
                <div className='list-group border p-3 __border_radius'>
                    <p>
                        {this.state.startIndex<=0?"":<button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrev}>이전</button>}
                        {this.state.likeList.length<=this.state.lastIndex?"":<button className="btn btn-outline-info float-right" onClick={this._onHandleChageNext}>다음</button>}
                    </p>
                    {this.state.likeList ? this.state.likeList.map((rows, index) => {
                        if(index >= this.state.startIndex && index < this.state.lastIndex){
                            return (
                                <div class="list-group-item __profile_field shadow-sm border p-3 mb-2 clearfix">
                                    <Link to={`/univ/${rows.univ_id}/${rows.post_type}/v/${rows.post_id}`} className="text-dark">
                                        <div className="table-bar_column clearfix">
                                            
                                            <span className="table-bar_writer"><span className='text-primary'>{index + 1}</span> {rows.post_type === 10002 ? <Notification_icon color="secondary" /> : ""}작성자: {rows.user_nickname}</span>
                                            {/* <span className="table-bar_time float-right">{calculateTime(new Date(), new Date(rows.post_created))}</span> */}
                                        </div>
                                        <div className="table-bar_column">
                                            <p className="font-weight-bold p-2 m-0">{rows.post_topic}</p>
                                        </div>
                                    </Link>
                                    <button className="float-right btn btn-outline-info" onClick={()=>this._onHandleUnLike(rows.post_id)}>좋아요 취소</button>
                                </div>
                            );
                        }
                        
                    }) : <h3>Loading...</h3>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        _isLogged: state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(MyLikeList);