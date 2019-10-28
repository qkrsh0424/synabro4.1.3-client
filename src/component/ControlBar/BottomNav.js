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

const styles = {
    root: {
        width: 'auto',
        // position:'fixed',
        // top:'90vh'
    },
};

class SimpleBottomNavigation extends React.Component {

    goHome = () => {
        window.location.href = '/';
    }

    goBack = () => {
        window.history.back();
    }

    goUp = () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    viewMore = () => {

    }
    render() {
        const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
        return (
            <BottomNavigation
                showLabels
            >
                {/* <BottomNavigationAction label="홈" icon={<HomeIcon />} style={{color:'#f50057'}} onClick={this.goHome}/> */}
                <BottomNavigationAction label="홈" icon={<HomeIcon />} style={{ color: '#f50057' }} component={PageLink} to='/' />
                <BottomNavigationAction label="뒤로가기" icon={<BackIcon />} style={{ color: '#b5d19b' }} onClick={this.goBack} />
                <BottomNavigationAction label="페이지업" icon={<UpIcon />} style={{ color: '#f6bf50' }} onClick={this.goUp} />
                <BottomNavigationAction label="더보기" icon={<MoreIcon />} style={{ color: '#397bf6' }} onClick={this.viewMore} />
            </BottomNavigation>
        );
    }
}

SimpleBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);