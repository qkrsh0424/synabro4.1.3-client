import React from 'react';
import ShbTabBody from './ShbTabBody';

class ShbTabMain extends React.Component{
    render(){
        return(
            <ShbTabBody
                {...this.props}
            />
        );
    }
}

export default ShbTabMain;