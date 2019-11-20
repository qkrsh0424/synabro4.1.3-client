import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
// import './DraftJs.css';
//Material Lab
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Material Icons
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatImageIcon from '@material-ui/icons/Image';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatSizeIcon from '@material-ui/icons/FormatSizeRounded';
const style = {
    toggleBtn:{
        height:'auto',
        padding:'6px'
    }
}
class Toolbar extends React.Component {
    render() {
        
        return (
            <div>
                {/* <Paper className='p-4 mb-2'> */}
                    <div>
                        <input
                            type='file'
                            name='file'
                            id='file'
                            className='btn btn-secondary'
                            onChange={this.props.onImageUpload}
                            hidden
                        />
                        {/* <ToggleButtonGroup>
                            <ToggleButton 
                                style={style.toggleBtn}
                                onClick={this.props.onHeaderLeft}
                            >
                                <FormatAlignLeftIcon />
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                            >
                                <FormatAlignCenterIcon />
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                                onClick = {this.props.onHeaderRight}
                            >
                                <FormatAlignRightIcon />
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                            >
                                <FormatAlignJustifyIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup>
                            <ToggleButton
                                style={style.toggleBtn}
                                onClick={()=>this.props.onHeaderStyle("header-one")}
                            >
                                <FormatSizeIcon/><b>1</b>
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                                onClick={()=>this.props.onHeaderStyle("header-two")}
                            >
                                <FormatSizeIcon/><b>2</b>
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                                onClick={()=>this.props.onHeaderStyle("header-three")}
                            >
                                <FormatSizeIcon/><b>3</b>
                            </ToggleButton>
                            <ToggleButton 
                                style={style.toggleBtn}
                                onClick={()=>this.props.onHeaderStyle("header-four")}
                            >
                                <FormatSizeIcon/><b>4</b>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup>
                            <ToggleButton
                                style={style.toggleBtn}
                                onClick={()=>this.props.onTextStyle("BOLD")}
                            >
                                <FormatBoldIcon />
                            </ToggleButton>
                            <ToggleButton
                                style={style.toggleBtn}
                                onClick={()=>this.props.onTextStyle("ITALIC")}
                            >
                                <FormatItalicIcon />
                            </ToggleButton>
                            <ToggleButton
                                style={style.toggleBtn}
                                onClick={()=>this.props.onTextStyle("UNDERLINE")}
                            >
                                <FormatUnderlinedIcon />
                            </ToggleButton>
                            <ToggleButton
                                style={style.toggleBtn}
                                onClick={this.props.ImageButtonClick}
                            >
                                <FormatImageIcon />
                            </ToggleButton>
                        </ToggleButtonGroup> */}
                        <div className={'headlineButtonWrapper'}>
                            <button onClick={this.props.ImageButtonClick} className={'headlineButton'}>
                                <FormatImageIcon />
                            </button>
                        </div>
                        
                    </div>
                {/* </Paper> */}
            </div>
        );
    }
}

export default Toolbar;