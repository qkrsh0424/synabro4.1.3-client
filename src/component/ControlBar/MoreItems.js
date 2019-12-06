import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Popper from '@material-ui/core/Popper';
import Popover from '@material-ui/core/Popover';
import Fab from '@material-ui/core/Fab';
import MoreIcon from '@material-ui/icons/MoreHorizRounded';
import AppsIcon from '@material-ui/icons/Apps';
import SmsIcon from '@material-ui/icons/Textsms';

const styles = theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    fab:{
        background: "#397bf6",
    }
});




class SimplePopper extends React.Component {
    state = {
        anchorEl: this.props.anchorEl,
        open: this.props.moreOpen,
    };

    // handleClick = event => {
    //     const { currentTarget } = event;
    //     this.setState(state => ({
    //         anchorEl: currentTarget,
    //         open: !state.open,
    //     }));
    // };

    

    render() {
        const { classes } = this.props;
        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popperMoreItems' : null;

        return (
            <div>
                <Popover
                    id={id} 
                    open={open} 
                    anchorEl={anchorEl} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    placement={'right'}
                    onClose={this.props.handleClose}
                >
                {/* {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={400} > */}
                            
                            <div>
                                <Fab 
                                    color="primary" 
                                    size="medium" 
                                    aria-label="Home" 
                                    style={{marginLeft:'10px'}}
                                    onClick={this.props.handleAppsClick}
                                >
                                    <AppsIcon />
                                </Fab>    
                                <Fab 
                                    color="primary" 
                                    size="medium" 
                                    aria-label="Home" 
                                    style={{marginLeft:'10px'}} 
                                    disabled
                                >
                                    <SmsIcon />
                                </Fab>
                            </div>
                        {/* </Fade>
                    )} */}
                </Popover>
            </div>
        );
    }
}

SimplePopper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopper);