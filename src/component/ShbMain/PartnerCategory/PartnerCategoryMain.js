import React from 'react';
import PartnerCategoryBody from './PartnerCategoryBody';

import Nav from '../../Nav/Nav';
class PartnerCategoryMain extends React.Component{
    render(){
        return(
            <div>
                <Nav/>
                <PartnerCategoryBody/>
            </div>
        );
    }
}

export default PartnerCategoryMain;