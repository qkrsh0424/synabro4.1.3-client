import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddItemDialog = (props) => {

    return (
        <Dialog open={props.addCategoryDialogOpen} onClose={props._handleAddCategoryDialogClose} aria-labelledby="form-dialog-title">
            {props.selectedHeaderItem ?
            (
                <div>
                    <DialogTitle id="form-dialog-title"><span className='text-info'>{props.selectedHeaderItem.sih_name}</span>의 서브 카테고리 추가하기</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            서브 카테고리를 추가하시려면 카테고리 타이틀을 입력하시고 추가하기를 눌러주세요.
                            추가된 카테고리는 최초 비가시 모드로 설정됩니다.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="카테고리 타이틀"
                            type="text"
                            value={props.addCategoryName && props.addCategoryName}
                            onChange={props._handleChangeAddCategoryName}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props._handleAddHeaderCategory} color="primary">
                            추가하기
                        </Button>
                        <Button onClick={props._handleAddCategoryDialogClose} color="default">
                            취소
                        </Button>
                    </DialogActions>
                </div>
            )
                :
                'loading'
            }
        </Dialog>
    );
}

export default AddItemDialog;