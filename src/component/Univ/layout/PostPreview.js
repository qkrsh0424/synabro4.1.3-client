import React from 'react';
import '../PostPreview.css';
import renderHTML from 'react-render-html';

// DraftJs
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { MediaBlockRenderer } from '../../PostEditorV1_Univ/MediaBlockRenderer';

export default class PostPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editorState : EditorState.createEmpty()
        }
    }
    onEditorChange=()=>{
        this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.post_desc)))});
    }
    render(){        
        return(
            <div>
                <button type="button" className="btn btn-outline-info btn-sm rounded-pill float-right" data-toggle="modal" data-target={".modal_preview"+this.props.post_id}>{this.props.btn_name}</button>
                <div className={"modal fade"+" modal_preview"+this.props.post_id} tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content modal_top">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.post_topic}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='_TextField'>
                                    {/* {renderHTML(this.props.post_desc)} */}
                                    <Editor
                                        blockRendererFn={MediaBlockRenderer}
                                        editorState={this.state.editorState}
                                        onChange={this.onEditorChange}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
