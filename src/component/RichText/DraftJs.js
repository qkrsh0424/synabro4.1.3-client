import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import { RichUtils,convertFromRaw, convertToRaw, convertFromHTML, convertToHTML, CompositeDecorator } from 'draft-js';

import styled from 'styled-components';
import Toolbar from './DraftJs/Toolbar';

import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

import * as handleDeco from './DraftJs/handler'

import './TextAreaDemo.css';
const EditorWrapper = styled.div`
    min-width: 700px;
    display: flex;
    height: fit-content;
    flex-direction: column;
    margin-top:3em;
    margin-bottom:3em;
`;

const EditorContainer = styled.div`
    display: flex;
    min-height:9em;
    border-radius: 0 0 3px 3px;
    background-color: #fff;
    padding: 5px;
    font-size: 17px;
    font-weight: 300;
    box-shadow: 0px 0px 3px 1px rgba(15, 15, 15, 0.17);
`;
class DraftJs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            imageData: '',
            resultEditorState: EditorState.createEmpty(),
        };

    }

    updateEditorState = (editorState) => {
        this.setState({ editorState });
    }

    handleKeyCommand = (command) =>{
        const { editorState } = this.state;

        const newContent = RichUtils.handleKeyCommand(editorState, command);
        if (newContent) {
            this.handleEditorChange(newContent); // .. update editor state ...
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    getImageData = (e) => {
        this.setState({ imageData: e.target.files[0] });
    }

    uploadImage = () => {
        const formData = new FormData();
        formData.append('file', this.state.imageData, this.state.imageData.name);

        Axios.post('/api/uploadimg/draft', formData, {
            onUploadProgress: progressEvent => {
                console.log(Math.round((progressEvent.loaded / progressEvent.total) * 100))
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
            .then(res => res.data)
            .then(data => {
                if (data.message === 'success') {
                }
            })
    }

    toServer = () => {
        const decorator = new CompositeDecorator([
            {
                strategy: handleDeco.findLinkEntities,
                component: handleDeco.Link,
            },
            {
                strategy: handleDeco.findImageEntities,
                component: handleDeco.Image,
            },
        ]);

        let contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        let jsonResult = JSON.stringify(raw, null, 2);
        Axios.post('/api/uploadimg/draft/submit', {
            data: jsonResult
        },{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res => res.data)
            .then(data => {
                console.log(data);
                this.setState({ resultEditorState: EditorState.createWithContent(convertFromRaw(data), decorator) })
            })
    }

    pushData = () => {
        const decorator = new CompositeDecorator([
            {
                strategy: handleDeco.findLinkEntities,
                component: handleDeco.Link,
            },
            {
                strategy: handleDeco.findImageEntities,
                component: handleDeco.Image,
            },
        ]);

        const sampleMarkup =
            '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
            '<a href="http://www.facebook.com">Example link</a>' +
            '<img src="https://ddpf5wamlzit3.cloudfront.net/logo/peopleNo.png">';

        const blocksFromHTML = convertFromHTML(sampleMarkup);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        const result = EditorState.createWithContent(state, decorator);
        console.log(result);
        this.setState({ editorState: result });
    }

    render() {
        console.log(this.state.editorState.getCurrentContent());
        let contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        console.log(JSON.stringify(raw, null, 2));
        return (
            <div className='container'>
                <EditorWrapper>
                    <Toolbar
                        editorState={this.state.editorState}
                        updateEditorState={this.updateEditorState}
                    />
                    <input type="file" name="imgfile" onChange={this.getImageData} />
                    <button onClick={this.uploadImage}>upload</button>
                    <EditorContainer>

                        <Editor
                            // placeholder="editor"
                            editorState={this.state.editorState}
                            onChange={this.updateEditorState}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                    </EditorContainer>
                    <Editor
                        editorState={this.state.resultEditorState}
                        readOnly='true'
                    />
                </EditorWrapper>
                <div>
                    <button onClick={this.toServer}>send</button>
                    <button onClick={this.pushData}>push</button>
                </div>
            </div>
        );
    }
}



export default DraftJs;