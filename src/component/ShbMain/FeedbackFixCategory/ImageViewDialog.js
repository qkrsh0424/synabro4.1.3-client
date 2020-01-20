import React from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ImageWrapper = styled.figure`
    text-align:center;
    background-color:#f0f0f0;
    min-height:100px;
`;
const ImageFrame = styled.img`
    max-width:100%;
`
const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function ImageViewDialog(props) {
    const {
        open,
        imageViewData
    } = props;

    const {
        handleImageViewDialogClose
    } = props;

    const classes = useStyles();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('xl');

    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleImageViewDialogClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">이미지 크게보기</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                        {JSON.stringify(imageViewData)}
                    </DialogContentText> */}
                    {imageViewData &&
                    <ImageWrapper>
                        <ImageFrame src={imageViewData.imgUrl}></ImageFrame>
                    </ImageWrapper>}
                    
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleImageViewDialogClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}