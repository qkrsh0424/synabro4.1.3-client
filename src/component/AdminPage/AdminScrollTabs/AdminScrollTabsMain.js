import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Component
import AdminScrollTabHome from '../AdminScrollTabHome';
import AdminScrollTabApplyList from '../AdminScrollTabApplyList';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
  },
});

class AdminScrollTabsMain extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{background:'black'}}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            // indicatorColor="primary"
            // textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
                label={this.props.group?this.props.group.shb_name:""} 
            />
            <Tab label="회원 신청" />
            <Tab label="Item Three" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </AppBar>
        {value === 0 && 
            <TabContainer>
                <AdminScrollTabHome
                    {...this.props}
                />
            </TabContainer>
        }
        {value === 1 && 
            <TabContainer>
                <AdminScrollTabApplyList
                    {...this.props}
                    _getGroupMembers = {this.props._getGroupMembers}
                />
            </TabContainer>
        }
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
        {value === 4 && <TabContainer>Item Five</TabContainer>}
        {value === 5 && <TabContainer>Item Six</TabContainer>}
        {value === 6 && <TabContainer>Item Seven</TabContainer>}
      </div>
    );
  }
}

AdminScrollTabsMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminScrollTabsMain);