import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MoreIcon from '@material-ui/icons/MoreHorizRounded';
import MoreItems from './MoreItems';
const styles = theme => ({
    fab: {
        background: "#397bf6",
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
});


class MoreActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moreOpen: false,
            anchorEl: null,
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

    handleClose = () =>{
        this.setState({moreOpen:false});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Fab color="primary" size="medium" aria-label="Home" className={classes.fab} onClick={this.viewMore} disabled>
                    <MoreIcon />
                </Fab>
                {this.state.moreOpen ? <MoreItems moreOpen={this.state.moreOpen} anchorEl={this.state.anchorEl} /> : ""}
            </div>
        );
    }

}

MoreActionButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreActionButton);