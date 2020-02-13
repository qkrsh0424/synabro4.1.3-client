import React,{useEffect,useState} from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb';

//Component
import ContetnsListsBody from './ContentsListsBody';
import Nav from '../../Nav/Nav';

const ContentsListsMain = () =>{
    const [queryString, setQueryString] = useState(null);
    const [contentsLists, setContentsLists] = useState(null);

    useEffect(()=>{
        getItems();
    },[]);

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
            setContentsLists(result);
        })
    }

    return (
        <div>
            <Nav/>
            {contentsLists&&
                <ContetnsListsBody
                    shb_main_items = {contentsLists}
                />
            }
            
        </div>
    );
}

export default ContentsListsMain;