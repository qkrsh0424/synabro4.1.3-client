import React from 'react';

// serverUrl
import {serverUrl} from '../../../config/serverUrl';

const VideoBody = () =>{
    return (
        <div>
            <video 
                id="videoPlayer" 
                controls
                autoplay={false}
                width='600px'
                poster={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`}
                controlsList="nodownload"
            >
                {/* <source src={`${serverUrl}/api/service/extend/video`} type="video/mp4"/> */}
                <source src={`https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/videoStream/media1.mp4`} type='video/mp4'/>
            </video>
        </div>
    );
}

export default VideoBody;