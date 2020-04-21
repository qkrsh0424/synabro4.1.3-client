import React from 'react';
import {connect} from 'react-redux';

//Component
import PartnerCategoryBody from './PartnerCategoryBody';

import Nav from '../../Nav/Nav';
const PartnerCategoryMain = (props) =>{
    const [partnerApplyFormOpen,setPartnerApplyFormOpen] = React.useState(false);
    const handleCheckLogin = ()=>{
        if(props._isLogged){
            setPartnerApplyFormOpen(!partnerApplyFormOpen);
        }else{
            alert('로그인이 필요합니다.');
            props.history.push('/login');
        }
    }
    return(
        <div>
            <Nav/>
            <PartnerCategoryBody
                partnerApplyFormOpen={partnerApplyFormOpen}
                
                handleCheckLogin={handleCheckLogin}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        _parentRoute:state.parent_route.parentRoute,
        _sess: state.auth_user._sess,
        _isLogged: state.auth_user._isLogged,
        _nickname: state.auth_user._nickname
    }
}

export default connect(mapStateToProps)(PartnerCategoryMain);