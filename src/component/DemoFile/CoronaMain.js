import React,{useEffect, useState} from 'react';
//styled-comonent
import styled from 'styled-components';

//Axios
import Axios from 'axios';
//Component
import CoronaBody from './CoronaBody';


const CoronaMain = () =>{
    const [coronaData, setCoronaData] = useState(null);
    const [coronaDataKorea, setCoronaDataKorea] = useState(null);
    const [coronaDataShanghai, setCoronaDataShanghai] = useState(null);

    useEffect(()=>{
        _getCoronaApi();
    },[])
    // corona start
    const _getCoronaApi = () =>{
        Axios.get('https://myapi.ihogu.com/public/?s=Whfy.count&limit=22')
        .then(res=>res.data)
        .then(data=>{
            _getCoronaCal(data);
            _getCoronaKoreaCal(data);
        })

        Axios.get(`https://myapi.ihogu.com/public/?s=Whfy.city&area=上海&limit=18`)
        .then(res=>res.data)
        .then(data=>{
            _getCoronaShanghaiCal(data);
        })
    }

    const _getCoronaCal = (value) =>{
        let confirm = 0;
        let suspect = 0;
        let dead = 0;
        let heal = 0;
        let date = value.data.items[0].create_time;
        let nowDate = new Date();
        let currentDate = `${nowDate.getFullYear()}년${nowDate.getMonth()+1}월${nowDate.getDate()}일 ${nowDate.getHours()}시 ${nowDate.getMinutes()}분`;
        for(let i = 0 ; i < value.data.items.length; i++){
            confirm += value.data.items[i].confirm;
            suspect += value.data.items[i].suspect;
            dead += value.data.items[i].dead;
            heal += value.data.items[i].heal;
        }

        setCoronaData({
            confirm:confirm,
            suspect:suspect,
            dead:dead,
            heal:heal,
            date:date,
            currentDate
        })
    }

    const _getCoronaKoreaCal = async(value) =>{

        let koreaData;
        for(let i = 0 ; i < value.data.items.length;i++){
            if(value.data.items[i].country==='韩国'){
                koreaData = value.data.items[i]
            }
        }
        await setTimeout(()=>{
            setCoronaDataKorea({
                confirm:koreaData.confirm,
                suspect:koreaData.suspect,
                dead:koreaData.dead,
                heal:koreaData.heal,
            })
        },100)
        
    }

    const _getCoronaShanghaiCal = (value) =>{
        let confirm = 0;
        let suspect = 0;
        let dead = 0;
        let heal = 0;
        let date = value.data.items[0].create_time;
        let nowDate = new Date();
        let currentDate = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()} ${nowDate.getHours()}시 ${nowDate.getMinutes()}분`;
        for(let i = 0 ; i < value.data.items.length; i++){
            confirm += value.data.items[i].confirm;
            suspect += value.data.items[i].suspect;
            dead += value.data.items[i].dead;
            heal += value.data.items[i].heal;
        }

        setCoronaDataShanghai({
            confirm:confirm,
            suspect:suspect,
            dead:dead,
            heal:heal,
            date:date,
            currentDate
        })
    }

    // corona end

    return(
        <CoronaBody
            coronaData={coronaData}
            coronaDataKorea = {coronaDataKorea}
            coronaDataShanghai = {coronaDataShanghai}
        />
    );
}

export default CoronaMain;