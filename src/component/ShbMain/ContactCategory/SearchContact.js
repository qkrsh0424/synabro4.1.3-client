import React from "react";
import PropTypes from "prop-types";
import styled, {css} from "styled-components";
import Message from "./message";
import ContactCard from "./ContactCard";

const Container = styled.div`

.title{
    font-size:40px;
    /* padding: 0px 3.5rem; */
  }
.search_title{
  text-align:center;
  color:#95a5a6;
}

.input {
    display: inline-block;
    width: 100%;
    
  }
  .input:after {
    display: block;
    content: "";
    border-bottom: 1.5px solid #757575;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  div.input:hover:after {
    transform: scaleX(0.8);
     transform-origin:   00% 50%; 
  }

`;

const Form = styled.form`
padding-top:30px;
/* padding-left:1; */
  margin-bottom: 50px;
  width: 100%;
  
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const SearchContact = ({
  handleSubmit,
  updateTerm,
  searchTerm,
  contactVals,
  loading,
}) => 
(
  <>
    <Container>
    <div className="title">봄연락처</div>

      <Form onSubmit={handleSubmit}>
      <div className="input">
        <Input
          placeholder="연락처를 검색해보세요"
          value={searchTerm}
          onChange={updateTerm}
        />
        </div>
      </Form>
      {searchTerm === "" ? ("") : (
                <>
              {contactVals && contactVals.length === 0 &&(
                <Message text={`${searchTerm}와(과) 일치하는 연락처가 없습니다.`} color="#95a5a6" />
              )}
              </>
              )
            }
      {loading ? (
        <p>Loading...</p>
      ) :( 
        <>
          {contactVals && contactVals.length > 0 && (
            <div className="search_title">
              {`${searchTerm}의 연락처 결과 입니다.`}
              
                <ContactCard key="list" contactVals={contactVals} />
                
           
            </div>
          )}
          
        </>
      )}
            
      
    </Container>
  </>
);
export default SearchContact;
