import React from 'react';

//Component
import HomeBigBanner from './HomeBigBanner';
import HomePostLists from './HomePostLists'
import NestedList from './NestedList';



class HomeBody extends React.Component {

    render() {
        return (
            <div className='container crewContainer'>
                <div className='row mb-3 mt-1'>
                    <div className='col-md-9 mt-2'>
                        <HomeBigBanner />
                        
                    </div>
                    <div className='col-md-3 mt-2'>
                        <NestedList
                            {...this.props}
                        />
                    </div>
                </div>

                <HomePostLists
                    {...this.props}
                />

            </div>
        );
    }
}



export default HomeBody;