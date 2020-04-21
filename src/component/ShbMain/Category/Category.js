import React,{lazy} from 'react';
import Axios from 'axios';

//Authorization
import AuthKey from '../../../config/AuthorizationKey';

import { serverUrl } from '../../../config/serverUrl';
import queryString from 'query-string';

//Component
import Nav from '../../Nav/Nav';
import BoardCategory from '../BoardCategory';
import AdsCategory from '../AdsCategory';
import ContactCategory from '../ContactCategory';
import PartnerCategory from '../PartnerCategory';
import ContentsListsCategory from '../ContentsListsCategory';
import FeedbackFixCategory from '../FeedbackFixCategory';

const MobileLinkShortCutCategory = lazy(()=>import('../MobileLinkShortCutCategory'));

class Category extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state={
            category:null,
            queryValues:queryString.parse(this.props.location.search)
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this._getCategoryClassify(this.props.match.params.shb_item_id)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidUpdate = (prevProps) =>{
        
        if(prevProps!==this.props){
            this._getCategoryClassify(this.props.match.params.shb_item_id)
        }
        
    }

    _getCategoryClassify = async (shb_item_id) => {
        Axios.get(`${serverUrl}/api/shb/shbItem/getOne`, {
            params: {
                shb_item_id: shb_item_id,
                shb_num: this.state.queryValues.BomNo
            },
            headers:{
                Authorization:'Bearer ' + AuthKey
            }
        }).then(res => res.data)
        .then(data=>{
            if(data.message==='success'){
                this.setState({category:data.data});
            }else if(data.message==='failure'){
                alert('잘못된 접근 방식 입니다.');
                window.history.back();
            }else if(data.message==='error'){
                alert('서버와 연결이 고르지 않습니다.')
            }
        })
        .catch(err => alert('서버 연결 시간이 초과되었습니다. 다시 시도해 주세요'));
    }

    render() {
            const categoryComponent=[];
            if(this.state.category){
                switch(this.state.category.shb_item_classify){
                    case 'board':
                        categoryComponent.push(
                            <BoardCategory
                                {...this.props}
                                shb_item={this.state.category}
                            />
                        );
                        break;
                    case 'ads':
                        categoryComponent.push(<AdsCategory/>);
                        break;
                    case 'contact':
                        categoryComponent.push(<ContactCategory/>);
                        break;
                    case 'partner':
                        categoryComponent.push(
                            <PartnerCategory
                                {...this.props}
                            />
                        );
                        break;
                    case 'contents-list':
                        categoryComponent.push(<ContentsListsCategory/>);
                        break;
                    case 'feedback-fix':
                        categoryComponent.push(
                            <FeedbackFixCategory
                                imageUploadApiAddress={`${serverUrl}/api/uploadimg/draft-oss`} //must defined
                                writeApiAddress={`${serverUrl}/api/service/feedback/fix/write`} //must defined
                                getApiAddress={`${serverUrl}/api/service/feedback/fix/get/all`} //must defined
                                authorizationKey = {'Bearer ' + AuthKey}    //must defined
                            />
                        );
                        break;
                    case 'shortcut-mobile':
                        categoryComponent.push(
                            <MobileLinkShortCutCategory
                            
                            />
                        );
                        break;
                    default:
                        break;
                }
            }
            return (
                <div>
                    
                    {categoryComponent}
                </div>
            );
        // }else{
        //     return(
        //         <h1>Loading....</h1>
        //     );
        // }
    }
}

export default Category;