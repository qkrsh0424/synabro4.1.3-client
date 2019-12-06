import React from 'react';
import PropTypes from 'prop-types';

//redux
import {connect} from 'react-redux';

//render HTML
import renderHtml from 'react-render-html';
//Core
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';


//Icons
import MoreIcon from '@material-ui/icons/MoreHorizRounded';

//Components
import MoreItems from './MoreItems';
import AppsDialog from './AppsDialog';

//server URL
import {serverUrl} from '../../config/serverUrl';
import AuthKey from '../../config/AuthorizationKey';
import {shb_getShbAllItemList} from '../../handler/cliApi/shb';

const styles = theme => ({
    fab: {
        background: "#397bf6",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});

const testHtml = `
    <h1>this is the test Html</h1>
`;

class MoreActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreOpen: false,
            anchorEl: null,
            AppsOpen: false,

            appsCategory:null
        }
    }

    // viewMore = (event) => {
    viewMore = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            moreOpen: !state.moreOpen,
        }));
    };
    // this.setState({ moreOpen: !this.state.moreOpen });
    // }

    handleClose = () => {
        this.setState({ moreOpen: false });
    }

    handleAppsClick = () => {
        this.setState({ AppsOpen: true, moreOpen: false });
        this._onLoadApps();
    }

    handleAppsClose = () => {
        this.setState({ AppsOpen: false });
    }

    handleAppsLinkClick = () => {
        this.setState({ AppsOpen: false });
        import('../Scroll/SaveScrollPosition')
        .then(ret=>ret.saveScrollZero());
    }

    _onLoadApps = () =>{
        shb_getShbAllItemList(1101001)
        .then(res=>this.setState({appsCategory:res.data}));
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} onClick={this.viewMore}>
                    <MoreIcon />
                </Fab>
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
                        handleAppsLinkClick = {this.handleAppsLinkClick}
                    />
                
            </div>
        );
    }

}

MoreActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        _parentRoute:state.parent_route.parentRoute,
        shb_lists: state.shb_lists.shbs,
    }
}
export default connect(mapStateToProps)(withStyles(styles)(MoreActionButton));