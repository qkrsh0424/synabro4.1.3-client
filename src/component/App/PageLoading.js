import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import LoadingNav from '../Nav/LoadingNav';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function PageLoading(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <LoadingNav />
            <LinearProgress />
        </div>
    );
}

PageLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLoading);