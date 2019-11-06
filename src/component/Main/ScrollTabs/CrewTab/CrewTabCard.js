import React from 'react';
import Axios from 'axios';
import { serverUrl } from '../../../../config/serverUrl';
import { awsImageURL } from '../../../../config/awsurl';
import AuthKey from '../../../../config/AuthorizationKey';
import {Link} from 'react-router-dom';

//API
import * as shbApi from '../../../../handler/cliApi/shb';
//Component
import CrewTabCard_Image from './CrewTabCard_Image';


class CrewTabCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:'',
            startPostIndex:0,
            currentPostIndex:6
        }
    }

    componentDidMount(){
        this._getPost();
    }

    _getPost = () =>{
        shbApi.shb_getShbAllPostForShbNum(this.props.shb.shb_num, this.state.startPostIndex, this.state.currentPostIndex)
        .then(data=>this.setState({post:data}));
    }
    render(){
        return(
            <div className="col-md-4">
                <div className="card board">
                    <div className="board_title">{this.props.shb.shb_name}</div>
                    <CrewTabCard_Image
                        tileData={this.state.post}
                    />
                </div>
            </div>
        );
    }
}

export default CrewTabCard;