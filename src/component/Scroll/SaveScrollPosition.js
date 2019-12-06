const saveScrollZero = () =>{
    return window.localStorage.setItem("scroll",0);
}

const saveScrollValY = (scrollVal) =>{
    let val = {
        "m":scrollVal,
        "mb":0
    }
    return window.localStorage.setItem("scroll",JSON.stringify(val));
}

const saveScrollValY_mBoard = (scrollVal) =>{
    let val = {
        "m":0,
        "mb":scrollVal
    }
    return window.localStorage.setItem("scroll",JSON.stringify(val));
}

const getScrollValY = (type) =>{
    if(window.localStorage.getItem("scroll") && window.localStorage.getItem("scroll")===0){
        return document.documentElement.scrollTop = document.body.scrollTop = 0;
    }else if(!window.localStorage.getItem("scroll")){
        return document.documentElement.scrollTop = document.body.scrollTop = 0;
    }else{
        let m = JSON.parse(window.localStorage.getItem("scroll"));
        if(m!==0){
            if(type==='m'){
                return document.documentElement.scrollTop = document.body.scrollTop = m.m;
            }else if(type==='mb'){
                return document.documentElement.scrollTop = document.body.scrollTop = m.mb;
            }else{
                return document.documentElement.scrollTop = document.body.scrollTop = m.m;
            }
            
        }
    }
}

export {saveScrollZero, saveScrollValY, getScrollValY, saveScrollValY_mBoard}