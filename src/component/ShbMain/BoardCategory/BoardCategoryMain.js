import React from 'react';
import BoardCategoryBody from './BoardCategoryBody';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

import Nav from '../../Nav/Nav';
import { connect } from "react-redux";

//URL
import { serverUrl } from '../../../config/serverUrl';

//Core
import CircularProgress from '@material-ui/core/CircularProgress';


//Scroll
import {getScrollValY} from '../../Scroll/SaveScrollPosition';
/**
 * props
 * shb_item
 */

 /**
  * Parent Route : Category DIR
  */

class BoardCategoryMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postLists: null,
            startPostIndex:0,
            currentPostIndex:100,
            nextBtnOn: true,
        }
    }

    componentDidMount = () => {
        this._getPost();
    }

    componentDidUpdate = async(prevProps) =>{
        if (prevProps.shb_item_id !== this.props.shb_item_id) {
            this._getPost();
        }
    }

    _getPost = async() => {
        await Axios.get(`${serverUrl}/api/shb/post/getpost/category/all`,{
            params:{
                usid:this.props._sess,
                shb_num: this.props.shb_item.shb_num,
                shb_item_id: this.props.shb_item.shb_item_id,
                startPostIndex: this.state.startPostIndex,
                currentPostIndex: this.state.currentPostIndex
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        })
        .then(res=>res.data)
        .then(data=>{
            // console.log(data)
            if(data[0]){
                this.setState({postLists:data});
            }else{
                this.setState({postLists:[]});
            }
            
        })
        .catch(err=>
            {
                console.log(err);
                alert('포스트 겟 에러')        
            }
        )

        await setTimeout(()=>{
            getScrollValY('mb');
        });
    }

    _onClickReloadPost = async()=>{
        // await this.setState({ isLoading:true });
        this._getPost();
        
    }
    render() {
        // console.log(this.state.postLists.length);
        // console.log(this.props.shb_item.shb_item_id);
        if(this.state.postLists && this.props.shb_item){
            return (
                <div>
                    <Nav/>
                    <BoardCategoryBody
                        {...this.props}
                        {...this.state}
                        _onClickReloadPost = {this._onClickReloadPost}
                    />
                </div>
            );
        }else{
            return(
                <div className='text-center mt-4'><CircularProgress/></div>
            );
        }
        
        
    }
}

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged : state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(BoardCategoryMain);