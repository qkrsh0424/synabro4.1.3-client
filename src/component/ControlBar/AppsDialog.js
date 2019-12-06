import React from 'react';
import { Dialog,DialogContent,DialogTitle } from '@material-ui/core';
import {Link} from 'react-router-dom';
const AppDialog = (props) =>{
    const {
        AppsOpen,
        handleAppsClose,
        appsCategory,
        _parentRoute,
        shb_lists,
        handleAppsLinkClick
    } = props;
        
    return(
        // Apps 모음 다이얼로그 // moreItems > Apps
        <Dialog
            open={AppsOpen}
            onClose={handleAppsClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth='lg'
        >
            <DialogTitle id="scroll-dialog-title" color='default'>모든 컨텐츠</DialogTitle>
            <DialogContent 
                // dividers={'paper'}
            >
                {/* {this.state.appsCategory?renderHtml(this.state.appsCategory):"loading"} */}
                <div class="container">
                    <div class="row">
                        
                        {appsCategory?appsCategory.map(rows=>{
                            return(
                                <div class="col-md-2">
                                    <Link 
                                        to={`/main/category/${rows.shb_item_id}?BomNo=${rows.shb_num}`}
                                        onClick={handleAppsLinkClick}
                                    >
                                        {rows.shb_item_name}
                                    </Link>
                                </div>
                            );
                        }):""}
                        
                    </div>
                </div>
                
                
            </DialogContent>
            <DialogTitle id="scroll-dialog-title">블로그 컨텐츠</DialogTitle>
            <DialogContent
            //  dividers={'paper'}
            >
                <div class="container">
                    <div class="row">
                        {_parentRoute?_parentRoute.map(rows=>{
                            return(
                                <div class="col-lg-4">
                                    <h5>{rows.route_name}</h5>
                                    <ul className="list-group list-group-flush">
                                        {shb_lists?shb_lists.map(rows2=>{
                                            if(rows.parent_route===rows2.shb_classify){
                                                return(
                                                    <li className="list-group-item p-2">
                                                        <Link 
                                                            to={`/classify/${rows2.shb_classify}/contype/${rows2.shb_num}`}
                                                            onClick={handleAppsLinkClick}
                                                        >
                                                        {rows2.shb_name}
                                                        </Link>
                                                    </li>
                                                );
                                            
                                            }
                                        }):""}
                                    </ul>
                                </div>
                            );
                        }):""}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AppDialog;