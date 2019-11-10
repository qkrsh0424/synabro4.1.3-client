import React from "react";
// import UnivBody from "../UnivBody";
import MainSearchPresenter from "./MainSearchPresenter";
// import "../PublicCss/UnivBody.css";
// import "../PublicCss/SlideAnimation.css";
import Axios from "axios";

//Authorization
import AuthKey from '../../config/AuthorizationKey';

//URL
import {serverUrl} from '../../config/serverUrl';

import FullDialog from "./FullDialog";


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postVals: null,
      searchTerm: "",
      error: null,
      loading: false
    };

    this._callPostData = this._callPostData.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
  }

  async _callPostData(term) {
    const url = `${serverUrl}/api/utill/mainSearch/search/shb`;
    // console.log(url);
    return await Axios.get(url,{
        params:{
            // univ_id,
            writeData: encodeURIComponent(term)
        },
        headers:{
            Authorization:'Bearer ' + AuthKey
        }
    }).then(res=>res.data)
          
  }

  // async componentDidMount() {
  //   await this.handleSubmit();
  //   // await this._callPostData();
  // }

  handleSubmit = event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  async updateTerm(event) {
    const {
      target: { value }
    } = event;
    await this.setState({
      searchTerm: value
    });

    await this.searchByTerm();
  };

  searchByTerm = async () => {
    this._callPostData();
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      const postVals = await this._callPostData(searchTerm);
      if(postVals && postVals.message==='none'){
        this.setState({postVals:null,error:"Can't find results."});
      }else{
        this.setState({
          postVals:postVals.data,
          error:""
        });
      }
      
    } catch {
      this.setState({ error: "Can't find results." });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    // console.log(this.props);
    const { postVals, searchTerm, loading, error } = this.state;
    // console.log(postVals);
    return (
        <div className='mb-5'>
        <MainSearchPresenter
          postVals={postVals}
          searchTerm={searchTerm}
          loading={loading}
          error={error}
          handleSubmit={this.handleSubmit}
          updateTerm={this.updateTerm}
        />
        {/* <FullDialog
        postVals={postVals}
          searchTerm={searchTerm}
          loading={loading}
          error={error}
          handleSubmit={this.handleSubmit}
          updateTerm={this.updateTerm}
        /> */}
        </div>
    );
  }
}