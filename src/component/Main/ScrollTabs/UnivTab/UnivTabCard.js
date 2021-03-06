import React from 'react';
import Axios from 'axios';
import { serverUrl } from '../../../../config/serverUrl';
import { awsImageURL } from '../../../../config/awsurl';
import AuthKey from '../../../../config/AuthorizationKey';
import {Link} from 'react-router-dom';
import UnivTabCard_Image from './UnivTabCard_Image';

class UnivTabCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:'',
            startPostIndex:0,
            currentPostIndex:6
        }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost = () =>{
        Axios.get(`${serverUrl}/api/univ_post/getpost/univ/all`,{
            params:{
                univ_id: this.props.univ.univ_id,
                startPostIndex:this.state.startPostIndex,
                currentPostIndex:this.state.currentPostIndex
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res=>res.data)
        .then(data=>this.setState({post:data}));
    }
    render(){
        return(
            <div className="col-md-4">
                <div className="card board">
                    <div className="board_title">{this.props.univ.univ_title}</div>
                    <UnivTabCard_Image
                        tileData={this.state.post}
                    />
                </div>
            </div>
        );
    }
}

export default UnivTabCard;