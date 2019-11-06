import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.resumeViewOpen}
                    onClose={this.props._handleCloseResumeView}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <em>{this.props.resumeAuthor}</em> 님의 신청서 입니다.
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description-Admin-ResumeView">
                            {this.props.resumeText}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;