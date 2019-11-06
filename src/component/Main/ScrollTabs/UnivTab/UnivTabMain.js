import React from 'react';
import UnivTabBody from './UnivTabBody';

class UnivTabMain extends React.Component{
    render(){
        return(
            <UnivTabBody
                {...this.props}
            />
        );
    }
}

export default UnivTabMain;