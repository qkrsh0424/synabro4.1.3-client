import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Progress from '@material-ui/core/CircularProgress';

class ImgUploadLoading extends React.Component {
  state = {
    open: this.props.imgUploadLoading,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Dialog
          open={this.state.open}
          //   onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"이미지 업로드 중입니다. 잠시만 기다려주세요."}</DialogTitle>
          <DialogContent className='text-center'>
            {/* <DialogContentText> */}
            <Progress />
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary">
                닫기
            </Button> */}
            {/* <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default (ImgUploadLoading);