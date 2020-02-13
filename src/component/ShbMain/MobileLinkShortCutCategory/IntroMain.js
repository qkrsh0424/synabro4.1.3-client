import React from 'react';

//Component
import Nav from '../../Nav/Nav';
import IntroBody from './IntroBody';
class IntroMain extends React.Component{
    render(){
        return(
            <div>
                <Nav/>
                <IntroBody/>
            </div>
        );
    }
}

export default IntroMain;