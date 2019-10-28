import React from 'react';

//API
import * as api from '../../../handler/cliApi/shb';
//Component
import Nav from '../../Nav/Nav';
import IntroBody from './IntroBody';

class IntroMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            shb:null,
        }
    }

    componentDidMount = ()=>{
        this._getShb();
    }

    _getShb = async()=>{
        await api.shb_getShbAllList("crew") //crew는 선택사항.
        .then(data=>this.setState({shb:data.data}));
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

export default IntroMain;