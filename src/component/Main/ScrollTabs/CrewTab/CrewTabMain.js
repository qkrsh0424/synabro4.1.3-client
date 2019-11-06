import React from 'react';
import CrewTabBody from './CrewTabBody';

class CrewTabMain extends React.Component{
    render(){
        return(
            <CrewTabBody
                {...this.props}
            />
        );
    }
}

export default CrewTabMain;