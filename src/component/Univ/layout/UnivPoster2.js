import React from "react";
import styled from "styled-components";
import Axios from 'axios';

//URL
import {awsImageURL} from '../../../config/awsurl';
import { serverUrl } from '../../../config/serverUrl';

import { connect } from "react-redux";
import renderHTML from 'react-render-html';
// import Loader from "../../Loader";
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';
import { calculateTime } from "../../../controler/calculateTime";
// import profile from '../../../images/1.png';
// import MenuList from './MenuList';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import '../UnivPoster2.css';

import Comments from '../../Comments';

import SingleLineGrid from './SingleLineGrid/SingleLineGrid';

// DraftJs
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { MediaBlockRendererReadOnly } from '../../PostEditorV1_Univ/MediaBlockRenderer';


const Container = styled.div`
height: 100vh;
width: 80vw;
margin: 30px auto;
border : 1px solid rgb(222, 222, 222);
padding: 0.5rem;


`;

const Header = styled.div`
border-bottom : 1px dashed black;
text-align: left;
padding: 0 0 3px 3px;
margin-bottom: 0.5em;
`;

const User = styled.div`
display: flex;
justify-content: space-between;
margin-bottom : 1rem;
`;

const User_pro = styled.div`
display: flex;
`;

const Img = styled.div`

border-radius:8px;

margin-right: 5px;
`;
const User_name = styled.div`
font-size:12px;
opacity:0.7;
margin-left:8px;
`;

const Text = styled.div`
    
`;
const User_id = styled.div``;
const Post_time = styled.div`
font-size : 8px;
`;

const Emoji_bar = styled.div`
margin-bottom:10px;
margin-top:5rem;
`;

const Command_input = styled.div`
border : 3px solid #192a56;
height:10rem;
display: flex;
justify-content:center;
align-self:center;
align-items:center;
font-size: 30px;
color: #718093;
`;

// const Commands = styled.div`
// margin-top : 10px;
// border: 1px solid #8c7ae6;
// height : 100px;
// `;

// const Grid =styled.div`
// padding: 8px;
// `;

const PaperBody = styled.div`
padding: 1rem;
font-size: 1rem;
`;

const PaperHeader = styled.div`
padding: 1rem;
font-size: 1.5rem;
`;

class UnivPoster2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: null,
            board_title:null,
            loading: true,
            commentData:'',
            comment:'',
            openSnacbar:false,
            postListData:'',
            editorState: EditorState.createEmpty(),
        };
        this._getPostId = this._getPostId.bind(this);
        this._getBoardTitle = this._getBoardTitle.bind(this);
    }


    async componentDidMount() {
        await Promise.all([this._getPostListAPI(),this.updatePostCountPlus(),this._getPostId(), this._getBoardTitle(),this._getCommentAPI()])
            .then(([postListData,viewCountRes,res1, res2, res3]) => this.setState({ postListData:postListData,postData: res1, board_title: res2.univ_item_title, comment:res3 }))
            .catch(err=>{
                alert('서버와 연결이 좋지 않습니다.');
                this.setState({loading:true});
            });
        await this.setState({loading:false});
        
    }

    async componentDidUpdate(prevProps){
        if (prevProps.post_id !== this.props.post_id) {
            await this.setState({loading:true});
            await Promise.all([this._getPostListAPI(),this.updatePostCountPlus(),this._getPostId(), this._getBoardTitle(),this._getCommentAPI()])
            .then(([postListData,viewCountRes,res1, res2, res3]) => this.setState({ postListData:postListData,postData: res1, board_title: res2.univ_item_title, comment:res3 }))
            await this.setState({loading:false});
        }
    }

    _getPostListAPI = async()=>{
        return Axios.get(`${serverUrl}/api/univ_post/` + this.props.univ_id + '/btpost', {
            params: {
                usid: this.props._sess,
                board_type: this.props.board_type,
                startPostIndex: 0,
                currentPostIndex: 6
            }
        })
            .then(response => response.data);
    }
    updatePostCountPlus = async() =>{
        return Axios.patch(`${serverUrl}/api/univ_post/postCountPlus/`,{
            post_id:this.props.post_id
        })
        .then(res=>res.data);
    }

    _getPostId() {
        return Axios.get(`${serverUrl}/api/univ_post/post/${this.props.post_id}`,{
            params:{
                usid: this.props._sess,
                head_type: this.props.univ_id,
            }
        })
            .then(res=>res.data);
    }

    _getBoardTitle() {
        return Axios.get(`${serverUrl}/api/univ_item/` + this.props.univ_id, {
            params: {
                board_type: this.props.board_type
            }
        })
        .then(response => response.data);
    }

    _getCommentAPI = async()=>{
        return Axios.get(`${serverUrl}/api/comment/univ_post_comment`,{
            params:{
                usid:this.props._sess,
                post_id: this.props.post_id
            }
        })
        .then(res=>res.data)
    }
    _writeComment = async(e) =>{
        e.preventDefault();
        // console.log(this.props._sess);
        await Axios.post(`${serverUrl}/api/comment/univ_post_comment`,{
            
            usid: this.props._sess,
            cmt_desc:this.state.commentData,
            post_id:this.props.post_id,
            head_type:this.props.univ_id
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                this._getCommentAPI().then(res=>this.setState({comment:res}));
                this._getPostId().then(data=>this.setState({postData:data}));
                this.setState({commentData:''});
            }else if(data.message==='failure'){
                alert('댓글 입력 오류입니다. 다시 시도해 주세요.');
                window.location.reload();
            }else if(data.message==='non-user'){
                alert('로그인이 필요한 서비스 입니다.');
                window.location.href='/login';
            }else if(data.message==='error'){
                alert('네트워크 연결이 고르지 못합니다. 다시 시도해 주세요.');
                window.location.reload();
            }else{
                alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.) error num : cmt1');
            }
        })
        .catch(err=>{
            alert('서버와 연결이 고르지 못합니다. 다시 시도해 주세요.');
        })
    }

    _onHandleCommentDataChange = (e) =>{
        let nextState={};
        nextState[e.target.name] = e.target.value;
        this.setState({commentData:nextState.commentData});
    }

    _DelComment = async(head_type,cmt_id) =>{
        await Axios.delete(`${serverUrl}/api/comment/univ_post_comment`,{
            params:{
                cmt_id:cmt_id,
                head_type:head_type,
                post_id:this.props.post_id
            }
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                this.setState({openSnacbar:true});
                this._getCommentAPI().then(res=>this.setState({comment:res}));
                this._getPostId().then(data=>this.setState({postData:data}));
            }else if(data.message==='failure'){
                alert('댓글 삭제 오류입니다. 다시 시도해 주세요.');
                window.location.reload();
            }else{
                alert('예상치 못한 오류가 발생했습니다. (*고객센터에 문의 바랍니다.)');
            }
        })
        .catch(err=>{
            alert('서버와 연걸이 고르지 못합니다. 다시 시도해 주세요.');
        })
    }

    handleSnacbarClose=async()=>{
        await this.setState({openSnacbar:false});
    }

    async _onHandleLike(univ_id,post_id){
        if(this.props._isLogged){
            await Axios.post(`${serverUrl}/api/post_like/like`,{
                usid:this.props._sess,
                head_type:univ_id,
                post_id:post_id,
                parentType:'univ'
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='like ok'){
                    this._getPostId()
                    .then(data=>this.setState({postData:data}))
                    .catch(err=>{
                        if(err){
                            alert('서버와 연결이 좋지 않습니다.');
                        }
                    });
                }else if(data.message==='like fail'){
                    alert('이미 좋아하는 포스터 입니다.');
                }else{
                    console.log('LIKE FUNCTION IS ERROR');
                }
            });
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }
    }

    async _onHandleUnLike(univ_id,post_id){
        if(this.props._isLogged){
            await Axios.post(`${serverUrl}/api/post_like/unlike`,{
                usid:this.props._sess,
                head_type:univ_id,
                post_id:post_id,
                parentType:'univ'
            })
            .then(res=>res.data)
            .then(data=>{
                if(data.message==='unlike ok'){
                    this._getPostId()
                    .then(data=>this.setState({postData:data}))
                    .catch(err=>{
                        if(err){
                            alert('서버와 연결이 좋지 않습니다.');
                        }
                    });
                    
                }else{
                    console.log('LIKE FUNCTION IS ERROR');
                }
                
            });
        }else{
            alert('로그인이 필요한 서비스 입니다.');
            window.location.href='/login';
        }
    }

    scrollMoveToComment = async() =>{
        document.getElementById('comment_part').scrollIntoView({
            behavior: 'smooth'
          });
    }

    onEditorChange=()=>{
        this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.postData[0].post_desc)))});
    }

    render() {
        const style = {
            paperHeader: {
                padding: '1rem',
                fontSize: '1.5rem'
            },
            paperBody: {
                padding: '1rem',
                fontSize: '1rem'
            },
            Grid: {
                padding: '8px'
            }
        }

            return (
                <div>
                    <div className='table-body animate slideIn clearfix'>
                        {this.state.postData && this.state.loading===false? this.state.postData.map(row => {
                            if (row !== null) {
                                var currentDate = new Date();
                                var createDate = new Date(row.post_created);
                                return (
    
                                    <div className='container animate slideIn'>
                                        <div style={style.Grid}>
                                            {/* <Grid>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                >
                                                    <Grid item xs={12} sm={12}>
                                                        <Paper style={style.paperHeader}>
                                                            {this.state.board_title?this.state.board_title:"Loading.."}
                                                        </Paper>
                                                    </Grid>
    
                                                    <Grid item xs={12} sm={9} className='clearfix'>
                                                        <div className="table-bar p-3 mb-2 shadow-sm hover_animate">
    
                                                            <Header>
                                                                <div className="Header-bar">{row.post_topic} | {row.post_type}</div>
                                                            </Header>
                                                            <User>
                                                                <User_pro>
                                                                    <User_name>
                                                                        <User_id>{row.user_id.substring(0, 4)}</User_id>
                                                                        <Post_time>{calculateTime(currentDate, createDate)}</Post_time>
                                                                    </User_name>
                                                                </User_pro>
                                                            </User>
                                                            <Text
                                                                className="_TextField"
                                                            >
                                                                {renderHTML(row.post_desc)}
                                                            </Text>
                                                            <Emoji_bar>
                                                                <a href="#" className="text-secondary"><ThumbUp_icon /></a>
                                                                &nbsp;
                                                                <a href="#" className="text-secondary"><Comment_icon /></a>
                                                                &nbsp;
                                                                <span href="#" className="text-secondary"><Eye_icon /></span>
                                                            </Emoji_bar>
                                                            <Command_input>
                                                                넣어줭
                                                            </Command_input>
                                                            <Commands>
                                                                댓글들 나오는창
                                                            </Commands>
    
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3}>
                                                        <div className='jumbotron'>
                                                            hi
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid> */}
                                            <Paper style={style.paperHeader}>
                                                {this.state.board_title?this.state.board_title:"Loading.."}
                                            </Paper>
    
                                            <div className="table-bar p-3 mb-2 shadow-sm">
                                                <Header>
                                                    <div className="Header-bar">{row.post_topic}</div>
                                                </Header>
                                                <User>
                                                    <User_pro>
                                                        <img src={`${awsImageURL}/logo/peopleNo.png`} height="40px" width="40px"/>
                                                        <User_name>
                                                            <User_id>{row.user_nickname}</User_id>
                                                            <Post_time>{calculateTime(currentDate, createDate)}</Post_time>
                                                        </User_name>
                                                    </User_pro>
                                                    {/* <div>
                                                        <MenuList />
                                                    </div> */}
                                                </User>
                                                <Text
                                                    className="_TextField"
                                                >
                                                    {/* {renderHTML(row.post_desc)} */}
                                                    <Editor
                                                        blockRendererFn={MediaBlockRendererReadOnly}
                                                        editorState={this.state.editorState}
                                                        onChange={this.onEditorChange}
                                                        readOnly
                                                    />
                                                </Text>
                                                <Emoji_bar>
                                                    {row.like==='on'?<a onClick={()=>this._onHandleUnLike(row.univ_id,row.post_id)} className="text-secondary"><ThumbUpOn_icon /> {row.post_like_count}</a>:
                                                    <a onClick={()=>this._onHandleLike(row.univ_id,row.post_id)} className="text-secondary"><ThumbUpOff_icon/> {row.post_like_count}</a>}
                                                    &nbsp;
                                                    <a onClick={()=>this.scrollMoveToComment()} className="text-secondary"><Comment_icon /> {row.post_comment_count}</a>
                                                    &nbsp;
                                                    <span href="#" className="text-secondary"><Eye_icon />{row.post_view_count}</span>
                                                </Emoji_bar>
                                                <hr/>
                                                <SingleLineGrid
                                                    postListData={this.state.postListData}
                                                />
                                                <hr/>
                                                <div id='comment_part'>
                                                    <Comments 
                                                        head_type={this.props.univ_id}
                                                        commentData = {this.state.commentData}
                                                        comment = {this.state.comment}
                                                        _writeComment = {this._writeComment}
                                                        _onHandleCommentDataChange = {this._onHandleCommentDataChange}
                                                        _DelComment = {this._DelComment}
                                                    />
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                );
                            }
                        }) :
                            (<p>Loading...</p>)
                        }
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                        open={this.state.openSnacbar}
                        onClose={this.handleSnacbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">댓글이 삭제 되었습니다.</span>}
                    />
                </div>
            );
        
    }
}

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged : state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(UnivPoster2);