import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
  .card_grid_container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 5rem;
    margin-top:40px;
    color: #444;
    border-bottom:1px solid #eee;
    padding-bottom:60px;
    margin-bottom:60px;

    
  }

  .card_grid {
    display:flex;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    font-family: "Trebuchet MS", sans-serif;
    border: solid 0.25px #dcdcdc;
    padding: 20px 20px;
    p {
      font-size: 10px;
      margin-bottom: 2px;
      &:first-of-type {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      &:nth-of-type(2) {
        font-size: 12px;
        margin-bottom: 12px;
      }
    }
  }

  img {
    height: 120px;
      
      border-radius:4px;
      transition: opacity 0.1s linear;
      width: 120px;
      overflow:hidden;
  margin-top: -35px;
  margin-left: -35px;
  margin-bottom: 15px;
  margin-right: 20px;
  backface-visibility: hidden;
  vertical-align: top;
  border-radius: 5px;
  }

`;

class ContactPresenter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <Container>
        <div>
          {this.props.contactVals && this.props.contactVals.length > 0 && (
            <div className="card_grid_container">
              {this.props.contactVals.map(contact => (
                <div className="card_grid">
                  <div className="img_container">
                  <img src="https://synabrodemo.oss-ap-southeast-1.aliyuncs.com/categoryIcons/android-icon-144x144.png" alt="..."></img>
                  </div>
                  <div>
                  <p>{contact.contact_name}</p>
                  <p>{contact.category}</p>
                  <p>{contact.company}</p>
                  <p>{contact.Tel}</p>
                  <p>{contact.wechat_id}</p>
                  <p>하고싶은말</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default ContactPresenter;