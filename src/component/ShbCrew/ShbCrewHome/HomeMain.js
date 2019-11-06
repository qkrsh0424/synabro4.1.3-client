import React from 'react';
import './ShbCrewHome.css';

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
            shb_item:null,
            postLists:null,
            bannerHeader:null,
        }
    }

    componentDidMount = ()=>{
        this._getShb();
        this._getShbItem();
        this._getPostListsForShbNum();
        this._getBanner();
    }

    componentDidUpdate = (prevProps, prevState)=>{
        if (prevProps.location != this.props.location) {
            this._getShb();
            this._getShbItem();
            this._getPostListsForShbNum();
            this._getBanner();
        }
    }
    

    _getShb = async()=>{
        await api.shb_getShbOne(this.props.match.params.shb_num) //crew는 선택사항.
        .then(data=>this.setState({shb:data.data[0]}));
    }

    _getShbItem = async() => {
        await api.shb_getShbAllItemList(this.props.match.params.shb_num)
        .then(data=>this.setState({shb_item:data.data}));
    }

    _getPostListsForShbNum = async()=>{
        await api.shb_getShbAllPostForShbNum(this.props.match.params.shb_num)
        .then(data=>this.setState({postLists:data}));
    }

    _getBanner = async() =>{
        console.log(this.props.match.params.shb_num);
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

    render(){
        // console.log(this.state.postLists);
        return(
            <div>
                <Nav/>
                <HomeBody
                    {...this.props}
                    {...this.state}
                />
            </div>
        );
    }
}

export default HomeMain;