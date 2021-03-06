import React from 'react';
import './ShbCrewHome.css';
import '../Intro/Intro.css';

import {Link} from 'react-router-dom';
//API
import * as api from '../../../handler/cliApi/shb';
import * as bannerApi from '../../../handler/cliApi/banner';

//Component
import Nav from '../../Nav/Nav';
import HomeBody from './HomeBody';

class HomeMain extends React.Component{
    constructor(props){
        super(props);
        this.state={
            shb:null,
            shb_itemHeaders:null,
            shb_item:null,
            postLists:null,
            bannerHeader:null,
            startPostIndex:0,
            currentPostIndex:20,
            nextPostLoading:false,
            reloadSnackOpen:false,
        }
    }

    componentDidMount = ()=>{
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this._getShb();
        this._getShbItemHeader();
        this._getShbItem();
        this._getPostListsForShbNum();
        this._getBanner();
        
    }

    componentDidUpdate = (prevProps, prevState)=>{
        if (prevProps.location != this.props.location) {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
            this.setState({currentPostIndex:20});
            this._getShb();
            this._getShbItemHeader();
            this._getShbItem();
            this._getPostListsForShbNum();
            this._getBanner();
        }
    }
    

    _getShb = async()=>{
        await api.shb_getShbOne(this.props.match.params.shb_num) //crew는 선택사항.
        .then(data=>this.setState({shb:data.data[0]}));
    }

    _getShbItemHeader = async()=>{
        await api.shb_getShbAllItemHeader(this.props.match.params.shb_num)
        .then(data=>{
            this.setState({shb_itemHeaders:data.data})
        });
    }

    _getShbItem = async() => {
        await api.shb_getShbAllItemList(this.props.match.params.shb_num)
        .then(data=>this.setState({shb_item:data.data}));
    }

    _getPostListsForShbNum = async()=>{
        await api.shb_getShbAllPostForShbNum(this.props.match.params.shb_num,this.state.startPostIndex,this.state.currentPostIndex)
        .then(data=>this.setState({postLists:data}));
    }

    _getBanner = async() =>{
        // console.log(this.props.match.params.shb_num);
        this.setState({bannerHeader:null});
        bannerApi.banner_getBanner_headType_bannerType(this.props.match.params.shb_num, 'header')
        .then(data=>{
            if(data.message==='success'){
                this.setState({bannerHeader:data.data});
            }else if(data.message==='none'){
                this.setState({bannerHeader:data.noData});
            }else{
                this.setState({bannerHeader:null});
            }
        });
    }

    reloadPost = async () =>{
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        await this.setState({ reloadSnackOpen: true });
        await this._getPostListsForShbNum();
    }

    nextPost = async () =>{
        await this.setState({ nextPostLoading: true });
        await this.setState({ currentPostIndex: this.state.currentPostIndex+20 });
        await this._getPostListsForShbNum();
        await this.setState({ nextPostLoading: false });
    }

    handleReloadSnackClose = async()=>{
        await this.setState({ reloadSnackOpen: false });
    }

    render(){
        // console.log(this.state.postLists);
        return(
            <div>
                
                <div 
                    id="header_stickyTest"
                    class="header_stickyTest w-100 crewContainer" 
                    style={{
                        backgroundImage:this.state.shb?`url(${this.state.shb.shb_image_url})`:"",
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                >
                    <Nav/>
                    <div className='header_stickyTest2 '>
                        {/* {this.state.shb?
                            <div className='textStyle'>
                                <h3 className='text-center clearfix'>
                                    <h2>{this.state.shb.shb_name}</h2>
                                </h3>
                                <p>{this.state.shb.shb_introduce}</p>
                            </div>
                        :""} */}
                        <div className='jumbotron mt-3 mb-3 shadow bg-light HeaderPart'>
                    {this.state.shb?
                        <div>
                            <h3 className='text-center clearfix'>
                                <Link to={`/classify/${this.state.shb.shb_classify}/contype/${this.state.shb.shb_num}`} className='Text'>
                                    <span>{this.state.shb.shb_name}</span>
                                </Link>
                                
                                {/* <button className='float-right'>B</button> */}
                            </h3>
                            <p>{this.state.shb.shb_introduce?this.state.shb.shb_introduce:""}</p>
                            </div>
                        :""}
                </div>
                    </div>
                    
                </div>
                
                <HomeBody
                    {...this.props}
                    {...this.state}

                    reloadPost = {this.reloadPost}
                    nextPost = {this.nextPost}
                    handleReloadSnackClose = {this.handleReloadSnackClose}
                />
            </div>
        );
    }
}

export default HomeMain;