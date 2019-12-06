import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//routerDom
import {Link} from 'react-router-dom';
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class CustomizedTable extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>아이디</CustomTableCell>
                            <CustomTableCell align="right">멤버 이름(본명)</CustomTableCell>
                            <CustomTableCell align="right">활동 닉네임</CustomTableCell>
                            <CustomTableCell align="right">직업 및 소속</CustomTableCell>
                            <CustomTableCell align="right">직무 및 직책</CustomTableCell>
                            <CustomTableCell align="right">등록된 이메일</CustomTableCell>
                            <CustomTableCell align="right">성별</CustomTableCell>
                            <CustomTableCell align="right">회원 삭제</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.members?this.props.members.map(rows=>{
                            return(
                                <TableRow className={classes.row}>
                                    
                                    <CustomTableCell component="th" scope="row">
                                        {rows.UserId}
                                    </CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserName}</CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserNickname}</CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserJob}</CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserMajor}</CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserEmail}</CustomTableCell>
                                    <CustomTableCell align="right">{rows.UserGender}</CustomTableCell>
                                    <CustomTableCell align="right">
                                        <button type='button' className='btn btn-danger' onClick={()=>this.props._deleteGroupMemberOne(this.props.group.shb_num, rows.MemberId)}>삭제</button>
                                    </CustomTableCell>
                                    
                                </TableRow>
                            );
                            
                        }):""}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

  
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);