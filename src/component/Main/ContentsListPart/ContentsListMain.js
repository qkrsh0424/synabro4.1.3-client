import React,{useEffect, useState} from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb';

//Core
import Button from '@material-ui/core/Button';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

//Component
import ContentsListBody from './ContentsListBody';
const ContentsListMain = (props) =>{
    const [contentsList, setConetentsList] = useState(null);
    const [contentsListOpen, setContentsListOpen] = useState(false);

    useEffect(()=>{
        getItems();
        initContentsListOpen();
    },[])

    const initContentsListOpen = ()=>{
        if(window.innerWidth<=900){
            setContentsListOpen(false);
        }else{
            setContentsListOpen(true);
        }
    }

    const getItems = async() =>{
        await shbApi.shb_getShbAllItemList(1101001)
        .then(res=>res.data)
        .then(data=>{
            let result = []
            for(let i = 0; i < data.length;i++){
                if(data[i].shb_item_classify==='board'){
                    result.push(data[i]);
                }
            }
            setConetentsList(result);
        })
    }

    const handleContentsListOpen = () =>{
        setContentsListOpen(!contentsListOpen);
    }

    const handleOnclickRedirectory = (path) =>{
        props.history.push(path);
    }

    return(
        <div className='mb-3'>
            {contentsList && contentsListOpen ? 
                <div>
                    <ContentsListBody
                        contentsList = {contentsList}

                        handleOnclickRedirectory={handleOnclickRedirectory}
                    />
                    <div className='text-center'>
                        <Button type='button' onClick={handleContentsListOpen} variant='outlined'>메인 카테고리 닫기<ExpandLessIcon/></Button>
                    </div>
                </div>
                :
                <div className='text-center'>
                    <Button type='button' onClick={handleContentsListOpen} variant='outlined'>메인 카테고리 펼치기<ExpandMoreIcon/></Button>
                </div>
                
            }
            
        </div>
    );
}

export default ContentsListMain;