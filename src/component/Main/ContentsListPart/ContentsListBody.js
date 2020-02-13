import React from 'react';

//URL
import {serverUrl} from '../../../config/serverUrl';

//styled
import styled from 'styled-components';

//DOM
import {Link} from 'react-router-dom';

//Core
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const PostNameButtonBox = styled.div`
    .MuiButtonBase-root{
        display:initial;
    }
`;
const PostNameBigEl = styled.div`

`

const PostNameSmallEl = styled.div`
    font-size:10px;
`

const NumOfPostEl = styled.div`
    font-size:8px;
    color: #a1a1a1;
`;


const ContentsListBody = (props) =>{
    const {
        contentsList
    } = props;

    const {
        handleOnclickRedirectory
    } = props;
    return(
        <div>
            <Grid container spacing={0} className='text-center'>
                {contentsList && contentsList.map(item=>{
                    if(window.innerWidth<=900){
                        return(
                            <Grid item xs={4}>
                                <PostNameButtonBox>
                                    <Button
                                        type='button'
                                        onClick={()=>handleOnclickRedirectory(`/main/category/${item.shb_item_id}?BomNo=${item.shb_num}`)}
                                    >
                                        <PostNameSmallEl>{item.shb_item_name.length>10?item.shb_item_name.substring(0,10):item.shb_item_name}</PostNameSmallEl>
                                        <NumOfPostEl>({item.NOP})</NumOfPostEl>    
                                    </Button>
                                </PostNameButtonBox>
                                
                            </Grid>
                        );    
                    }
                    return(
                        <Grid item xs={2}>
                            <PostNameButtonBox>
                                <Button
                                    type='button'
                                    onClick={()=>handleOnclickRedirectory(`/main/category/${item.shb_item_id}?BomNo=${item.shb_num}`)}
                                >
                                    <PostNameBigEl>{item.shb_item_name}</PostNameBigEl>
                                    <NumOfPostEl>({item.NOP})</NumOfPostEl>
                                </Button>
                            </PostNameButtonBox>
                        </Grid>
                    );
                })}
                
            </Grid>
        </div>
    );
}

export default ContentsListBody;