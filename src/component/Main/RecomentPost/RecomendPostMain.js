import React,{useEffect, useState} from 'react';

//API
import * as shbApi from '../../../handler/cliApi/shb';

//Component
import RecomendBody from './RecomendPostBody';

const RecomendMain = (props) =>{

    const [recomendPostList, setRecomendPostList] = useState(null);

    useEffect(()=>{
        // console.log('hi')
        loadRecomendPost();
    },[])

    const loadRecomendPost = () =>{
        shbApi.shb_getRecomendPost(5)
        .then(data=>{
            // console.log(data);
            if(data.message==='success'){
                setRecomendPostList(data.data);
            }
        });
    }

    const handleChangeRoute = (editorType, parent_route, shb_num, shb_item_id, post_id) =>{
        if(editorType==='sheditor'){
            let url = `/postPage?BomNo=${shb_num}&Category=${shb_item_id}&Pr=${parent_route}&PostVal=${post_id}`
            return props.history.push(url);
        }

        if(parent_route==='main'){
            let url = `/main/category/${shb_item_id}/v/${post_id}?BomNo=${shb_num}`;
            return props.history.push(url);
        }else{
            let url = `/classify/economy/category/${shb_item_id}/v/${post_id}?BomNo=${shb_num}`;
            return props.history.push(url);
        }
    }

    return(
        <div>
            {recomendPostList && 
                <RecomendBody
                    path={props.location.pathname}
                    recomendPostList={recomendPostList}

                    handleChangeRoute={handleChangeRoute}
                />
            }
            
        </div>
    );
}

export default RecomendMain;