import React from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

import renderHTML from 'react-render-html';

class UnivPoster extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postData:''
        }
    }

    async componentDidMount(){
        await this._getSelectedPost();
    }

    _getSelectedPost(){
        return Axios.get(`/api/univ_post/post/${this.props.post_id}`,{
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(res=>res.data)
        .then(data=>this.setState({postData:data}));
    }

    render(){
        return(
            <div className='container'>
                {this.state.postData?this.state.postData.map(row=>{
                    return(
                        <div>
                            <h1>{row.post_topic}</h1>
                            <hr/>
                            {renderHTML(row.post_desc)}
                        </div>
                    );
                }):"No Post"}
            </div>
        );
    }
}

export default UnivPoster;