import React from 'react';
import './Intro.css';

//URL
import {awsImageURL} from '../../../config/awsurl';

//Router DOM
import {Link} from 'react-router-dom';

//Core
import Grid from '@material-ui/core/Grid';

//Component
import CrewCard from './CrewCard';
class IntroBody extends React.Component{

    render(){
        console.log(this.props.shb);
        const styles = {
            root:{
                flexGrow:1,
            }
        }

        // const { classes } = this.props;
        return(
            <div className='container crew_Intro_Styles'>
                <div className='jumbotron mt-3 shadow bg-light HeaderPart'>
                    <h3 className='text-center'>
                        {/* 봄 CREW */}
                        {this.props.parentRoute && this.props.parentRoute.map(rows=>{
                           if(rows.parent_route===this.props.shbParentRoute) {
                               return(
                                   rows.route_name
                               );
                           }
                        })}
                    </h3>
                </div>
                
                <div className="wrapper_notice animate slideIn">
                    {this.props.shb?this.props.shb.map(rows=>{
                        // console.log(rows);
                        return(
                            <Link to={`/${rows.shb_classify}/contype/${rows.shb_num}`} className="card card_notice_t hover_animate">
                                {rows.shb_image_url?<img src={rows.shb_image_url} className="card-img-top car-img-top_t" alt="..."/>:
                                    <img src={`${awsImageURL}/logo/imageNo2.gif`} className="card-img-top car-img-top_t" alt="..."/>
                                }
                                
                                <div className="card_header_t  pt-0 ml-1 mr-3 text-dark">
                                    {/* <Notification_icon color="secondary"/>{rows.post_topic} */}
                                    {rows.shb_name}
                                </div>
                                <div className="card-body_t mt-0 ml-1 mr-1">
                                    <div className="card_writer">
                                    <p className="text-muted">
                                        {rows.shb_introduce?
                                            rows.shb_introduce.length>70?`${rows.shb_introduce.substring(0,70)}...`:rows.shb_introduce
                                            :"소개글 준비중입니다."}
                                    </p>
                                    </div>
                                </div>
                            </Link>
                        );
                        
                    }):"loading"}
                </div>
            </div>
        );
    }
}

export default IntroBody;