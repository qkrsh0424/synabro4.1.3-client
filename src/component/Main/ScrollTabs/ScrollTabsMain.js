import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';


//Component
import MainBody from '../MainInterface';
import ShbTab from './ShbTab';
import UnivTab from './UnivTab';
import CrewTab from './CrewTab';

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

class ScrollTabsMain extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    setScrollZero = () =>{
        import('../../Scroll/SaveScrollPosition')
        .then(ret=>ret.saveScrollZero());
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={`${classes.root} scrollTabsMainNav`}>
                <AppBar position="static" color='default' style={{background:'white'}}>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab 
                            label="홈"
                            onClick={this.setScrollZero}
                        />
                        <Tab
                            label="봄 게시판"
                            value='homeboards'
                        />
                        {this.props.parentRoute && this.props.parentRoute.map(rows=>{
                            return(
                                <Tab 
                                    label={rows.route_name}
                                    value={rows.parent_route}
                                    // icon={<FavoriteIcon />} 
                                />        
                            )
                        })}
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <MainBody
                        {...this.props}
                        {...this.state}
                    />
                </TabContainer>}
                {value === 'homeboards' &&
                    <TabContainer>
                        <ShbTab
                            {...this.props}
                            {...this.state}
                        />
                    </TabContainer>
                }
                {this.props.parentRoute && this.props.parentRoute.map((rows,index)=>{
                    if(value === rows.parent_route){
                        return(
                            <TabContainer>
                                <CrewTab
                                    {...this.props}
                                    {...this.state}
                                    parent={rows}
                                />
                            </TabContainer>
                        );
                    }
                })}
                {/* {value === 1 &&
                    <TabContainer>
                        <ShbTab
                            {...this.props}
                            {...this.state}
                        />
                    </TabContainer>} */}
                {/* {value === 2 && 
                    <TabContainer>
                        <UnivTab
                            {...this.props}
                            {...this.state}
                        />
                    </TabContainer>} */}
                {/* {value === 3 && 
                    <TabContainer>
                        <CrewTab
                            {...this.props}
                            {...this.state}
                        />
                    </TabContainer>
                }
                {value === 4 && <TabContainer>Item Five</TabContainer>}
                {value === 5 && <TabContainer>Item Six</TabContainer>}
                {value === 6 && <TabContainer>Item Seven</TabContainer>} */}
            </div>
        );
    }
}

ScrollTabsMain.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ScrollTabsMain);