import React, { Component } from "react";
import styled from "styled-components";
import Iframe from "react-iframe";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import { Header } from "./ui";
import { mainColor, lightBlue, resumeColor } from "../styles/variables.scss";

const FullPageWrap = styled.div`
  background: ${lightBlue};
  color: ${mainColor};
  position: absolute;
  background: #f7f7f7;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`;

const Container = styled.div`
  top: -30px;
  position: relative;
  height: 80%;
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  ${media.portrait.md`
    width: 97%;
  `}
`;

const Resume = styled.div`
  position: relative;
  background: #fff;
  padding: 40px;
  padding-bottom: 0;
  margin: 0 auto;
  height: 100%;
  border: 1px solid ${mainColor};
  z-index: 5;
  object {
    border: 1px solid ${mainColor};
  }
  ${media.portrait.xl`
    padding: 40px;
  `}
  ${media.portrait.md`
    padding: 20px;
  `}
`;
const FallbackText = styled.div`
  color: ${lightBlue};
  font-size: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    width: 50%;
    display: block;
  }
  ${media.portrait.md`
  font-size: 1.5em;
    p {
      width: 80%;
      display: block;
    }
  `}
  ${media.landscape.md`
  font-size: 1.5em;
    p {
      width: 80%;
      display: block;
    }
  `}
`;

export default class Contact extends Component {
  state = {
    visisible: false,
  };

  componentDidMount() {
    this.setState({
      visisible: true,
    });
  }

  render() {
    return (
      <FullPageWrap>
        {this.props.children}
        {!this.props.menuBtnShowing && (
          <NavItems
            color={"#5296ce"}
            hovercolor={"#205887"}
            path={this.props.location.pathname}
          />
        )}
        <Container>
          <Header
            pose={this.state.visisible ? "visible" : "hidden"}
            color={resumeColor}
          >
            resume
          </Header>
          <Resume pose={this.state.visisible ? "visible" : "hidden"}>
            <Iframe
              url="https://s3-us-west-1.amazonaws.com/matthew-masurka-portfolio/resume.pdf"
              position="relative"
              width="100%"
              height="100%"
              allowFullScreen
              style={{ width: "50%" }}
            >
              <FallbackText>
                <p>
                  If resume doesn't load, click here:
                  <a href="/resume.pdf" target="_blank">
                    {" "}
                    [ PDF ]
                  </a>
                </p>
              </FallbackText>
            </Iframe>
          </Resume>
        </Container>
      </FullPageWrap>
    );
  }
}
