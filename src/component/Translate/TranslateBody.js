import React from 'react';

//styled-component
import styled from 'styled-components';

//Core
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

//Icons
import CloseIcon from '@material-ui/icons/Close';
const Container = styled.div`
    padding:15px;
`;

const LeftAreaWrapper = styled.div`
    margin:8px;
    padding:8px;
    border:1px solid #f1f1f1;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);

    .warningText{
        font-size:10px;
    }
    .textLength{
        font-size:13px;
        font-weight:600;
    }
`;

const RightAreaWrapper = styled.div`
    margin:8px;
    padding:8px;
    border:1px solid #f1f1f1;
    box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
`;

const LanguageSelectorWrapper = styled.div`
    margin:8px;
`;
const LeftTextArea = styled.textarea`
    border:1px solid #f1f1f1;
    border-radius:15px;
    width:100%;
    height:100px;
`;

const RightTextArea = styled.textarea`
    border:1px solid #f1f1f1;
    border-radius:15px;
    width:100%;
    height:100px;
`;
const TranslateBody = (props) => {
    const {
        sourceData,
        targetData,
        translatePopOpen,
        translateAnchorEl
    } = props

    const {
        handleTranslateClose,
        handleRunTranslate,
        handleSourceTextChange,
        handleLanguageChange
    } = props;

    return (
        <Popper
            open={translatePopOpen}
            anchorEl={translateAnchorEl}
            placement={'bottom'}
            transition
            style={{ width: '100%' }}
            modifiers={{
                flip: {
                  enabled: true,
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: 'viewport',
                },
              }}
        >
            <Paper>
                <Container>
                    <div className='clearfix'>
                        <IconButton className='float-right' onClick={handleTranslateClose}><CloseIcon/></IconButton>
                    </div>
                    
                    <div className='text-center'>
                        <Button variant='outlined' onClick={handleRunTranslate}>번역하기</Button>
                    </div>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={6}>
                            <LeftAreaWrapper className='clearfix'>
                                <h5 className='text-center'>내용</h5>

                                <LanguageSelectorWrapper>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">언어</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sourceData.language}
                                            onChange={(e)=>handleLanguageChange('source',e)}
                                        >
                                            <MenuItem value={'ko'}>한국어</MenuItem>
                                            <MenuItem value={'en'}>영어</MenuItem>
                                            <MenuItem value={'zh-CN'}>중국어간체</MenuItem>
                                            {/* <MenuItem value={'zh-TW'}>중국어번체</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </LanguageSelectorWrapper>

                                <LeftTextArea
                                    value={sourceData.text}
                                    onChange={handleSourceTextChange}
                                >

                                </LeftTextArea>
                                <span className='float-left text-danger warningText'>*현재는 200자 한정으로 번역을 지원하고 있습니다.</span>
                                <span className='float-right textLength'>{sourceData.text.length}/200</span>
                            </LeftAreaWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RightAreaWrapper>
                                <h5 className='text-center'>결과</h5>
                                <LanguageSelectorWrapper>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">언어</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={targetData.language}
                                            onChange={(e)=>handleLanguageChange('target',e)}
                                        >
                                            <MenuItem value={'ko'}>한국어</MenuItem>
                                            <MenuItem value={'en'}>영어</MenuItem>
                                            <MenuItem value={'zh-CN'}>중국어간체</MenuItem>
                                            {/* <MenuItem value={'zh-TW'}>중국어번체</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </LanguageSelectorWrapper>
                                <RightTextArea
                                    id='translate-result-side'
                                    value={targetData.text}
                                >

                                </RightTextArea>
                            </RightAreaWrapper>
                        </Grid>
                    </Grid>

                </Container>
            </Paper>
        </Popper>
    );
}

export default TranslateBody;