import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./message";
import ContactCard from "./ContactCard";
import SearchContact from "./SearchContact";
import Nav from "../Nav/Nav"
import MoreCategory from "../Univ/layout/MoreCategory"


const Container = styled.div`
padding: 0px 2.2rem;
`;

class ContactPresenter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Nav />
        <div className="container shadow-sm animate slideIn clearfix">
      <Container>
      <MoreCategory/>
        <SearchContact
          contactVals={this.props.contactVals}
          searchTerm={this.props.searchTerm}
          loading={this.props.loading}
          handleSubmit={this.props.handleSubmit}
          updateTerm={this.props.updateTerm}
          writeData = {this.props.writeData}
      />
        
        <ContactCard
          contactVals={this.props.contact}
          />

      </Container>
        </div>
        </div>
    );
  }
}

export default ContactPresenter;
