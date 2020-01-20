import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Progress from '@material-ui/core/CircularProgress';

const ImgUploadLoading = (props) => {
  
  const {imageUploadLoading} = props;

  const [open,setOpen] = useState(imageUploadLoading);
  
  const handleClickOpen = () => {
    this.setState({ open: true });
  };

  const handleClose = () => {
    this.setState({ open: false });
  };

    return (
      <div>
        <Dialog
          open={open}
          //   onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"업로드 중입니다. 잠시만 기다려주세요."}</DialogTitle>
          <DialogContent className='text-center'>
            <Progress />
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default (ImgUploadLoading);