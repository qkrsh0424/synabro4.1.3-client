import React from 'react';


//Core
import {Link} from 'react-router-dom';
//Component
import HomeBigBanner from './HomeBigBanner';
import HomePostLists from './HomePostLists';
import NestedList from './NestedList';



class HomeBody extends React.Component {

    render() {
        return (
            <div className='container crewContainer'>
                <div className='jumbotron mt-3 mb-3 shadow bg-light HeaderPart'>
                    {this.props.shb?
                        
                            <h3 className='text-center clearfix'>
                                <Link to={`/classify/${this.props.shb.shb_classify}/contype/${this.props.shb.shb_num}`} className='Text'>
                                    <span>{this.props.shb.shb_name}</span>
                                </Link>
                                {/* <button className='float-right'>B</button> */}
                            </h3>
                        :""}
                </div>
                <div class="marquee">
                    <p>{this.props.shb? this.props.shb.shb_introduce:""}</p>
                </div>
                <div className='row mb-3'>
                    <div className='col-md-9'>
                        <HomeBigBanner 
                            bannerHeader = {this.props.bannerHeader}
                        />
                        
                    </div>
                    <div className='col-md-3'>
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