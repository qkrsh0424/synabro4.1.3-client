import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

import CircularProgress from '@material-ui/core/CircularProgress';


const DataSetLoading =  (props) => {

    return (
        <Dialog 
            open={props.open}
            aria-labelledby="simple-dialog-title"
        >
            <DialogTitle id="simple-dialog-title" style={{background:'black', opacity:'0.8', color:'white', textAlign:'center'}}>Loading</DialogTitle>
            <div style={{background:'black', opacity:'0.8', color:'white', textAlign:'center', padding:'8px'}}>
                데이터를 저장하고 있습니다.
                <br/>
                <CircularProgress/>
            </div>
        </Dialog>
    );
}

export default DataSetLoading;