import React from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
// import './DraftJs.css';
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
import FormatImageIcon from '@material-ui/icons/Image';

//Components
import Nav from '../Nav/Nav';
import CustomToolbar from './Toolbar';
import { MediaBlockRenderer } from './MediaBlockRenderer';

//Material Core
import Paper from '@material-ui/core/Paper';

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

class DraftJs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount = () => {
        this.focus();
    }
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
        console.log(e.target.files);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        Axios.post('/api/uploadimg/draft', formData, {
            // onUploadProgress: progressEvent => {
            //     console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            // }
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'success') {
                    this.onAddImage(data.url);
                }
            })
    }

    ImageButtonClick = (e) => {
        e.preventDefault();
        document.getElementById('file').click();
    }
    render() {
        
        return (
            <div>
                <Nav/>
                <div className='container'>
                    <Paper style={style.paperHeader}>
                        <button className="btn btn-primary" onClick={() => this.props.history.push('./')}>이전</button>
                    </Paper>
                    <Paper style={style.paperBody} className='clearfix'>
                        <form>
                            <p>작성지 : 공지사항 작성자 : 양태영</p>
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
                                    onTextStyle = {this.onTextStyle}
                                    onHeaderLeft = {this.onHeaderLeft}
                                    onHeaderRight = {this.onHeaderRight}

                                    onHeaderStyle={this.onHeaderStyle}

                                    onAddImage={this.onAddImage}
                                    onImageUpload={this.onImageUpload}
                                    ImageButtonClick={this.ImageButtonClick}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary float-right mt-2" value='제출' />
                            {/* DraftEditor End */}
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default DraftJs;