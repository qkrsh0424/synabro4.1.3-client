import React from 'react';

import styled from 'styled-components';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

//icon
import LabelIcon from '@material-ui/icons/Label'
import SubList from './SubList';

//Components
import CategoryArraySet from './CategoryArraySet';

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

const MyBox = styled.div`
    width:100%;
    border:1px solid #f1f1f1;
    border-radius: 20px;
    overflow-x:scroll;
    padding: 10px;
    margin:20px 0;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const SubBox = styled.div`
    width: 900px;
    border:1px solid black;
    padding: 10px;
`;

const CategoryListBody = (props) => {

    const classes = useStyles();
    return (
        <div>
            <h4>1. 서브 카테고리 추가, 삭제, 수정</h4>
            {props.shb_itemHeaders?props.shb_itemHeaders.map(row => (
                <MyBox>
                    <h5>
                        {row.sih_visible===1?
                            <div>
                                <span><LabelIcon/> {row.sih_name}</span>
                                <span className='text-success'> | visible | </span>
                                <Button type='button' variant="outlined" color='primary' onClick={()=>props._handleArraySetVisible(row)}>카테고리 배치 및 가시성 설정</Button>
                            </div>
                            :
                            <div>
                                <span><LabelIcon/> {row.sih_name}</span>
                                <span className='text-danger'> | invisible | </span>
                                <Tooltip 
                                    disableFocusListener 
                                    disableTouchListener 
                                    title="서브 카테고리 설정을 위해서는 먼저 헤더 카테고리를 visible로 설정해 주시기 바랍니다."
                                >
                                    <span>
                                        <Button type='button' variant="outlined" color='primary' disabled>카테고리 배치 및 가시성 설정</Button>
                                    </span>
                                </Tooltip>
                                
                            </div>
                            
                        }
                        
                    </h5>
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>순서</StyledTableCell>
                                    <StyledTableCell align='center'>타이틀</StyledTableCell>
                                    <StyledTableCell align='center'>상태</StyledTableCell>
                                    <StyledTableCell align='center'>컨트롤러</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {console.log(props.shb_items)} */}
                                {props.shb_items && props.shb_items.map((row2)=>{
                                    // console.log(row2)
                                    if(row2.parent_header===row.sih_id){
                                        return(
                                            <StyledTableRow key={row2.shb_item_id}>
                                                <StyledTableCell align='center'>
                                                    {row2.shb_item_order===null?'':row2.shb_item_order+1}
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    {row2.shb_item_name}
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    {row2.shb_item_visible===1?
                                                        <span className='text-success'>visible</span>
                                                        :
                                                        <span className='text-danger'>invisible</span>
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>
                                                    <button type='button' className='btn btn-primary mr-2' onClick={()=>props._handleSelectDialogOpen(row2)}>선택하기</button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    }
                                    
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    <button type='button' className='btn btn-info float-right' onClick={()=>props._handleAddCategoryDialogOpen(row)}>서브 카테고리 추가하기</button>
                </MyBox>
            )):<div className='text-center'><CircularProgress/></div>}
            {props.arraySetVisible?
                
                <div id='CategoryArraySetArea'>
                    {/* {console.log(props.arraySetElements)} */}
                    <h4>2. 헤더 카테고리 배치 및 가시성 설정</h4>
                    <MyBox>
                        <CategoryArraySet
                            arraySetElements={props.arraySetElements}

                            _handleDataSetLoading={props._handleDataSetLoading}
                            _getShbItem={props._getShbItem}
                        />
                    </MyBox>
                </div>
                :
                ''
            }
            

        </div>
    );
}

export default CategoryListBody;