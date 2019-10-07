import React from 'react';
import './TextAreaDemo.css';
import ContentEditable from 'react-contenteditable'

class TextAreaDemo extends React.Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
        this.state = { html: "<div>ad</div>" };

    };

    // componentDidMount() {
    //     document.addEventListener('keydown', this.handleKeyPress);
    // }

    handleChange = evt => {
        console.log(this.refs.editor.selectionStart)
        this.setState({ html: evt.target.value });
    };

    addimg = () =>{
        this.setState({html:this.state.html+`<div><img src="https://ddpf5wamlzit3.cloudfront.net/logo/peopleNo.png"/></div>`});
    }

    lookhtml = () =>{
        console.log(this.state.html);
    }

    textcenter = () =>{
        let node = window.getSelection().anchorNode
        // if(document.getElementById('editor').children[0].style.textAlign==='center'){
        //     document.getElementById('editor').children[0].style.textAlign='left';
        // }else{
        //     document.getElementById('editor').children[0].style.textAlign='center';
        // }
        // document.getElementById('editor').node.style.textAlign='center';
        // console.log(window.getSelection().focusNode.parentElement.style.color='red');
        
        var target = document.getElementById("editor").getElementsByTagName('DIV')
        console.log(window.getSelection())
        console.log(target[0].style.color='red');
    }
    render() {
        // console.log();
        const style={
            editor:{
                width:'600px',
                height:'300px',
                border:'1px solid black',
                overflowY:'scroll'
            }
        }
        return (
            <div>
                <ContentEditable
                    id='editor'
                    ref='editor'
                    style={style.editor}
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                />
                {/* <div contentEditable='true'>
                    {this.state.data}
                </div> */}
                jdlsajkldjalks
                <button onClick={this.addimg}>img</button>
                <button onClick={this.lookhtml}>lookhtml</button>
                <button onClick={this.textcenter}>textcenter</button>
            </div>
        );
    }
}

export default TextAreaDemo;