import React from 'react';
import { connect } from 'react-redux';
//API
import * as api from '../../../handler/cliApi/shb';
//Component
import Nav from '../../Nav/Nav';
import IntroBody from './IntroBody';

class IntroMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            univ:this.props.univ_lists,
        }
    }

    render(){
        console.log(this.state.shb);
        return(
            <div>
                <Nav/>
                <IntroBody
                    {...this.state}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        univ_lists: state.univ_lists.univs,
        _isLogged: state.auth_user._isLogged,
    }
}

export default connect(mapStateToProps)(IntroMain);