import React from "react";
import App from "../App";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  display: flex;
  align-items: center;
  padding: 4em;
  border-radius: 5px;
  width: max-content;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3d3d6c;
  position: fixed;
`;

const H1 = styled.h1`
  color: red;
`;

const Landing = () => {
  return (
    <Container>
      <Wrapper>
        <H1>Hey! Har du kjøpt billett? Da får du mail er oss. MIP MIP</H1>
      </Wrapper>
    </Container>
  );
};

export default Landing;
