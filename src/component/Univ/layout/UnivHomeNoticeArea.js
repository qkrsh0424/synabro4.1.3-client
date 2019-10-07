import React from 'react';

import { Link } from 'react-router-dom';
import { calculateTime } from '../../../controler/calculateTime'

import PostPreview from './PostPreview';

// Material Icons
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';

const propTypes = {

}

const defaultProps = {

}

class UnivHomeNoticeArea extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const postLoading = (
            <div className="media text-muted pt-3 border-bottom border-gray">
                <h6>
                    <span className="badge"><button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button></span>
                    <hr/>
                    <div className="small"><button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button><br/> <button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button> </div>
                </h6>
                <div className="media-body pb-3 pl-2 mb-0 lh-125">
                    <p><strong className="d-block text-gray-dark"><button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button></strong></p>
                    <p><a href="/" className="text-dark"><button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button></a></p>
                    <button className="progress-bar-striped progress-bar-animated btn btn-light btn-lg btn-block"></button>
                </div>
            </div>
        );

        return(
            <div>
                <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0"><Link className="text-danger" to={'/univ/'+this.props.univ_id+'/10002'}>공지사항</Link></h6>
                {this.props.notice_post?this.props.notice_post.map((row,index)=>{
                    if(row!==null){
                        var currentDate = new Date();
                        var createDate = new Date(row.post_created);
                        return(
                            <div className="media text-muted pt-3 border-bottom border-gray" key={index}>
                                <h6>
                                    <span className="badge badge-pill badge-danger">공 지</span>
                                    <hr/>
                                    <div className="small">조회수:[{row.post_view_count}]<br/> 댓글:[{row.post_comment_count}] </div>
                                </h6>
                                <div className="media-body pb-3 pl-2 mb-0 lh-125">
                                    <div><strong className="d-block text-gray-dark">작성자 : {row.user_nickname}</strong></div>
                                    <div>
                                        <Link to={`/univ/${row.univ_id}/${row.post_type}/v/${row.post_id}`} className="text-dark">
                                            {row.post_topic}
                                            &nbsp;
                                            {row.post_image_count!==0?
                                                <span href="#" className="font-weight-normal"><PhotoLibraryOutlinedIcon style={{fontSize:"20px"}}/>({row.post_image_count})</span>
                                                :""
                                            }
                                        </Link>
                                    </div>
                                    <PostPreview
                                        btn_name={"미리보기"}
                                        post_id={row.post_id} 
                                        post_topic={row.post_topic} 
                                        post_desc={row.post_desc}
                                    />
                                </div>
                                
                                <time>{calculateTime(currentDate,createDate)}</time>
                                
                            </div>
                        );
                    }
                }):
                <div>
                    {postLoading}
                    {postLoading}
                    {postLoading}
                </div>
                }
            </div>
            </div>
        );
    }
}

UnivHomeNoticeArea.propTypes = propTypes;

UnivHomeNoticeArea.defaultProps = defaultProps;

export default (UnivHomeNoticeArea);