import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav/Nav';


const propTypes = {

}

const defaultProps = {

}

class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        return(
            <div>
                <Nav/>
                <h1>this is Main</h1>
            </div>
        );
    }
}

Main.propTypes = propTypes;

Main.defaultProps = defaultProps;


export default Main;