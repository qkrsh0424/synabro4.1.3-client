import React,{useEffect} from 'react';

import uuidv4 from 'uuid/v4';
const GoogleAds_InfeedHooks = React.memo((props) =>{
    useEffect(()=>{
        console.log(props);
        window.onload = function() {(window.adsbygoogle = window.adsbygoogle || []).push({})};
    },[props])
    return (
        <div key={'GoogleAds_InfeedHooks'+uuidv4()} className={`adsense`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2340864651976007"
                data-ad-slot="3508676342"
                data-ad-format="fluid"
                data-ad-layout-key="-fq+s+0-ld+142"
            />
        </div>
    );
},(prevProps,nextProps)=>{
    return nextProps.path !== prevProps.path;
})

export default GoogleAds_InfeedHooks