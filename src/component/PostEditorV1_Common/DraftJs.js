import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//URL
import { serverUrl } from '../../config/serverUrl';

//queryString
import queryString from 'query-string';

//Draft Material
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, SelectionState } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import './DraftJs.css';
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
import { shb_getShbOneItem } from '../../handler/cliApi/shb';
import { __sendPost } from '../../handler/cliApi/PostApi';

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

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const plugins = [
    staticToolbarPlugin
];

class DraftJs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            queryValues: queryString.parse(this.props.location.search),
            board: '',
            post_topic: '',
            TYPE_OF_POST:'',
            imgUploadLoading: false
        }
    }

    componentDidMount = async () => {
        await shb_getShbOneItem(this.state.queryValues.Category)
            .then(data => {
                this.setState({ board: data.data, TYPE_OF_POST:data.data.parent_route });
                // this.focus();
            });
        
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

    onHeaderLeft = () => {
        this.onEditorChange(
            RichUtils.toggleBlockType(this.state.editorState, "align-left")
        );
    }

    onHeaderRight = () => {
        console.log('right');
        this.onEditorChange(
            RichUtils.toggleBlockType(this.state.editorState, "align-right")
        );
    }



    focus = () => this.refs.editor.focus();

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
        let filesize=e.target.files.length;
        const formData = new FormData();
        // formData.append(`file`, e.target.files[0]);

        for(let i=0; i< filesize;i++){
            let filedata = e.target.files[i];
            formData.append(`file`, filedata);
        }
        await Axios.post(`${serverUrl}/api/uploadimg/draft-oss`, formData, {
            // onUploadProgress: progressEvent => {
            //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            // }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'successOne') {
                    this.onAddImage(data.url);
                    this.setState({ imgUploadLoading: false });
                }else if(data.message ==='successMultiple'){
                    
                    for(let i=0;i<data.dataLength;i++){
                        this.onAddImage(data.url[i]);
                    }
                    this.setState({ imgUploadLoading: false });
                }else if(data.message==='failure'){
                    this.setState({ imgUploadLoading: false });
                    alert('서버가 좋지 않습니다. code: (IU:1)');
                }else{
                    this.setState({ imgUploadLoading: false });
                    alert('예상치 못한 오류가 발생했습니다. code: (IU:2)');
                }
            }).catch(err=>{
                this.setState({ imgUploadLoading: false });
                alert('연결 시간이 초과 되었습니다. 네트워크를 다시 확인해 주십시오.');
            })
    }

    ImageButtonClick = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    }
    // EditorControl End

    setConvertToJson = () =>{
        let contentState = this.state.editorState.getCurrentContent();
        let raw = convertToRaw(contentState);
        let jsonResult = JSON.stringify(raw, null, 2);
        // console.log(jsonResult);
        return jsonResult;
    }

    //Go To PostRoute
    onHandleSubmit = async(e) =>{
        e.preventDefault();
        let jsonType = this.setConvertToJson();
        if(window.confirm("정말로 포스팅 하시겠습니까?")){
            //Go To PostRoute
            await __sendPost(
                this.state.TYPE_OF_POST,
                this.props._sess,
                this.state.queryValues.BomNo, 
                this.state.queryValues.Category, 
                this.state.post_topic, 
                jsonType
                )
            .then(data => {
                console.log(data.message);
                if (data.message === 'success') {
                    this.props.history.push('./');
                }else if(data.message==='failure'){
                    alert('정상적이지 않은 포스팅 입니다...');
                }else if(data.message==='invalidUser'){
                    alert('로그인이 기간이 만료 되었습니다.');
                    window.location.href='/login';
                }else {
                    alert('포스팅 에러');
                    window.location.reload();
                }
            });
        }else{
            return;
        }
        
    }
    render() {
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
            return (
                <div>
                    {this.state.imgUploadLoading ?
                        <ImageUploadLoading
                            imgUploadLoading={this.state.imgUploadLoading}
                        /> : ""}
                    <Nav />
                    <div className='container'>
                        <Paper style={style.paperHeader}>
                            <button className="btn btn-primary" onClick={() => this.props.history.push('./')}>이전</button>
                        </Paper>
                        <Paper style={style.paperBody} className='clearfix'>
                            <form onSubmit={this.onHandleSubmit}>
                                <p>작성지 : {this.state.board?this.state.board.shb_item_name:""} 작성자 : {this.props._nickname}</p>
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
                                    <Editor
                                        blockRendererFn={MediaBlockRenderer}
                                        editorState={this.state.editorState}
                                        onChange={this.onEditorChange}
                                        handleKeyCommand={this.handleKeyCommand}
                                        plugins={plugins}
                                        ref="editor"
                                    />

                                </div>
                                <Toolbar>
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
                                                <CodeBlockButton {...externalProps} />
                                            </div>
                                        )
                                    }

                                </Toolbar>
                                <div className='customToolbar'>
                                    <CustomToolbar
                                        onTextStyle={this.onTextStyle}
                                        onHeaderLeft={this.onHeaderLeft}
                                        onHeaderRight={this.onHeaderRight}

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