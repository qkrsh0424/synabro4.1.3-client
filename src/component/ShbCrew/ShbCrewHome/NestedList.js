import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Link} from 'react-router-dom';

//Core
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

class NestedList extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root} subheader={<li />}>
                {/* {[0, 1, 2, 3, 4].map(sectionId => (
                    <li key={`section-${sectionId}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                            {[0, 1, 2].map(item => (
                                <ListItem key={`item-${sectionId}-${item}`}>
                                    <ListItemText primary={`Item ${item}`} />
                                </ListItem>
                            ))}
                            
                        </ul>
                    </li>
                ))} */}
                {this.props.shb_item?this.props.shb_item.map(rows=>(
                    <Link to={`/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`} className='NestedList_category_style'>
                        <ListItem key={`item-${rows.shb_item_id}`} className="NestedList_category_style_wrapper">
                            {/* <ListItemText primary={`${rows.shb_item_name}`} className='NestedList_category_style_child'/> */}
                            <span>{rows.shb_item_name}</span>
                        </ListItem>
                    </Link>
                )):<div className='text-center'><CircularProgress/></div>}
            </List>
        );
    }

}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);