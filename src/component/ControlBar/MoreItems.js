import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import MoreIcon from '@material-ui/icons/MoreHorizRounded';

const styles = theme => ({
    typography: {
        padding: theme.spacing(2),
    },
});

class SimplePopper extends React.Component {
    state = {
        anchorEl: this.props.anchorEl,
        open: this.props.moreOpen,
    };

    handleClick = event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: !state.open,
        }));
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, open } = this.state;
        const id = open ? 'simple-popper' : null;

        return (
            <div>
                {/* <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
          Toggle Popper
        </Button> */}
                <Popper id={id} open={open} anchorEl={anchorEl} placement={'right'} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={400} >
                            
                            <div>
                                <Fab color="inherit" size="medium" aria-label="Home" style={{marginLeft:'10px'}}>
                                    <MoreIcon />
                                </Fab>    
                                <Fab color="inherit" size="medium" aria-label="Home" style={{marginLeft:'10px'}} >
                                    <MoreIcon />
                                </Fab>
                            </div>
                        </Fade>
                    )}
                </Popper>
            </div>
        );
    }
}

SimplePopper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopper);