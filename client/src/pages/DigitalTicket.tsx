import React from "react";
import styled from "styled-components";

import logo from "../assets/logo.png";

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(29, 50, 94);
  display: block;
  position: fixed;
`;

const Container = styled.div`
  width: 50%;
  position: relative;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
`;

const Logo = styled.img`
  max-width: 100%;
`;

const H3 = styled.h3`
  color: white;
  text-align: center;
`;

const P = styled.p`
  color: white;
  text-align: center;
`;

const A = styled.a`
  color: red;
`;

const DigitalTicket = () => {
  return (
    <Background>
      <Container>
        <Logo src={logo} />
        <H3>Takk for at du har kjøpt billett!</H3>
        <P>
          Vi gleder oss til å vise dere hva vi har jobbet med i nesten ett år.
          Dette blir moro.
        </P>
        <P>
          Du vil bli tilsendt din digitale billett på mail når vi nærmer oss
          forestilling. Dersom du har spørsmål kan disse rettes til{" "}
          <A href="mailto:jakob.johannessen@abakus.no">
            jakob.johannessen@abakus.no
          </A>
        </P>
      </Container>
    </Background>
  );
};

export default DigitalTicket;
