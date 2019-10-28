import React from 'react';
import BoardWriteBody from './BoardWriteBody';
import queryString from 'query-string';

class BoardWriteMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            queryValues : queryString.parse(this.props.location.search)
        }
    }
    render(){
        return(
            <div>
                BoardWriteMain
                <BoardWriteBody/>
                {this.state.queryValues.BomNo}
                {this.state.queryValues.Category}
            </div>
        );
    }
}

export default BoardWriteMain;