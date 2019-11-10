import React from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';


import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//API
import * as api from '../../handler/cliApi/shb';

//URL
import { serverUrl } from '../../config/serverUrl';

//queryString
import queryString from 'query-string';

//Draft Material
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, SelectionState } from 'draft-js';
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';

//Draft Plugin Load
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createColorBlockPlugin from './colorBlockPlugin';
import createAddLinkPlugin from './addLinkPlugin';

//Draft CSS
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import '../StyleCss/Draftjs.css';

//Draft Handler
import {
    myBlockStyleFn
} from '../DraftPlugIn';
import createHighlightPlugin from '../DraftPlugIn/highlightPlugin';
import createTextColorPlugin from '../DraftPlugIn/textColorPlugin';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import { MediaBlockRenderer } from './MediaBlockRenderer';

//Components
import Nav from '../Nav/Nav';
import CustomToolbar from './Toolbar';
import ImageUploadLoading from './ImageUploadLoading';

//Material Core
import Paper from '@material-ui/core/Paper';
import Progress from '@material-ui/core/CircularProgress';

//API
import { shb_getShbOneItem, shb_getShbOnePost } from '../../handler/cliApi/shb';
import { __sendPost, __modifyPost } from '../../handler/cliApi/PostApi';

//Use Draft Plugin Start
const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const alignmentPlugin = createAlignmentPlugin();
const hightlightPlugin = createHighlightPlugin();
const textColorPlugin = createTextColorPlugin();


const { AlignmentTool } = alignmentPlugin;
const { Toolbar } = staticToolbarPlugin;


const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const colorBlockPlugin = createColorBlockPlugin({ decorator });
const imagePlugin = createImagePlugin({ decorator });


const plugins = [
    staticToolbarPlugin,
    blockDndPlugin,
    focusPlugin,
    imagePlugin,
    alignmentPlugin,
    colorBlockPlugin,
    createAddLinkPlugin,
    hightlightPlugin,
    textColorPlugin
];

//Use Draft Plugin End

class HeadlinesPicker extends React.Component {
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <div>
                {buttons.map((Button, i) => // eslint-disable-next-line
                    <Button key={i} {...this.props} />
                )}
            </div>
        );
    }
}

class HeadlinesButton extends React.Component {
    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div className={'headlineButtonWrapper'}>
                <button onClick={this.onClick} className={'headlineButton'}>
                    H
                </button>
            </div>
        );
    }
}

// const staticToolbarPlugin = createToolbarPlugin();
// const { Toolbar } = staticToolbarPlugin;

// const plugins = [
//     staticToolbarPlugin
// ];

class DraftJs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            queryValues: queryString.parse(this.props.location.search),
            board: '',
            postData: null,
            post_topic: '',
            TYPE_OF_POST: '',
            imgUploadLoading: false,
            poster_isValidation: false,
        }
    }

    componentDidMount = async () => {
        await this._posterValidation();
        await shb_getShbOneItem(this.state.queryValues.Category, this.state.queryValues.BomNo)
            .then(data => {
                if (data.message === 'success') {
                    this.setState({ board: data.data, TYPE_OF_POST: data.data.parent_route });
                } else {
                    window.location.href = '/error'
                }

            });
        await this._getPostId();

        if (this.state.postData) {
            await this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.postData[0].post_desc))), post_topic: this.state.postData[0].post_title });
        }

    }

    _posterValidation = async () => {
        if (this.props._isLogged) {
            return api.shb_posterValidationAndMenuControl(this.props._sess, this.state.queryValues.postView, this.state.queryValues.BomNo)
                .then(data => {
                    if (data === 'valid') {
                        this.setState({ poster_isValidation: true });
                    } else if (data === 'invalid') {
                        alert('올바르지 않은 접근 방식 입니다.');
                        window.location.href = '/';
                        this.setState({ poster_isValidation: false });
                    } else if (data === 'error') {
                        alert('올바르지 않은 접근 방식 입니다.');
                        window.location.href = '/';
                        return;
                    } else {
                        return;
                    }
                })
        }
    }

    _getPostId = () => {
        return shb_getShbOnePost(this.props._sess, this.state.queryValues.postView)
            .then(data => this.setState({ postData: data }))
    }

    //Common Control Start
    onHanldeTitleChange = async (e) => {
        await this.setState({ post_topic: e.target.value });
    }
    // Common Control End

    // EditorControl Start
    onEditorChange = (editorState) => {

        this.setState({ editorState });
    }

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onEditorChange(newState);
            return "handled";
        }
        return "not-handled";
    };
    //Draft Editor Style Handle Function Start
    onTextStyle = (styleType) => {
        this.onEditorChange(
            RichUtils.toggleInlineStyle(this.state.editorState, styleType)
        );
    }

    onHeaderStyle = (headerType) => {
        this.onEditorChange(
            RichUtils.toggleBlockType(this.state.editorState, headerType)
        );
    }

    onHeaderAlignment = (alignment) => {

        this.onEditorChange(
            RichUtils.toggleBlockType(this.state.editorState, alignment)
        );
    }

    onHeaderTextColor = (color) => {
        this.onEditorChange(
            RichUtils.toggleInlineStyle(this.state.editorState, color)
        );
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

    //Draft Editor Style Handle Function END



    // focus = () => this.refs.editor.focus();
    focus = () => {
        this.editor.focus();
    };

    onURLChange = e => this.setState({ urlValue: e.target.value });

    onAddImage = (url) => {
        document.getElementById('file').value = '';

        const editorState = this.state.editorState;
        const urlValue = url;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "image",
            "IMMUTABLE",
            { src: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            "create-entity"
        );
        this.setState(
            {
                editorState: AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " "
                )
            },
            () => {
                setTimeout(() => {
                    this.focus();
                }, 0);
            }
        );
    };
    onImageUpload = async (e) => {
        this.setState({ imgUploadLoading: true });
        // console.log(e.target.files[1]);
        let filesize = e.target.files.length;
        const formData = new FormData();
        // formData.append(`file`, e.target.files[0]);

        for (let i = 0; i < filesize; i++) {
            let filedata = e.target.files[i];
            formData.append(`file`, filedata);
        }
        await Axios.post(`${serverUrl}/api/uploadimg/draft-oss`, formData, {
            // onUploadProgress: progressEvent => {
            //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            // }
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'successOne') {
                    this.onAddImage(data.url);
                    this.setState({ imgUploadLoading: false });
                } else if (data.message === 'successMultiple') {

                    for (let i = 0; i < data.dataLength; i++) {
                        this.onAddImage(data.url[i]);
                    }
                    this.setState({ imgUploadLoading: false });
                } else if (data.message === 'failure') {
                    this.setState({ imgUploadLoading: false });
                    alert('서버가 좋지 않습니다. code: (IU:1)');
                } else {
                    this.setState({ imgUploadLoading: false });
                    alert('예상치 못한 오류가 발생했습니다. code: (IU:2)');
                }
            }).catch(err => {
                this.setState({ imgUploadLoading: false });
                alert('연결 시간이 초과 되었습니다. 네트워크를 다시 확인해 주십시오.');
            })
    }

    ImageButtonClick = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    }
    // EditorControl End

    setConvertToJson = () => {
        let contentState = this.state.editorState.getCurrentContent();
        let raw = convertToRaw(contentState);
        let jsonResult = JSON.stringify(raw, null, 2);
        // console.log(jsonResult);
        return jsonResult;
    }

    //Go To PostRoute
    onHandleSubmit = async (e) => {
        e.preventDefault();
        let jsonType = this.setConvertToJson();
        if (window.confirm("정말로 포스팅 하시겠습니까?")) {
            //Go To PostRoute
            await __modifyPost(
                this.state.TYPE_OF_POST,
                this.props._sess,
                this.state.queryValues.BomNo,
                this.state.queryValues.Category,
                this.state.queryValues.postView,
                this.state.post_topic,
                jsonType
            )
                .then(data => {
                    // console.log(data.message);
                    if (data.message === 'success') {
                        setTimeout(() => window.history.back(), 1000);
                    } else if (data.message === 'failure') {
                        alert('정상적이지 않은 포스팅 입니다...');
                    } else if (data.message === 'invalidUser') {
                        alert('로그인이 기간이 만료 되었습니다.');
                        window.location.href = '/login';
                    } else {
                        alert('포스팅 에러');
                        window.location.reload();
                    }
                });
        } else {
            return;
        }

    }
    render() {
        // console.log(this.state.postData);
        const style = {
            paperHeader: {
                marginTop: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                fontSize: '1.5rem'
            },
            paperBody: {
                padding: '1rem',
                marginBottom: '1rem',
                fontSize: '1rem'
            },
        }

        if (this.props._isLogged) {
            if (this.state.poster_isValidation) {
                return (
                    <div>
                        {this.state.imgUploadLoading ?
                            <ImageUploadLoading
                                imgUploadLoading={this.state.imgUploadLoading}
                            /> : ""}
                        <Nav />
                        <div className='container'>
                            <Paper style={style.paperHeader}>
                                <button className="btn btn-primary" onClick={() => window.history.back()}>이전</button>
                            </Paper>
                            <Paper style={style.paperBody} className='clearfix'>
                                <form onSubmit={this.onHandleSubmit}>
                                    <p>작성지 : {this.state.board ? `${this.state.board.shb_name} / ${this.state.board.shb_item_name}` : ""} </p>
                                    <p>작성자 : {this.state.postData ? this.state.postData[0].user_nickname : ""}</p>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroup-sizing-sm">제목</span>
                                        </div>
                                        <input
                                            type="text"
                                            // name='post_topic'
                                            className="form-control"
                                            value={this.state.post_topic}
                                            onChange={this.onHanldeTitleChange}
                                            required />
                                    </div>

                                    {/* DraftEditor Start */}
                                    <div onClick={this.focus} className={'editor'}>
                                        {this.state.postData ?
                                            <Editor
                                                blockRendererFn={MediaBlockRenderer}
                                                blockStyleFn={myBlockStyleFn}
                                                editorState={this.state.editorState}
                                                onChange={this.onEditorChange}
                                                handleKeyCommand={this.handleKeyCommand}
                                                plugins={plugins}
                                                // ref="editor"
                                                ref={(element) => { this.editor = element; }}
                                            />
                                            :
                                            ""}
                                        <AlignmentTool />

                                    </div>
                                    {/* <Toolbar>
                                        {
                                            // may be use React.Fragment instead of div to improve perfomance after React 16
                                            (externalProps) => (
                                                <div>
                                                    <BoldButton {...externalProps} />
                                                    <ItalicButton {...externalProps} />
                                                    <UnderlineButton {...externalProps} />
                                                    <CodeButton {...externalProps} />
                                                    <Separator {...externalProps} />
                                                    <HeadlinesButton {...externalProps} />
                                                    <UnorderedListButton {...externalProps} />
                                                    <OrderedListButton {...externalProps} />
                                                    <BlockquoteButton {...externalProps} />
                                                    
                                                </div>
                                            )
                                        }
    
                                    </Toolbar> */}
                                    <div className='customToolbar'>
                                        <CustomToolbar
                                            onTextStyle={this.onTextStyle}
                                            onHeaderAlignment={this.onHeaderAlignment}
                                            onHeaderTextColor={this.onHeaderTextColor}
                                            onHeaderLink={this.onHeaderLink}

                                            onHeaderStyle={this.onHeaderStyle}

                                            onAddImage={this.onAddImage}
                                            onImageUpload={this.onImageUpload}
                                            ImageButtonClick={this.ImageButtonClick}
                                        />
                                    </div>
                                    {this.state.imgUploadLoading === true ?
                                        <button className="btn btn-primary float-right" disabled>제출</button>
                                        :
                                        <input type="submit" className="btn btn-primary float-right mt-2" value='제출' />}

                                    {/* DraftEditor End */}
                                </form>
                            </Paper>
                        </div>
                        {/* <button onClick={()=>this.setState({imgUploadLoading:!this.state.imgUploadLoading})}>button Loading</button> */}
                    </div>
                );
            } else {
                return (
                    <></>
                );
            }

        } else {
            alert('로그인이 필요한 페이지입니다.');
            return (
                <Redirect to='/login' />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _id: state.auth_user._id,
        _nickname: state.auth_user._nickname
    }
}

export default connect(mapStateToProps)(DraftJs);