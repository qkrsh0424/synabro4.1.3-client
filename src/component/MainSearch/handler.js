export function calculateTime(date1,date2){
    var Time1 = date1.getTime();
    var Time2 = date2.getTime();
    var calTime = (Time1-Time2)/(1000*60);
    var resultTime = Math.round(calTime) + "분 전";
    if(calTime>=60 && calTime<1440){
        calTime = (Time1-Time2)/(1000*60*60);
        resultTime = Math.round(calTime) + "시간 전";
    }
    else if(calTime>=1440 && calTime<(1440*30)){
        calTime = (Time1-Time2)/(1000*60*60*24);
        resultTime = Math.round(calTime) + "일 전";
    }
    else if(calTime>=(1440*30) && calTime<(1440*30*12)){
        calTime = (Time1-Time2)/(1000*60*60*24*30);
        resultTime = Math.round(calTime) + "개월 전";
    }
    else if(calTime>=(1440*30*12)){
        calTime = (Time1-Time2)/(1000*60*60*24*30*12);
        resultTime = Math.round(calTime) + "년 전";
    }
    
    return resultTime;
}