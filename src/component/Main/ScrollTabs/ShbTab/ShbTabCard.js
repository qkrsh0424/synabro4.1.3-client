import React from 'react';
import Axios from 'axios';
import AuthKey from '../../../../config/AuthorizationKey';
import { serverUrl } from '../../../../config/serverUrl';
import {Link} from 'react-router-dom';

import { calculateTime } from '../../../../controler/calculateTime';

class ShbTabCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            post:'',
            startPostIndex:0,
            currentPostIndex:7
        }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost = () =>{
        Axios.get(`${serverUrl}/api/shb/post/getpost/category/all`,{
            params:{
                shb_num: this.props.category.shb_num,
                shb_item_id: this.props.category.shb_item_id,
                startPostIndex:this.state.startPostIndex,
                currentPostIndex:this.state.currentPostIndex
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
            
        }).then(res=>res.data)
        .then(data=>this.setState({post:data}))
    }
    render(){
        return(
            <div className="col-lg-3">
                <div className="card board">
                    <div className="board_title">{this.props.category.shb_item_name}</div>
                    {this.state.post?this.state.post.map((rows, index)=>{
                        return(
                            <Link className="post title clearfix" to={`${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`}>
                                <span className='text-dark float-left' style={{fontSize:'13px'}}>
                                    {rows.post_title && rows.post_title.length > 27 ?
                                        `${rows.post_title.substring(0, 27)}...` :
                                        rows.post_title
                                    }
                                </span>
                                <span className='text-muted float-right' style={{fontSize:'10px'}}>{calculateTime(new Date(), new Date(rows.post_created))}</span>
                            </Link>
                        );
                    }):""}
                </div>
            </div>
        );
    }
}

export default ShbTabCard;