import React from 'react';
import styled from "styled-components";

//Compoent
import AdsCategoryBody from './AdsCategoryBody';
import Nav from '../../Nav/Nav';

class AdsCategoryMain extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    
    render(){
        return(
            <div>
                <Nav/>
                <AdsCategoryBody />
            </div>
            
        );
    }
    
}

export default AdsCategoryMain;