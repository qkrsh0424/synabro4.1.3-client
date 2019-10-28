import React from 'react';
import Axios from 'axios';

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

class MyPostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postList: '',
            startIndex: 0,
            lastIndex: 5,
        }
    }

    async componentDidMount() {
        await this._getPostList();
        
    }

    _getPostList = () => {
        return Axios.get(`${serverUrl}/api/auth/profile/mypostlist`,{
            params:{
                usid: this.props._sess
            }
        })
            .then(res => res.data)
            .then(data => {
                if(data[0].message==='success'){
                    this.setState({ postList: data })
                }else if(data.message==='error'){
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:messageError) 고객센터에 문의 바랍니다.');
                }else if(data.message==='invalidUser'){
                    alert('로그인이 기간이 만료 되었습니다. 로그인을 시도해 주세요.');
                    window.location.href='/login';
                }else{
                    alert('예상치 못한 오류가 발생했습니다.code(MPL:elseError) 고객센터에 문의 바랍니다.');
                }
                
            })
            .catch(err=>alert('서버 연결이 고르지 않습니다.'))
    }

    _onHandleChageNext = () => {
        this.setState({ startIndex: this.state.startIndex + 5, lastIndex: this.state.lastIndex + 5 });
    }

    _onHandleChagePrev = () => {
        this.setState({ startIndex: this.state.startIndex - 5, lastIndex: this.state.lastIndex - 5 });
    }

    render() {
        return (
            <div>
                <div className='border p-3 __border_radius mb-1'>
                    <h4 className='m-0'>작성한 글</h4>
                </div>
                <div className='list-group border p-3 __border_radius'>
                    <p>
                        {this.state.startIndex <= 0 ? "" : <button className="btn btn-outline-info float-left" onClick={this._onHandleChagePrev}>이전</button>}
                        {this.state.postList.length <= this.state.lastIndex ? "" : <button className="btn btn-outline-info float-right" onClick={this._onHandleChageNext}>다음</button>}
                    </p>
                    {this.state.postList ? this.state.postList.map((rows, index) => {
                        if (index >= this.state.startIndex && index < this.state.lastIndex) {
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
                                        <span className='float-left count_text'>
                                            좋아요[{rows.post_like_count}]
                                            댓글[{rows.post_comment_count}]
                                            조회수[{rows.post_view_count}]
                                        </span>
                                        {rows.post_image_count !== 0 ? <span className='float-right count_text'><PhotoLibraryOutlinedIcon style={{ fontSize: "20px" }} />({rows.post_image_count})</span> : ""}
                                    </Link>
                                    
                                </div>
                            );
                        }

                    }) : <h3>Loading...</h3>}
                    <br/>
                </div>
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