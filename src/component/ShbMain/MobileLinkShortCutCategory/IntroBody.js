import React from "react";
import {Link, withRouter} from 'react-router-dom';
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


//Component
import MainBody from './MobaileLinkHome';
import IOSSafari from './IOSSafari';
import IOSChrome from './IOSChrome';
import AndroidSamsung from './Android-Samsung';
import { textAlign } from "@material-ui/system";

function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        
    },
});

const Container=styled.div`
text-align:center;
p{
  font-weight:600;
}

    img{
        width: auto !important;
        /* height: auto !important; */
        max-width: 100%;
        height:500px; 
        margin-top:25px;
        margin-bottom:15px;
    }
    .user-image{
        /* border: 1px solid grey; */
        box-shadow: 0 7px 14px rgba(0,0,0,0.25), 0 3px 3px rgba(0,0,0,0.22);
        
    }
    .bodyText{
        font-size:16px;
        overflow-wrap: break-word;
        @media screen and (max-width:600px){
            font-size:12px;

        h2{
            font-size:12px;
            font-weight:600;
            margin-bottom:30px;
        }
    }
    .PrivateTabScrollButton{
        width:0px;
    }
    }
`;



class IntroBody extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const style = {
        paperHeader: {
            padding: "1rem",
            fontSize: "1.5rem",
            textAlign:"left"
        },
        paperBody: {
            padding: "1rem",
            fontSize: "1rem"
        },
        Grid: {
            padding: "8px"
        }
    };
    return (
        <Container>
        <div className={classes.root}>
            <div className="container animate slideIn clearfix">
                <div style={style.Grid}>
                    <Grid  container spacing={2}></Grid>
                    <Grid className="my-3" item xs={12} sm={12}>
                    <Paper style={style.paperHeader}>봄 바로가기</Paper>
                    </Grid>
                    <AppBar position="static" style={{background:'white', marginBottom:'40px'}}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            textDecoration="none" 
                            width="0px"                   
                        >
                            <Tab label="홈" />
                            <Tab label="아이폰 사파리" 
                            />
                            <Tab label="아이폰 크롬" 
                            />
                            <Tab label="갤릭시 삼성" 
                            />
                            
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <MainBody
                            {...this.props}
                            {...this.state}
                        />
                    </TabContainer>}
                    {value === 1 &&
                        <TabContainer>
                            <IOSSafari
                                {...this.props}
                                {...this.state}
                            />
                        </TabContainer>}
                    {value === 2 && 
                        <TabContainer>
                            <IOSChrome
                                {...this.props}
                                {...this.state}
                            />
                        </TabContainer>}
                    {value === 3 && 
                        <TabContainer>
                            <AndroidSamsung
                                {...this.props}
                                {...this.state}
                            />
                        </TabContainer>
                    }
                    {value === 4 && <TabContainer>Item Five</TabContainer>}
                    {value === 5 && <TabContainer>Item Six</TabContainer>}
                    {value === 6 && <TabContainer>Item Seven</TabContainer>}

                    
                </div>
            </div>
        </div>
        </Container>
    );
  }
}

IntroBody.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroBody);
