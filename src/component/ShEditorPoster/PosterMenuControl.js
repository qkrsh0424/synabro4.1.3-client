import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';



//Core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const ITEM_HEIGHT = 48;

const PosterMenuControl = (props) =>{
    //state
    const {
        postOwner,
        queryValues
    } = props;

    //controller
    const {
        _deleteMyPoster
    } = props

    const [anchorEl , setAnchorEl] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setDialogOpen(false);
    };

    const handleModifyPoster = () => {
        if(postOwner){
            if(process.env.NODE_ENV==='production'){
                window.location.href=`http://d2.shbom.com/modify?BomNo=${queryValues.BomNo}&Category=${queryValues.Category}&Pr=${queryValues.Pr}&PostVal=${queryValues.PostVal}`
            }else{
                window.location.href=`http://localhost:3001/modify?BomNo=${queryValues.BomNo}&Category=${queryValues.Category}&Pr=${queryValues.Pr}&PostVal=${queryValues.PostVal}`
            }
        }
        
    }

    const handleDeletePoster = async () => {
        setDialogOpen(true);
    }

    const handleDeleteConfirm = async() =>{
        setDialogOpen(false);
        _deleteMyPoster();
    }
    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >

                {postOwner ?
                    <div>
                        <MenuItem onClick={handleModifyPoster}>
                            수정하기
                        </MenuItem>
                        <MenuItem onClick={handleDeletePoster}>
                            삭제하기
                        </MenuItem>
                    </div>
                    :
                    <div>
                        <MenuItem onClick={handleClose} disabled>
                            신고하기
                        </MenuItem>
                    </div>
                    
                }
            </Menu>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
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
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PosterMenuControl;