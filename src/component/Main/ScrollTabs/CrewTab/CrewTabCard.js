import React from 'react';

import {Link} from 'react-router-dom';

import styled from 'styled-components';
//API
import * as shbApi from '../../../../handler/cliApi/shb';
//Component
import CrewTabCard_Image from './CrewTabCard_Image';


const StyledLink = styled(Link)`
    font-weight:700;
    text-decoration: none;
        color: black;
        &:focus,
        &:hover,
        &:visited,
        &:link,
    &:active {
        text-decoration: none;
        color: black;
    }
    color: #f06060;

    :hover {
        color:#636e72;
    }
`;

class CrewTabCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:'',
            startPostIndex:0,
            currentPostIndex:6
        }
    }

    componentDidMount = async()=>{
        await setTimeout(()=>this._getPost(),500)
    }

    _getPost = () =>{
        shbApi.shb_getShbAllPostForShbNum(this.props.shb.shb_num, this.state.startPostIndex, this.state.currentPostIndex)
        .then(data=>this.setState({post:data}));
    }
    render(){
        return(
            <div className="col-md-4">
                <div className="card board">
                    <div className="board_title">
                        <StyledLink to={`/classify/${this.props.shb.shb_classify}/contype/${this.props.shb.shb_num}`}>{this.props.shb.shb_name}</StyledLink>
                    </div>
                    <CrewTabCard_Image
                        tileData={this.state.post}
                    />
                </div>
            </div>
        );
    }
}

export default CrewTabCard;