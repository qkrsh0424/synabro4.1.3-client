import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';

import ReloadIcon from '@material-ui/icons/ReplayOutlined'

import LoadingNav from '../Nav/LoadingNav';

// import DemoLoad from './DemoLoad';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function PageLoading(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <LoadingNav />
            <LinearProgress />
            <DemoLoad/>
        </div>
    );
}

class DemoLoad extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasServerError:false,
            timer:null
        }
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.setState({hasServerError: true});
        }, 20000);
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    render(){
        return(
            <div className='container text-center'>
                {this.state.hasServerError?
                    <div className='pt-5 mt-5 jumbotron'>
                        <h3>서버 응답이 없습니다.</h3>
                        <IconButton
                            onClick={()=>window.location.reload()}
                        >
                            새로고침
                            <ReloadIcon/>
                        </IconButton>
                    </div>
                :""}
            </div>
        );
    }
}

PageLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLoading);