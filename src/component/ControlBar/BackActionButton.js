import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ArrowBackRounded';

const styles = theme => ({
    fab: {
        background:"#b5d19b",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});


function BackActionButton(props) {
    const { classes } = props;

    const actionOn = () => {
        window.history.back();
    }

    return (
        <div>
            <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} onClick={actionOn}>
                <BackIcon/>
            </Fab>
        </div>
    );
}

BackActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackActionButton);