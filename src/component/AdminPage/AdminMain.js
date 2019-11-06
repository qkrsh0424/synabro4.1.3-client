import React from 'react';

//react redux
import {connect} from 'react-redux';

//react router
import {Redirect} from 'react-router-dom';

// API
import * as adminApi from '../../handler/cliApi/admin';
import * as shbApi from '../../handler/cliApi/shb';

//Component
import AdminBody from './AdminBody';
import ScrollTabs from './AdminScrollTabs';
import Nav from '../Nav/Nav';
class AdminMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            pageLoad:false,
            group:null,
            members:null,
        }
    }

    componentDidMount = async() =>{
        await this._adminAuthCheck();
    }

    _adminAuthCheck = async() =>{
        adminApi.admin_group_master_check(this.props._sess)
        .then(data=>{
            if(data.message==='success'){
                this._getGroupHeader(data.data);
                this._getGroupMembers(data.data);
                this.setState({pageLoad:true});
            }else{
                this.setState({pageLoad:false});
            }
        });
    }

    _getGroupHeader = (head_type)=>{
        shbApi.shb_getShbOne(head_type)
        .then(data=>{
            if(data.message==='success'){
                this.setState({group:data.data[0]});

            }else{
                window.location.href='/'
            }
        });
    }

    _getGroupMembers = (head_type) =>{
        adminApi.admin_Members_Of_Group(head_type)
        .then(data=>{
            if(data.message==='success'){
                this.setState({members:data.data});
            }else if(data.message==='none'){
                this.setState({members:null});
            }else{
                window.location.href='/'
            }
        })
    }

    render(){
        return(

            <div>
                {this.state.pageLoad?
                    // <AdminBody
                    //     {...this.props}
                    //     {...this.state}
                    // />
                    <>
                        <Nav/>
                        <ScrollTabs
                            {...this.props}
                            {...this.state}
                            _getGroupMembers = {this._getGroupMembers}
                        />
                    </>
                :""}
            </div>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

export default connect(mapStateToProps)(AdminMain);