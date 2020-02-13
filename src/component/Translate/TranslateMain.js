import React, { useState, useEffect } from 'react';

//Component
import TranslateBody from './TranslateBody';

//URL
import {serverUrl} from '../../config/serverUrl';
import AuthKey from '../../config/AuthorizationKey';
//Axios
import Axios from 'axios';


const TranslateMain = (props) => {
    const {
        translatePopOpen,
        translateAnchorEl,
    } = props

    const {
        handleTranslateClose
    } = props;

    const [sourceData, setSourceData] = useState({
        text: '',
        language: 'ko'
    });
    const [targetData, setTargetData] = useState({
        text: '',
        language: 'zh-CN'
    })

    const handleRunTranslate = async () => {
        if(sourceData.text.length>200 || sourceData.text.length<=0){
            return;
        }

        Axios.post(`${serverUrl}/api/service/extend/translate/papago`,{
            sourceText:sourceData.text,
            sourceLanguage:sourceData.language,
            targetLanguage:targetData.language
        },{
            headers: {
                Authorization: 'Bearer ' + AuthKey
            }
        })
        .then(res=>res.data)
        .then(data=>{
            if(data.message==='success'){
                // document.getElementById('translate-result-side').scrollIntoView({
                //     block:'center'
                // });
                setTargetData({...targetData,text:data.ret.message.result.translatedText})
                
            }else if(data.message==='non-sourceText'){
                alert('텍스트를 입력해주세요.');
            }else{
                alert('undefined');
            }
        })
    }

    const handleSourceTextChange = (e) => {
        if(e.target.value.length>200){
            return;
        }
        setSourceData({ ...sourceData, text: e.target.value })
    }

    const handleLanguageChange = (target, e) =>{
        if(target==='source'){
            setSourceData({ ...sourceData, language: e.target.value })
        }else if(target==='target'){
            setTargetData({ ...targetData, language: e.target.value })
        }
    }


    return (
        <div>
            <TranslateBody
                sourceData={sourceData}
                targetData={targetData}
                translatePopOpen={translatePopOpen}
                translateAnchorEl={translateAnchorEl}

                handleTranslateClose={handleTranslateClose}
                handleRunTranslate={handleRunTranslate}
                handleSourceTextChange={handleSourceTextChange}
                handleLanguageChange={handleLanguageChange}
            />
        </div>
    );
}

export default TranslateMain;