import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ControlItemDialog = (props) => {

    return (
        <Dialog open={props.selectDialogOpen} onClose={props._handleSelectDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">선택항목 타이틀 변경 및 삭제</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    타이틀을 변경하려고 하신다면 변경 하고자하는 타이틀을 입력한뒤 수정하기 버튼을 눌러주시고, 항목 삭제를 원하시면 삭제버튼을 눌러주시기 바랍니다. 
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="카테고리 타이틀"
                    type="text"
                    value={props.selectedItem?props.selectedItem.sih_name:''}
                    onChange={props._handleChageItemName}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props._handleUpdateItem} color="primary">
                    수정하기
                </Button>
                <Button onClick={props._handleLastDeleteAlertOpen} color="secondary">
                    삭제하기
                </Button>
                <Button onClick={props._handleSelectDialogClose} color="default">
                    취소
                </Button>
            </DialogActions>
            {props.lastDeleteAlert?
                (<DialogContent>
                    <DialogContentText>
                        헤더 카테고리를 삭제하시면 관련된 하부 카테고리들도 삭제됩니다. 정말로 진행하시겠습니까 ?
                        <Button onClick={props._handleDeleteHeaderCategory} color="secondary" >
                            삭제
                        </Button>
                        <Button onClick={props._handleLastDeleteAlertClose} color="default">
                            취소
                        </Button>
                    </DialogContentText>
                </DialogContent>):""
            }
            
        </Dialog>
    );
}

export default ControlItemDialog;