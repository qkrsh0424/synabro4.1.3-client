import React from 'react';
import styled from 'styled-components';
import '../StyleCss/Draftjs.css';
//Material Lab
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//Material Icons

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatImageIcon from '@material-ui/icons/Image';
import FormatLinkIcon from '@material-ui/icons/AttachFile';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatSizeIcon from '@material-ui/icons/FormatSizeRounded';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openHeaderSelect: false,
        }
    }

    handleHeaderSelectChange = () => {
        this.setState({ openHeaderSelect: !this.state.openHeaderSelect });
    };

    render() {
        const style = {
            toggleBtn: {
                height: '40px',
                width: '40px',
                border: 'none'
            },
            toggleBtnHeader: {
                height: '40px',
                width: '40px',
                border: 'none',
                color:'white',
            },
            root: {
                height: 180,
            },
            container: {
                display: 'flex',
            },
            lightTooltip: {
                background: 'white',
            },
        }

        return (
            <div className='mb-2'>
                <div>
                    <input
                        type='file'
                        name='file'
                        id='file'
                        className='btn btn-secondary'
                        onChange={this.props.onImageUpload}
                        hidden
                        multiple
                        accept="image/*"
                    />
                    <div className={'headlineButtonWrapper'}>
                        <ToggleButton type='button' onClick={() => this.props.onTextStyle("BOLD")} style={style.toggleBtn}><FormatBoldIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onTextStyle("ITALIC")} style={style.toggleBtn}><FormatItalicIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onTextStyle("UNDERLINE")} style={style.toggleBtn}><FormatUnderlinedIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderAlignment('text-justify-draft')} style={style.toggleBtn}><FormatAlignJustifyIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderAlignment('text-left-draft')} style={style.toggleBtn}><FormatAlignLeftIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderAlignment('text-center-draft')} style={style.toggleBtn}><FormatAlignCenterIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderAlignment('text-right-draft')} style={style.toggleBtn}><FormatAlignRightIcon /></ToggleButton>
                        <ToggleButton type='button' onClick={this.props.ImageButtonClick} style={style.toggleBtn}>
                            <FormatImageIcon />
                        </ToggleButton>
                        <ToggleButton type='button' onClick={this.props.onHeaderLink} style={style.toggleBtn}><FormatLinkIcon /></ToggleButton>

                        <Tooltip
                            style={style.lightTooltip}
                            title={
                                <React.Fragment>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderStyle("header-one")} style={style.toggleBtnHeader}>H1</ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderStyle("header-two")} style={style.toggleBtnHeader}>H2</ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderStyle("header-three")} style={style.toggleBtnHeader}>H3</ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderStyle("header-four")} style={style.toggleBtnHeader}>H4</ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderStyle("header-five")} style={style.toggleBtnHeader}>H5</ToggleButton>
                                </React.Fragment>
                            }
                            interactive disableFocusListener disableTouchListener placement="top"
                        >
                            <ToggleButton type='button' onClick={this.handleHeaderSelectChange} style={style.toggleBtn}><strong style={{fontSize:'20px'}}>H</strong></ToggleButton>
                        </Tooltip>

                        <ToggleButton type='button' onClick={() => this.props.onHeaderStyle("blockquote")} style={style.toggleBtn}><span style={{fontSize:'20px'}}>&lt;&gt;</span></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderStyle("code-block")} style={style.toggleBtn}><span style={{fontSize:'20px'}}>""</span></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderStyle("unordered-list-item")} style={style.toggleBtn}><FormatListBulletedIcon/></ToggleButton>
                        <ToggleButton type='button' onClick={() => this.props.onHeaderStyle("ordered-list-item")} style={style.toggleBtn}><FormatListNumberedIcon/></ToggleButton>
                        <Tooltip
                            style={style.lightTooltip}
                        
                            title={
                                <React.Fragment>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_WHITE")} style={{background:"white"}}><span></span></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_RED")} style={{background:"red"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_ORANGE")} style={{background:"orange"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_YELLOW")} style={{background:"yellow"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_GREEN")} style={{background:"green"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_BLUE")} style={{background:"blue"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_DARKBLUE")} style={{background:"darkblue"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_VIOLET")} style={{background:"violet"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_DARKGRAY")} style={{background:"darkgray"}}></ToggleButton>
                                    <ToggleButton type='button' onClick={()=>this.props.onHeaderTextColor("TEXT_COLOR_BLACK")} style={{background:"black"}}></ToggleButton>
                                </React.Fragment>
                            }
                            interactive disableFocusListener disableTouchListener placement="top"
                        >
                            <ToggleButton type='button' onClick={this.handleHeaderSelectChange} style={style.toggleBtn}><ColorLensIcon/></ToggleButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;