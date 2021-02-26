import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  margin: auto;

  @meida only and screen (max-width: 960px) {
    width: 95%;
  }
`;

const Stream = () => {
  return <Container>content</Container>;
};

export default Stream;
