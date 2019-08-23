import React from 'react';
import Axios from 'axios';

import './Nav.css';

import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../../action';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const propTypes = {

}

const defaultProps = {

}

const styles = {
    root: {
      flexGrow: 1,
      display:'flex',
    },
    AppBar: {
        background:'white',
        color: 'gray',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    list: {
      width: 300,
    },
  };

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state={
            left: false,
            auth:this.props._isLogged,
            anchorEl: null,
        }

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout(){
      Axios.post('/api/auth/logout')
      .then(response=>response.data)
      .then(data=>{
        if(data.message==='success'){
          this.props.handleAUTH_FAILURE();
          window.location.reload();
        }else{
          alert('error logout');
        }
        
      });
    }

    render(){
        const activeStyle = {
            color: 'green',
            // background:'skyblue'
        }

        const AdapterLink = React.forwardRef((props, ref) => <NavLink activeStyle={activeStyle} innerRef={ref} {...props} />);
        const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);

        const sideList = (
          <div className={classes.list}>
            <List>
              {this.props.univ_lists?this.props.univ_lists.map((rows,index)=>{
                return(
                  <ListItem 
                    button key={rows.univ_title}
                    component={AdapterLink} 
                    to={"/univ/"+rows.univ_id}
                    // selected={this.props.matchId==rows.univ_id?true:false}
                  >
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={rows.univ_title} />
                  </ListItem>
                );
              }):""}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        );        

        return(
            <div className={classes.root}>
            <AppBar 
                position='fixed' 
                // className='__Nav_Style'
                className={classes.AppBar}
            >
                <Toolbar>
                <IconButton 
                  className={classes.menuButton} 
                  color="inherit" 
                  aria-label="Menu"
                  onClick={this.toggleDrawer('left', true)}  
                >
                    <MenuIcon />
                </IconButton>
                <Typography 
                  variant="h6" 
                  color="inherit" 
                  className={classes.grow}
                  component={PageLink} 
                  to={"/"}
                >
                    Synabro
                </Typography>

                {this.props._isLogged?
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleLogout}>로그아웃</MenuItem>
                        </Menu>
                    </div>:
                        <div>
                            <Button 
                                color="inherit" 
                                component={AdapterLink} 
                                to={'/login'}
                            >
                                로그인
                            </Button>
                            <Button 
                                color="inherit"
                                component={AdapterLink} 
                                to={'/register'}
                            >
                                회원가입
                            </Button>
                        </div>
                        
                    }
                
                </Toolbar>
            </AppBar>
            <div className='fixed_Liner'></div>

            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
            </div>
        );
    }
}

Nav.propTypes = propTypes;

Nav.defaultProps = defaultProps;

const mapStateToProps = (state)=>{
    return{
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname,
        univ_lists: state.univ_lists.univs
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleAUTH_SUCCESS: ()=>{dispatch(actions.auth_success())},
        handleAUTH_FAILURE: ()=>{dispatch(actions.auth_failure())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Nav));