import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//API
import {admin_HeaderCategoryArraySet} from '../../../handler/cliApi/admin';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

export default function HeaderCategoryArraySet(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    useEffect(() => {
        seperateCategory();
    }, [props.shb_itemHeaders])

    const seperateCategory = () =>{
        let invisibleCategory = [];
        let visibleCategory =[];
        for(let i = 0 ; i < props.shb_itemHeaders.length; i++){
            if(props.shb_itemHeaders[i].sih_visible===0){
                invisibleCategory.push(props.shb_itemHeaders[i]);
            }else{
                visibleCategory.push(props.shb_itemHeaders[i]);
            }
        }
        setLeft(invisibleCategory);
        setRight(visibleCategory);
    }

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const handleUpdate = async() =>{
        await props._handleSetRenameLoading(true);
        await admin_HeaderCategoryArraySet(left, right)
        .then(data=>{
            if(data.message==='success'){
                props._getShbItemHeader();
                props._getShbItem();
            }else{
                alert('undefined');
                window.location.reload();
            }
        });
        await setTimeout(()=>{
            props._handleSetRenameLoading(false);
        },500);
    }
    const customList = items => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value,index) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${index+1}. ${value.sih_name}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <div>
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>
                    <h4 className='text-center'>숨기기</h4>
                    {customList(left)}
                </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllRight}
                            disabled={left.length === 0}
                            aria-label="move all right"
                        >
                            ≫
            </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
            </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
            </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleAllLeft}
                            disabled={right.length === 0}
                            aria-label="move all left"
                        >
                            ≪
            </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <h4 className='text-center'>보이기</h4>
                    {customList(right)}
                </Grid>

                
            </Grid>
            <div className='text-center'>
                <Button type='button' color='primary' variant="contained" onClick={handleUpdate}>수정사항 저장하기</Button>
            </div>
        </div>
    );
}