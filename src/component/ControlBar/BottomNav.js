import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import HomeIcon from '@material-ui/icons/HomeRounded';
import MoreIcon from '@material-ui/icons/MoreHorizRounded';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import UpIcon from '@material-ui/icons/ArrowUpwardRounded';
import IconButton from '@material-ui/core/IconButton'

import { Link } from 'react-router-dom';
//redux
import {connect} from 'react-redux';

//API
import {shb_getShbAllItemList} from '../../handler/cliApi/shb';
//Components
import MoreItems from './MoreItems';
import MoreItemsMobile from './MoreItems';
import AppsDialog from './AppsDialog';
const styles = {
    root: {
        width: 'auto',
        // position:'fixed',
        // top:'90vh'
    },
};

const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

class SimpleBottomNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moreOpen: false,
            anchorEl: null,
            AppsOpen: false,

            appsCategory:null
        }
    }

    goHome = () => {
        window.location.href = '/';
    }

    goBack = () => {
        window.history.back();
    }

    goUp = () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    viewMore = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            moreOpen: !state.moreOpen,
        }));
    }

    handleClose = () => {
        this.setState({ moreOpen: false });
    }

    handleAppsClose = () => {
        this.setState({ AppsOpen: false });
    }

    handleAppsClick = () => {
        this.setState({ AppsOpen: true, moreOpen: false });
        this._onLoadApps();
    }
    handleAppsLinkClick = () => {
        this.setState({ AppsOpen: false });
        import('../Scroll/SaveScrollPosition')
        .then(ret=>ret.saveScrollZero());
    }

    _onLoadApps = () =>{
        // Axios.get(`${serverUrl}/render/appItems/items/all`,{
        //     headers:{
        //         Authorization:'Bearer ' + AuthKey
        //       }
        // })
        // .then(res=>this.setState({appsCategory:res.data}));
        shb_getShbAllItemList(1101001)
        .then(res=>this.setState({appsCategory:res.data}));
    }

    
    render() {
        
        return (
            <div>
                <BottomNavigation
                    showLabels
                >
                    {/* <BottomNavigationAction label="홈" icon={<HomeIcon />} style={{color:'#f50057'}} onClick={this.goHome}/> */}
                    <BottomNavigationAction label="홈" icon={<HomeIcon />} style={{ color: '#f50057' }} component={PageLink} to='/' />
                    <BottomNavigationAction label="뒤로가기" icon={<BackIcon />} style={{ color: '#b5d19b' }} onClick={this.goBack} />
                    <BottomNavigationAction label="페이지업" icon={<UpIcon />} style={{ color: '#f6bf50' }} onClick={this.goUp} />
                    <BottomNavigationAction label="더보기" icon={<MoreIcon />} style={{ color: '#397bf6' }} onClick={this.viewMore}/>
                    
                </BottomNavigation>
                {this.state.moreOpen ?
                    <MoreItems
                        moreOpen={this.state.moreOpen}
                        anchorEl={this.state.anchorEl}
                        handleClose={this.handleClose}

                        // AppsOpen={this.state.AppsOpen}
                        handleAppsClick={this.handleAppsClick}
                    // handleAppsClose = {this.handleAppsClose}
                    /> : ""}
                    <AppsDialog
                        AppsOpen = {this.state.AppsOpen}
                        handleAppsClose = {this.handleAppsClose}
                        appsCategory = {this.state.appsCategory}
                        _parentRoute = {this.props._parentRoute}
                        shb_lists = {this.props.shb_lists}
                        handleAppsLinkClick={this.handleAppsLinkClick}
                    />
            </div>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        _parentRoute:state.parent_route.parentRoute,
        shb_lists: state.shb_lists.shbs,
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleBottomNavigation));