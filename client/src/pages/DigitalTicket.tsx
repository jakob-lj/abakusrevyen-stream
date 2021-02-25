import React from "react";
import styled from "styled-components";

import logo from "../assets/logo.png";
import deloitteLogo from "../assets/deloitte/DEL_SEC_RGB.png";
import sopraLogo from "../assets/sopra/v1.png";

const Background = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgb(29, 50, 94);
  display: block;
`;

const Container = styled.div`
  width: 50%;
  margin: auto;
  padding-top: 4em;

  min-height: calc(100vh - 4em);

  @media only screen and (max-width: 960px) {
    width: 90%;
  }
`;

const Logo = styled.img`
  max-width: 100%;
`;

const H3 = styled.h3`
  color: white;
  text-align: center;
`;

const H5 = styled.h5`
  margin-top: 3em;
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

const SponsorContainer = styled.div`
  width: 100%;
  display: flex;
  height: 8 em;
`;

const SponsorLogo = styled.img`
  display: block;
  width: 40%;
  height: intrinsic;
  margin: auto;
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
        <H5>Revyen er sponset av:</H5>
        <SponsorContainer>
          <SponsorLogo src={deloitteLogo} />
          <SponsorLogo src={sopraLogo} />
        </SponsorContainer>
      </Container>
    </Background>
  );
};

export default DigitalTicket;
