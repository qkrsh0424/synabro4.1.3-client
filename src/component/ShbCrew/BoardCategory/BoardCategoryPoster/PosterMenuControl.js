import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import Axios from 'axios';

//Authorization
import AuthKey from '../../../../config/AuthorizationKey';

import { serverUrl } from '../../../../config/serverUrl';


//Core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const ITEM_HEIGHT = 48;

class UnivPosterMenuControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            dialogOpen: false,
            confirmDelete: false,
        }

    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null,dialogOpen: false });
    };

    handleModifyPoster = () => {
        // console.log(this.props.queryValues.BomNo)
        // console.log(this.props.match.params.shb_item_id)
        // console.log(this.props.match.params.post_id)
        if(this.props.poster_isValidation){
            window.location.href=`/classify/${this.props.match.params.crew}/modifypost?BomNo=${this.props.queryValues.BomNo}&Category=${this.props.match.params.shb_item_id}&postView=${this.props.match.params.post_id}`;
        }
        
    }

    handleDeletePoster = async () => {
        await this.setState({ dialogOpen: true });
    }

    handleDeleteConfirm = async() =>{
        await this.setState({ dialogOpen: false, confirmDelete:true });
        if(this.state.confirmDelete===true){
            this.props._deleteMyPoster();
        }
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >

                    {this.props.poster_isValidation ?
                        <div>
                            <MenuItem onClick={this.handleModifyPoster}>
                                수정하기
                            </MenuItem>
                            <MenuItem onClick={this.handleDeletePoster}>
                                삭제하기
                            </MenuItem>
                        </div>
                        :
                        <MenuItem onClick={this.handleClose} disabled>
                            신고하기
                        </MenuItem>
                    }
                </Menu>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"게시물 삭제"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            정말로 삭제 하시겠습니까?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            취소
                        </Button>
                        <Button onClick={this.handleDeleteConfirm} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default UnivPosterMenuControl;