import React from "react";
// import UnivBody from "../UnivBody";
import MainSearchPresenter from "./MainSearchPresenter";
// import "../PublicCss/UnivBody.css";
// import "../PublicCss/SlideAnimation.css";

import Axios from "axios";
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
    const url = '/api/univ_post/search/all';
    // console.log(url);
    return await Axios.get(url,{
        params:{
            // univ_id,
            writeData: encodeURIComponent(term)
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
    //   console.log(postVals);
      this.setState({
        postVals
      });
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
        <>
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
        </>
    );
  }
}