import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./message";
import ContactCard from "./ContactCard";
import SearchContact from "./SearchContact";
import Nav from "../Nav/Nav";
// import MoreCategory from "../Univ/layout/MoreCategory";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
  padding: 0px 2.2rem;
`;

class ContactPresenter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log(this.props);
    const style = {
      paperHeader: {
        padding: "1rem",
        fontSize: "1.5rem"
      },
      paperBody: {
        padding: "1rem",
        fontSize: "1rem"
      },
      Grid: {
        padding: "8px"
      }
    };
    return (
      <>
        <Nav />
        <div className="container shadow-sm animate slideIn clearfix">
          <Container>
            <div style={style.Grid}>
              <Grid container spacing={2}></Grid>
              <Grid item xs={12} sm={12}>
                <Paper style={style.paperHeader}>봄연락처</Paper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Paper style={style.paperBody} className="clearfix my-4">
                <p>안녕하세요 상해봄팀 입니다! 봄연락처는 상해에서 생활하시는 한인들의 연락처를 담기 위하여 만들었습니다.</p >
                <p>저희가 상해에서 생활을 하면서 어느 학교의 학생회장의 연락처나 배송업무를 제공하는 업체의 연락처등등 정보를 얻는데 많은 불편함이 있었습니다. 그래서 이러한 수고를 덜기 위하여 상해봄에서 전화번호부를 제공하게 되었습니다.</p >
                <p>상해봄에 연락처를 등록하기 희망하시는 분은 아래의 QR코드에 개인정보를 양식의 맞춰 보내주시면 됩니다.</p >
                </Paper>
              </Grid>
              <SearchContact
                contactVals={this.props.contactVals}
                searchTerm={this.props.searchTerm}
                loading={this.props.loading}
                handleSubmit={this.props.handleSubmit}
                updateTerm={this.props.updateTerm}
                writeData={this.props.writeData}
              />

              <ContactCard contactVals={this.props.contact} />
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default ContactPresenter;