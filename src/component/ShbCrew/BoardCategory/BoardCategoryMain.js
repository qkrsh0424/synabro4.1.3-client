import React from 'react';
import BoardCategoryBody from './BoardCategoryBody';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

//API
import * as memberApi from '../../../handler/cliApi/member';


import { connect } from "react-redux";

//URL
import { serverUrl } from '../../../config/serverUrl';

//component
import Nav from '../../Nav/Nav';
import BoardCategoryLoading from './BoardCategoryLoading';

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
            postLists: '',
            startPostIndex:0,
            currentPostIndex:100,
            nextBtnOn: true,
            isMember:false,
            canApplyGroup:false,

            pageLoading:false,
        }
    }

    componentDidMount = () => {
        this._memberCheck();
        this._memberApplyCheck();
        this._getPost();
    }

    componentDidUpdate = async(prevProps) =>{
        if (prevProps.shb_item_id !== this.props.shb_item_id) {
            this._memberCheck();
            this._getPost();
        }
    }

    _memberCheck = async() =>{
        // console.log(this.props);
        if(this.props._sess){
            await memberApi.member_check(this.props._sess, this.props.shb_item.shb_num)
            .then(data=>{
                if(data.message==='valid'){
                    this.setState({isMember:true});
                }else{
                    this.setState({isMember:false});
                }
            });
        }   
    }

    _memberApplyCheck = async() =>{
        if(this.props._sess){
            await memberApi.member_check_apply(this.props._sess, this.props.shb_item.shb_num)
            .then(data=>{
                if(data.message==='have'){
                    this.setState({canApplyGroup:false});
                }else{
                    this.setState({canApplyGroup:true});
                }
            })
        }
    }

    _getPost = () => {
        Axios.get(`${serverUrl}/api/shb/post/getpost/category/all`,{
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
            this.setState({postLists:data});
        })
        .catch(err=>alert('포스트 겟 에러'))
    }

    _onClickReloadPost = async()=>{
        // await this.setState({ isLoading:true });
        this._getPost();
        
    }
    render() {
        // console.log(this.props.shb);
        // console.log(this.state.postLists.length);
        // console.log(this.props.shb_item.shb_item_id);
        return(
            <div>
                {this.state.postLists && this.props.shb_item?
                    <div>
                        <BoardCategoryBody
                            {...this.props}
                            {...this.state}
                            _onClickReloadPost = {this._onClickReloadPost}
                        />
                    </div>
                :
                    <BoardCategoryLoading/>
                }
            </div>
        );
        // if(this.state.postLists && this.props.shb_item){
        //     return (
        //         <div>
        //             <BoardCategoryBody
        //                 {...this.props}
        //                 {...this.state}
        //                 _onClickReloadPost = {this._onClickReloadPost}
        //             />
        //         </div>
        //     );
        // }else{
        //     return(
        //         <BoardCategoryLoading/>
        //     );
        // }
        
        
    }
}

const mapStateToProps = (state)=>{
    return{
        _sess: state.auth_user._sess,
        _isLogged : state.auth_user._isLogged
    }
}

export default connect(mapStateToProps)(BoardCategoryMain);