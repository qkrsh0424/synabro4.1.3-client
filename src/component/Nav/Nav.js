import React from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../config/AuthorizationKey';

//Cookie
import cookie from 'react-cookies';

//Server Url
import { serverUrl } from '../../config/serverUrl';

import './Nav.css';

//handler
import { logoutHandler } from '../../handler/LogoutHandler';

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
import Tooltip from '@material-ui/core/Tooltip';
import { maxWidth } from '@material-ui/system';


const propTypes = {

}

const defaultProps = {

}

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  AppBar: {
    background: 'white',
    color: 'gray',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)'
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

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookiesUSID: cookie.load('usid'),
      left: false,
      auth: this.props._isLogged,
      anchorEl: null,
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount = () => {
    this._Authentication();
    
  }

  componentDidMount = () =>{
    setTimeout(()=>{
      window.onscroll = function() {myFunction()};

      var navbar = document.getElementById("PcyTopNavBar");
      var sticky = navbar.offsetTop;
      var stickyTextField = document.getElementById("header_stickyTest")?document.getElementById("header_stickyTest").clientHeight:0;
      // console.log(stickyTextField);
      function myFunction() {
        if (window.pageYOffset >= 1) {
          navbar.classList.add("sticky")
        } else {
          navbar.classList.remove("sticky");
        }
      }
    },1000);
    
  }

  

  _Authentication = async () => {
    return await Axios.post(`${serverUrl}/api/auth/authentication`, {
      usid: this.state.cookiesUSID
    }, {
      headers: {
        Authorization: 'Bearer ' + AuthKey
      }
    }
    )
      .then(response => response.data)
      .then(data => {
        //   console.log(data.message);
        if (data.message === 'connect success') {
          this.props.handleAUTH_SUCCESS(data.sessid, data.user_nickname);
        } else {
          this.props.handleAUTH_FAILURE();
        }
        this.setState({ auth: true });
      })
      .catch(err => alert('서버를 다시 확인해 주세요'));
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

  handleLogout = async () => {
    logoutHandler()
      .then(data => {
        if (data.message === 'success') {
          this.props.handleAUTH_FAILURE();
          window.location.reload();
        } else {
          alert('error logout');
        }

      });
  }

  memoryScroll= () =>{
    // console.log(window.scrollY);
    window.localStorage.setItem("scroll",0);
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  render() {
    // console.log(window.innerWidth);
    const activeStyle = {
      color: 'green',
      // background:'skyblue'
      lightTooltip: {
        backgroundColor: 'red',
        color: 'rgba(0, 0, 0, 0.87)',
        // boxShadow: theme.shadows[1],
        fontSize: 11,
      },
    }

    const AdapterLink = React.forwardRef((props, ref) => <NavLink activeStyle={activeStyle} innerRef={ref} {...props} />);
    const PageLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    const sideList = (
      <div className={classes.list}>
        <div className='text-center p-3'>
          <img
            src={'https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png'}
            width='100px' height='100px'
            onClick={() => { window.location.href = '/' }}
          />
          <br />
          <em className='text-secondary'>Beta version</em>
        </div>
        <Divider />
        <List>
          {/* New */}
          {this.props.parentRoute && this.props.parentRoute.map(parentRoute => {
            if (parentRoute.parent_route === 'main') {
              return;
            }
            return (
              <LightTooltip
                interactive
                placement={window.innerWidth < 800 ? "bottom-end" : "right"}
                disableFocusListener disableTouchListener
                title={
                  <React.Fragment>
                    <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                      <ListItem
                        component={PageLink}
                        to={`/classify/${parentRoute.parent_route}`}
                        className='header_style'
                        onClick={this.toggleDrawer('left', false)}
                      >
                        <ListItemText primary={parentRoute.route_name} />
                      </ListItem>
                      <Divider />
                      {this.props.shb_lists ? this.props.shb_lists.map((rows, index) => {
                        if (rows && rows.shb_classify === parentRoute.parent_route) {
                          return (
                            <ListItem
                              button key={rows.shb_name}
                              component={AdapterLink}
                              to={`/classify/${rows.shb_classify}/contype/${rows.shb_num}`}
                              onClick={this.toggleDrawer('left', false)}
                              style={{ width: '250px'}}
                            >
                              <ListItemIcon>
                                <img src={rows.shb_icon_url ? rows.shb_icon_url : `https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png`} width='24px' height='24px' />
                              </ListItemIcon>
                              <ListItemText primary={rows.shb_name} />
                            </ListItem>
                          );
                        } else {
                          return;
                        }
                      }) : ""}
                    </div>
                  </React.Fragment>
                }
              >
                <ListItem
                  button
                >
                  <ListItemText primary={parentRoute.route_name} className='header_style' style={{ textAlign: 'center' }} />
                </ListItem>
              </LightTooltip>
            );
          })}
        </List>
        <Divider />
      </div>
    );

    return (
    <div>
        <div className={classes.root}>
        <div
          position='fixed'
          // className='PcyTopNavBar'
          id='PcyTopNavBar'
        // className={classes.AppBar}
        // className={c}
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
              onClick={this.memoryScroll}
            >
              상해봄
            </Typography>

            {this.props._isLogged ?
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
                  <MenuItem component={PageLink} to={'/profile'}>내 프로필</MenuItem>
                  {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={this.handleLogout}>로그아웃</MenuItem>
                </Menu>
              </div> :
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
                  to={'/signup'}
                >
                  회원가입
                            </Button>
              </div>

            }

          </Toolbar>
        </div>
        <div className='fixed_Liner'></div>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
        >
          <div
            tabIndex={0}
            role="button"
          // onClick={this.toggleDrawer('left', false)}
          // onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    </div>
      
    );
  }
}

Nav.propTypes = propTypes;

Nav.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    _isLogged: state.auth_user._isLogged,
    _nickname: state.auth_user._nickname,
    univ_lists: state.univ_lists.univs,
    shb_lists: state.shb_lists.shbs,
    parentRoute: state.parent_route.parentRoute,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAUTH_SUCCESS: (_sess, _nickname) => { dispatch(actions.auth_success(_sess, _nickname)) },
    handleAUTH_FAILURE: () => { dispatch(actions.auth_failure()) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav));