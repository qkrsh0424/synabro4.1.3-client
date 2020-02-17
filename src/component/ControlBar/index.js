import React from 'react';
import './ControlBar.css';
import { useMediaQuery } from 'react-responsive';

import GotoHomeActionButton from './GotoHomeActionButton';
import BackActionButton from './BackActionButton';
import MoreActionButton from './MoreActionButton';
import UpActionButton from './UpActionButton';
import BottomNav from './BottomNav';

function ControlBar(props) {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 950px)' //default 1224
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })  //default 1824
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 950px)' })    //default 1224
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 950px)'  //default 1224
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return (
        <div>
            {isDesktopOrLaptop && 
                <>
                    <div>
                        <div className='position-fixed controlCircleButtonFirst'><GotoHomeActionButton /></div>
                        <div className='position-fixed controlCircleButtonSecond'><MoreActionButton /></div>
                        <div className='position-fixed controlCircleButtonThird'><BackActionButton /></div>
                        <div className='position-fixed controlCircleButtonForth'><UpActionButton /></div>
                    </div>
                    {isBigScreen && 
                        <div>
                            <div className='position-fixed controlCircleButtonFirst'><GotoHomeActionButton /></div>
                            <div className='position-fixed controlCircleButtonSecond'><MoreActionButton /></div>
                            <div className='position-fixed controlCircleButtonThird'><BackActionButton /></div>
                            <div className='position-fixed controlCircleButtonForth'><UpActionButton /></div>
                        </div>
                    }
                    {isTabletOrMobile && 
                        <div>
                            <div className='position-fixed controlCircleButtonFirst'><GotoHomeActionButton /></div>
                            <div className='position-fixed controlCircleButtonSecond'><MoreActionButton /></div>
                            <div className='position-fixed controlCircleButtonThird'><BackActionButton /></div>
                            <div className='position-fixed controlCircleButtonForth'><UpActionButton /></div>
                        </div>
                    }
                </>
            }
            {/* {isTabletOrMobileDevice && <div className='dynamic-height'><BottomNav /></div>} */}
        </div>
    );
}

export default (ControlBar);