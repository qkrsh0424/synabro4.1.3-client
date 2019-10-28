import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/ArrowUpwardRounded';

const styles = theme => ({
    fab: {
        background:"#f6bf50",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});


function UpActionButton(props) {
    const { classes } = props;

    const gotoHome = () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    return (
        <div>
            <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} onClick={gotoHome}>
                <UpIcon />
            </Fab>
        </div>
    );
}

UpActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpActionButton);