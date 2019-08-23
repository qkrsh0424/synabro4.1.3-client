import React from 'react';
import '../UnivHome.css';
import '../../PublicStyle/SlideAnimation.css';
import Axios from 'axios';

import {PropTypes} from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import UnivHomeNoticeArea from './UnivHomeNoticeArea';
import MoreCategory from './MoreCategory';

const propTypes = {

}

const defaultProps = {

}

class UnivHome extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const beneLoading = (
            <div className="progress d-block bene_Big_Size">
                <div className="progress-bar progress-bar-striped progress-bar-animated bene_Big_Size bg-light">
                    <span className="text-secondary">image Loading...</span>
                </div>  
            </div>
        );
        return(
            <div className='container'>
                <MoreCategory/>
                <div id="carouselExampleControls" className="carousel slide shadow-sm animate slideIn" data-ride="carousel">
                        <div className="carousel-inner">
                        {this.props.beneBig?this.props.beneBig.map((row,index)=>{
                            if(index===0){
                                return(
                                    <div key={index} className="carousel-item active" data-interval="2000">
                                        <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                                    </div>
                                );
                            }else{
                                return(
                                    <div key={index} className="carousel-item" data-interval="2000">
                                        <img src={row.bene_image} className="d-block bene_Big_Size" alt="..."/>
                                    </div>
                                );
                            }
                        }):beneLoading}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <hr/>
                    <UnivHomeNoticeArea
                        univ_id = {this.props.univ_id}
                        notice_post={this.props.notice_post}
                    />

                    <div className="row mb-2 animate slideIn">
                        <div className="col-md-6">
                            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary">World</strong>
                                <h3 className="mb-0">Featured post</h3>
                                <div className="mb-1 text-muted">Nov 12</div>
                                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <a href="/" className="stretched-link">Continue reading</a>
                                </div>
                                <div className="col-auto d-none d-lg-block">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/boardlogo/LibroDemo.png" alt="..."style={{width:200, height:250}}></img>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Design</strong>
                                <h3 className="mb-0">Post title</h3>
                                <div className="mb-1 text-muted">Nov 11</div>
                                <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <a href="/" className="stretched-link">Continue reading</a>
                                </div>
                                <div className="col-auto d-none d-lg-block">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/boardlogo/LibroDemo.png" alt="..." style={{width:200, height:250}}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hot_topic container">
                        <div className="container">
                            <h4 className="univ_title">{this.props.univ_title}</h4>
                            <div className="card-deck">
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                                <div className="card">
                                    <img src="https://synabrodemo.s3.ap-northeast-2.amazonaws.com/smallbene/notbene.png" className="card-img-top" alt="..."/>
                                </div>
                            </div>
                            <nav className="pagination_tab" aria-label="...">
                                <ul className="pagination pagination-sm">
                                    <li className="page-item active" aria-current="page">
                                    <span className="page-link">
                                        1
                                        <span className="sr-only">(current)</span>
                                    </span>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
            </div>
        );
    }
}

UnivHome.propTypes = propTypes;

UnivHome.defaultProps = defaultProps;


export default UnivHome;