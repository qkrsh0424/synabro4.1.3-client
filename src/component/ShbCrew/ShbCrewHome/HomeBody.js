import React from 'react';


//Core
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

//Icons
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//Component
import HomeBigBanner from './HomeBigBanner';
import HomePostLists from './HomePostLists';
import NestedList from './NestedList';



class HomeBody extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div className='container crewContainer crewContentBodyScale mt-4'>
                {/* <div className='jumbotron mt-3 mb-3 shadow bg-light HeaderPart'>
                    {this.props.shb?
                        
                            <h3 className='text-center clearfix'>
                                <Link to={`/classify/${this.props.shb.shb_classify}/contype/${this.props.shb.shb_num}`} className='Text'>
                                    <span>{this.props.shb.shb_name}</span>
                                </Link>
                            </h3>
                        :""}
                </div> */}
                {/* <div class="marquee">
                    <p>{this.props.shb? this.props.shb.shb_introduce:""}</p>
                </div> */}
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
                <div className='text-center'>
                    {this.props.nextPostLoading ?
                        <CircularProgress />
                        :
                        this.props.postLists && this.props.postLists.length < this.props.currentPostIndex ?
                            <div>
                                <h5>마지막 포스터 입니다.</h5>
                                <IconButton type='button' onClick={this.props.reloadPost}><RefreshIcon style={{ fontSize: '35px' }} /></IconButton>
                            </div>
                            :
                            <IconButton type='button' onClick={this.props.nextPost}><ExpandMoreIcon style={{ fontSize: '35px' }} />더보기</IconButton>
                    }
                </div>
                <Snackbar
                    open={this.props.reloadSnackOpen}
                    onClose={this.props.handleReloadSnackClose}
                    TransitionComponent={TransitionUp}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={3000}
                    message={<span id="message-id">피드를 새로고침 하였습니다.</span>}
                />
            </div>
        );
    }
}

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}
export default HomeBody;