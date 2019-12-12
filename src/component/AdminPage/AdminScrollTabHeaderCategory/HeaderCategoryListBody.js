import React, { useEffect,useState } from 'react';

import styled from 'styled-components';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Component
import HeaderCategoryArraySet from './HeaderCategoryArraySet';
import { CircularProgress } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
        margin:'25px 0'
    },
    table: {
        minWidth: 700,
    },
});

const MyTableContainer = styled.div`
    margin:25px 0;
`;

const SubBox = styled.div`
    width: 900px;
    border:1px solid black;
    padding: 10px;
`;
const CategoryListBody = (props) => {
    const classes = useStyles();
    const _handleCountVisibleCategory = (headerItem,type) =>{
        let visibleCount = 0;
        let invisibleCount = 0;
        for(let i = 0 ; i< props.shb_items.length;i++){
            if(headerItem.sih_id===props.shb_items[i].parent_header){
                if(props.shb_items[i].shb_item_visible===1){
                    visibleCount++;
                }else{
                    invisibleCount++;
                }
            }
        }
        if(type==='visible'){
            return visibleCount;
        }else{
            return invisibleCount;
        }
        
    }

    return (
        <div>
            <h4>1. 헤더 카테고리 추가, 삭제, 수정</h4>
            <MyTableContainer className='clearfix'>
                <Paper className={classes.root}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>순서</StyledTableCell>
                                <StyledTableCell align='center'>타이틀</StyledTableCell>
                                <StyledTableCell align='center'>상태</StyledTableCell>
                                <StyledTableCell align='center'>하위 카테고리 개수</StyledTableCell>
                                <StyledTableCell align='center'>컨트롤러</StyledTableCell>
                                {/* <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.shb_itemHeaders ? props.shb_itemHeaders.map((row,index) => (
                                <StyledTableRow key={row.sih_name}>
                                    <StyledTableCell align='center'>
                                        {index+1}
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        {props.titleRenameBool?<input type='text' value={`${row.sih_name}`}/>:row.sih_name}
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        {row.sih_visible===1?
                                            <span className='text-success'>visible</span>
                                        :
                                            <span className='text-danger'>invisible</span>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <span>
                                            visible : {props.shb_items?_handleCountVisibleCategory(row,'visible'):0} / 
                                        </span>
                                        <span> invisible : {props.shb_items?_handleCountVisibleCategory(row,'invisible'):0}</span>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <button type='button' className='btn btn-primary mr-2' onClick={()=>props._handleSelectDialogOpen(row)}>선택하기</button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )):<div className='m-3 text-center'><CircularProgress/></div>}
                            
                        </TableBody>
                    </Table>
                    
                </Paper>
                <button type='button' className='btn btn-info float-right' onClick={props._handleAddCategoryDialogOpen}>헤더 카테고리 추가하기</button>
            </MyTableContainer>
            <h4>2. 헤더 카테고리 배치 및 가시성 설정</h4>
            {props.shb_itemHeaders?
                <HeaderCategoryArraySet
                    shb_itemHeaders={props.shb_itemHeaders}

                    _getShbItemHeader={props._getShbItemHeader}
                    _getShbItem={props._getShbItem}
                    _handleSetRenameLoading={props._handleSetRenameLoading}
                />
                :''
            }
            
        </div>
    );
}

export default CategoryListBody;