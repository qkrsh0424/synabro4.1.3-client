import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//Core
import CircularProgress from '@material-ui/core/CircularProgress';

// const MyListSubheader = styled(ListSubheader)`
//     font-size:20px !important;
// `;
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
        paddingLeft:'8px',
        paddingRight:'8px',
    },
});

class NestedList extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root} subheader={<li />}>
                
                {this.props.shb_itemHeaders?this.props.shb_itemHeaders.map((headerRows,sectionId) => {
                    
                    if(headerRows.sih_visible===1){
                        return (
                            <li key={`section-${sectionId}`} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader style={{color:'#768cc2', fontSize:'15px'}}>
                                        {`${sectionId+1}. ${headerRows.sih_name}`}
                                    </ListSubheader>
                                    {this.props.shb_item ? this.props.shb_item.map(rows => {
                                        if(rows.parent_header===headerRows.sih_id && rows.shb_item_visible===1){
                                            return(
                                                <Link to={`/classify/${rows.parent_route}/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`} className='NestedList_category_style'>
                                                    <ListItem key={`item-${rows.shb_item_id}`} className="NestedList_category_style_wrapper">
                                                        {/* <ListItemText primary={`${rows.shb_item_name}`} className='NestedList_category_style_child'/> */}
                                                        <span>{rows.shb_item_name}</span>
                                                    </ListItem>
                                                </Link>
                                            );
                                        }
                                    }) : ''}
                                </ul>
                            </li>
                        );
                    }                    
                }):<div className='text-center'><CircularProgress /></div>}
            </List>
        );
    }

}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);