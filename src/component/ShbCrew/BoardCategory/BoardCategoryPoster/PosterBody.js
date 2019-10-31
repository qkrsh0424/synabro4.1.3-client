import React from 'react';
import styled from 'styled-components';

//URL 
import {awsImageURL} from '../../../../config/awsurl';

//Controler
import {calculateTime} from '../../../../controler/calculateTime'
// DraftJs
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { MediaBlockRendererReadOnly } from '../../../PostEditorV1_Common/MediaBlockRenderer';

//Router Dom
import {Link} from 'react-router-dom';

//Core
import Paper from '@material-ui/core/Paper';

//Icons
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';

//Component
import Comments from './Comments';

const Header = styled.div`
border-bottom : 1px dashed black;
text-align: left;
padding: 10px 3px;
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

const User_name = styled.div`
font-size:12px;
opacity:0.7;
margin-left:8px;
`;

const User_id = styled.div``;
const Post_time = styled.div`
font-size : 8px;
`;

const Emoji_bar = styled.div`
margin-bottom:10px;
margin-top:5rem;
`;

class PosterBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount() {

    }
    onEditorChange = () => {
        // console.log(this.props.post);
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post[0].post_desc))) });
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
            <div className='container animate slideIn clearfix CrewPoster' style={style.Grid}>
                <div className='jumbotron mt-3 shadow bg-light HeaderPart'>
                    {this.props.shb?
                        <h3 className='text-center clearfix'>
                            <Link to={`/crew/contype/${this.props.shb.shb_num}`} className='Text'>
                                <span>{this.props.shb.shb_name}</span>
                            </Link>
                            {/* <button className='float-right'>B</button> */}
                        </h3>:
                        ""}
                </div>
                <Paper style={style.paperHeader}>
                    {this.props.categoryTitle?this.props.categoryTitle:"Loading.."}
                </Paper>
                {this.props.post ? this.props.post.map(row => {
                    var currentDate = new Date();
                    var createDate = new Date(row.post_created);

                    return (
                        <div className="p-3 mb-2 shadow-sm">
                            <Header>
                                <div className="Header-bar">{row.post_title}</div>
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
                            <div
                                className="_TextField"
                            >
                                <Editor
                                    blockRendererFn={MediaBlockRendererReadOnly}
                                    editorState={this.state.editorState}
                                    onChange={this.onEditorChange}
                                    readOnly
                                />
                                <Emoji_bar>
                                    {row.like==='on'?<a onClick={()=>this.props._handleLikeOff(row.shb_num, row.post_id)} className="text-secondary"><ThumbUpOn_icon /> {row.post_like_count}</a>:
                                    <a onClick={()=>this.props._handleLikeOn(row.shb_num, row.post_id)} className="text-secondary"><ThumbUpOff_icon/> {row.post_like_count}</a>}
                                    &nbsp;
                                    <a onClick={()=>this.props._scrollMoveToComment()} className="text-secondary"><Comment_icon /> {row.post_comment_count}</a>
                                    &nbsp;
                                    <span href="#" className="text-secondary"><Eye_icon />{row.post_view_count}</span>
                                </Emoji_bar>
                                <hr/>
                                <div id='comment_part'>
                                    <Comments 
                                        head_type={row.shb_num}
                                        commentData = {this.props.commentData}
                                        comment = {this.props.comment}
                                        _writeComment = {this.props._writeComment}
                                        _onHandleCommentDataChange = {this.props._onHandleCommentDataChange}
                                        _DelComment = {this.props._DelComment}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }) : "loading"}
            </div>
        );
    }
}

export default PosterBody;