import React from 'react';
import styled from 'styled-components';
//URL 
import { awsImageURL } from '../../../../config/awsurl';

//Controler
import { calculateTime } from '../../../../controler/calculateTime';
import handleStorageToFileName from '../../../../controler/hadleStorageToFileName';

// DraftJs
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';
import { MediaBlockRendererReadOnly,MediaBlockRenderer } from '../../../PostEditorV1_Common/MediaBlockRenderer';

//Draft Plugin Load
import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createAddLinkPlugin from '../../../PostModifyV1_Main/addLinkPlugin';
import createColorBlockPlugin from '../../../PostEditorV1_Common/colorBlockPlugin';

//Draft CSS
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import '../../../StyleCss/Draftjs.css';

//Draft Handler
import { myBlockStyleFn } from '../../../DraftPlugIn';
import createHighLightPlugin from '../../../DraftPlugIn/highlightPlugin';
import createTextColorPlugin from '../../../DraftPlugIn/textColorPlugin';
import createFontSizePlugin from '../../../DraftPlugIn/fontSizePlugin';

//Core
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import CopyToClipboard from 'react-copy-to-clipboard';

//Icons
import ThumbUpOff_icon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpOn_icon from '@material-ui/icons/ThumbUpAlt';
import Comment_icon from '@material-ui/icons/Comment';
import Eye_icon from '@material-ui/icons/RemoveRedEye';
import Share_icon from '@material-ui/icons/Share';

//Component
import Comments from './Comments';
import PosterMenuControl from './PosterMenuControl';

//Use Draft Plugin Start
const alignmentPlugin = createAlignmentPlugin();
const highLightPlugin = createHighLightPlugin();
const textColorPlugin = createTextColorPlugin();
const resizeablePlugin = createResizeablePlugin();
const fontSizePlugin = createFontSizePlugin();

const decorator = composeDecorators(
    alignmentPlugin.decorator,
    resizeablePlugin.decorator,
);

const colorBlockPlugin = createColorBlockPlugin({ decorator });
const imagePlugin = createImagePlugin({ decorator });


const plugins = [
    imagePlugin,
    alignmentPlugin,
    highLightPlugin,
    textColorPlugin,
    resizeablePlugin,
    colorBlockPlugin,
    createAddLinkPlugin,
    fontSizePlugin
];

//Use Draft Plugin End
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
margin-top:1rem;
`;

class PosterBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount = async() =>{
        if(this.props.post){
            await setTimeout(
                ()=>this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post[0].post_desc))) })
            ,0)
        }
    }
    // EditorControl Start
    onEditorChange = (editorState) => {
        this.setState({ editorState });
    }

    onHeaderLink = () => {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('링크를 입력하세요. (*http:// 생략)')
        if (!link) {
            this.onEditorChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onEditorChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }

    render() {
        // console.log(this.state.editorState.getCurrentContent().getPlainText(' '));
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
            <div className='container animate slideIn clearfix CommonPosterPart' style={style.Grid}>
                <Paper style={style.paperHeader}>
                    {this.props.categoryTitle ? this.props.categoryTitle : <button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button>}
                </Paper>
                {this.props.post ? this.props.post.map(row => {
                    var currentDate = new Date();
                    var createDate = new Date(row.post_created);

                    return (
                        <div className="p-3 mb-2 shadow-sm">
                            <Header className='clearfix'>
                                <div className="Header-bar">
                                    <span className='float-left'>{row.post_title}</span>
                                    
                                    <span className='float-right'>
                                        {this.props._isLogged ?
                                            <PosterMenuControl
                                                {...this.state}
                                                {...this.props}
                                                _deleteMyPoster={this.props._deleteMyPoster}
                                            /> : ""
                                        }
                                    </span>
                                </div>

                            </Header>
                            <User>
                                <User_pro>
                                    <img src={`${awsImageURL}/logo/peopleNo.png`} height="40px" width="40px" />
                                    <User_name>
                                        <User_id>
                                            {row.post_user_isSecret && row.post_user_isSecret === 1 ?
                                                '익명' :
                                                row.user_nickname
                                            }
                                        </User_id>
                                        <Post_time>{calculateTime(currentDate, createDate)}</Post_time>
                                    </User_name>
                                </User_pro>
                                {/* <div>
                                    <MenuList />
                                </div> */}
                                <CopyToClipboard text={window.location.href}>
                                    <a class="btn btn-outline-secondary float-right">
                                            <Share_icon/>
                                    </a>
                                </CopyToClipboard>
                            </User>
                            <div
                                className="_TextField clearfix"
                            >
                                {this.props.post[0]?
                                    <Editor
                                        blockRendererFn={MediaBlockRenderer}
                                        blockStyleFn={myBlockStyleFn}
                                        editorState={this.state.editorState}
                                        onChange={this.onEditorChange}
                                        plugins={plugins}
                                        readOnly
                                    />
                                :""}
                            </div>
                            {row.post_materials?
                                <div>
                                    <p><strong>첨부파일</strong></p>
                                    <ul>
                                    {row.post_materials.map(mat=>{
                                        
                                        return(
                                            <li>
                                                <a href={mat.url} target='_black' download>{mat.name}</a>
                                            </li>
                                        )
                                        
                                    })}
                                    </ul>
                                </div>
                            :""}
                            
                            <Emoji_bar>
                                {row.like === 'on' ? <a onClick={() => this.props._handleLikeOff(row.shb_num, row.post_id)} className="text-secondary"><span id='currentLikeOn'><ThumbUpOn_icon /></span> {row.post_like_count}</a> :
                                    <a onClick={() => this.props._handleLikeOn(row.shb_num, row.post_id)} className="text-secondary"><span id="currentLikeOff"><ThumbUpOff_icon /></span> {row.post_like_count}</a>}
                                &nbsp;
                                    <a onClick={() => this.props._scrollMoveToComment()} className="text-secondary"><Comment_icon /> {row.post_comment_count}</a>
                                &nbsp;
                                    <span href="#" className="text-secondary"><Eye_icon />{row.post_view_count}</span>
                            </Emoji_bar>
                            <hr />
                            <div id='comment_part'>
                                <Comments
                                    head_type={row.shb_num}
                                    commentData={this.props.commentData}
                                    comment={this.props.comment}
                                    _writeComment={this.props._writeComment}
                                    _onHandleCommentDataChange={this.props._onHandleCommentDataChange}
                                    _DelComment={this.props._DelComment}
                                />
                            </div>
                        </div>
                    );
                }) : <div className='text-center mt-4'><CircularProgress/></div>}

            </div>
        );
    }
}

export default PosterBody;