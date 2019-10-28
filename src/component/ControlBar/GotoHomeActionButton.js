import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HomeIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';

const styles = theme => ({
    fab: {
        background: "#f50057",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});


function GotoHomeActionButton(props) {
    const { classes } = props;

    const gotoHome = () => {
        window.location.href = '/';
    }

    const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    return (
        <div>
            {/* <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} component={PageLink} to='/'> */}
            <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} onClick={gotoHome}>
                <HomeIcon />
            </Fab>
        </div>
    );
}

GotoHomeActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GotoHomeActionButton);