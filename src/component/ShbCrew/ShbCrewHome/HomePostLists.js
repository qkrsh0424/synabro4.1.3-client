import React from 'react';

//router dom
import {Link} from 'react-router-dom';

//URL
import {awsImageURL} from '../../../config/awsurl';

//Core
import CircularProgress from '@material-ui/core/CircularProgress';

class HomePostLists extends React.Component{
    
    render(){
        return(
            <div className="wrapper_notice animate slideIn">
                {this.props.postLists?this.props.postLists.map(rows=>{
                    // console.log(rows);
                    if(rows.editorType==='sheditor'){
                        return(
                            <Link 
                                to={`/postPage?BomNo=${rows.shb_num}&Category=${rows.shb_item_id}&Pr=${rows.parent_route}&PostVal=${rows.post_id}`} 
                                className="card card_notice_t hover_animate"
                            >
                                {rows.post_thumbnail_url==='none'?<img src={`${awsImageURL}/logo/imageNo2.gif`} className="card-img-top car-img-top_t" alt="..."/>:
                                    <img src={rows.post_thumbnail_url} className="card-img-top car-img-top_t" alt="..."/>
                                }
                                
                                <div className="p-3 text-dark text-bold crewContainerCardHeader">
                                        {rows.post_title}
                                </div>
                                <div className="crewContainerCardBody p-3">
                                        {rows.shb_item_name}
                                </div>
                            </Link>
                        );
                    }
                    return(
                        <Link to={`/classify/${rows.parent_route}/category/${rows.shb_item_id}/v/${rows.post_id}?BomNo=${rows.shb_num}`} className="card card_notice_t hover_animate">
                            {rows.post_thumbnail_url==='none'?<img src={`${awsImageURL}/logo/imageNo2.gif`} className="card-img-top car-img-top_t" alt="..."/>:
                                <img src={rows.post_thumbnail_url} className="card-img-top car-img-top_t" alt="..."/>
                            }
                            
                            <div className="p-3 text-dark text-bold crewContainerCardHeader">
                                {/* <Notification_icon color="secondary"/>{rows.post_topic} */}
                                
                                    {rows.post_title}
                            </div>
                            <div className="crewContainerCardBody p-3">
                                    {/* <p className="text-secondary"> */}
                                        {rows.shb_item_name}
                                    {/* </p> */}
                            </div>
                            {/* <div className="card-body_t mt-0 ml-1 mr-1">
                                <div className="card_writer">
                                    <p className="text-muted">
                                        {rows.shb_introduce?
                                            rows.shb_introduce.length>70?`${rows.shb_introduce.substring(0,70)}...`:rows.shb_introduce
                                            :"내용이 없습니다."}
                                    </p>
                                </div>
                            </div> */}
                        </Link>
                    );
                    
                }):""}
            </div>
        );
    }
}

export default HomePostLists;