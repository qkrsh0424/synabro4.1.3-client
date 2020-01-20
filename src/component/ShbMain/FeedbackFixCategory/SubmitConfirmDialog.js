import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SubmitConfirmDialog(props) {

    const {
        open
    } = props

    const{
        handleClickDialogOpen,
        handleDialogClose,
        _handleSubmitFeedback
    } = props
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"개선사항을 등록하시겠습니까?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        작성한 개선사항을 정말로 등록하시겠습니까? 여러분의 개선사항은 저희 상해봄에게 많은 도움이 됩니다.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        취소하기
                    </Button>
                    <Button onClick={_handleSubmitFeedback} color="primary">
                        등록하기
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}