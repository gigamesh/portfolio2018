import React, { Component } from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import posed from "react-pose";
import { animations } from "../utils/animations";
import { mainColor } from "../styles/variables.scss";

const FullPageWrap = styled.div`
  overflow: hidden;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${media.portrait.xl`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  `}
  }
`;

const HeadShot = styled.div`
  background: url("/img/photos/headshot.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  ${media.portrait.xl`
    grid-row: 1/2;
    background: url("/img/photos/headshot-small.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  `}
`;

const Text = posed.div(animations.main);

const TextStyled = styled(Text)`
  a {
    color: #5296ce;
    font-weight: 300;
    &:hover {
      text-decoration: underline;
      color: #205887
    }
  }
  color: ${mainColor};
  margin: 0 auto;
  align-self: center;
  font-size: 1.8em;
  font-weight: 200;
  width: 80%;
  max-width: 650px;
  text-align: justify;
  line-height: 130%;
  span {
    display: block;
    text-align: center;
    position: relative;
    top: -30px;
    font-size: 2.8em;
    /* font-weight: 100; */
  }
  ${media.portrait.lg`
    font-size: 1.5em;
    span {
      top: -10px;
      font-size: 2.3em;
    }
  `}
  ${media.portrait.md`
      width: 90%;
    font-size: 1.1em;
    span {
      top: -10px;
      font-size: 2.1em;
    }
  `}
  ${media.portrait.sm`
    font-size: 1em;
    span {
      font-size: 1.8em;
      top: -10px;
    }
  `} 
  ${media.portrait.xs`
    font-size: 0.9em;
    width: 95%;
    span {
      font-size: 1.5em;
      top: -5px;
    }
  `}
  @media (max-width: 400px) and (min-height: 700px) {
    width: 80%;
    font-size: 1em;
    span {
      font-size: 1.7em;
      top: -10px;
    }
  }
  ${media.landscape.xl`
    font-size: 1.7em;
    span {
      font-size: 2.5em;
    }
  `}
  ${media.landscape.lg`
    font-size: 1.3em;
    span {
      top: -20px;
      font-size: 2.5em;
    }
  `}
  ${media.landscape.md`
    font-size: 1.1em;
  `}
  ${media.landscape.sm`
    font-size: 1em;
    span {
      font-size: 1.8em;
      top: -10px;
    }
  `}
  ${media.landscape.xs`
    font-size: 0.9em;
    width: 90%;
    span {
      font-size: 1.5em;
      top: -5px;
    }
  `}
`;

const FooterText = styled.p`
  text-align: center;
  position: relative;
  margin: 3vh auto 0;
`;

export default class Contact extends Component {
  state = {
    textVisible: false,
  };

  componentDidMount() {
    this.setState({
      textVisible: true,
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
        <TextStyled pose={this.state.textVisible ? "visible" : "hidden"}>
          <span>Hello!</span>
          <p>
            I'm Matt. I love making web apps, animations, data models, and
            music. Until 2017, I was travelling the world as a professional{" "}
            <a
              href="http://www.gigameshmusic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              music producer & DJ
            </a>
            . It was a great experience, but I eventually decided to pursue my
            love of technology and learn how to code. I started with the
            Javascript + React stack and quickly fell in love. In addition to
            code and music, I'm a big enthusiast for visual design, mechanism
            design, and effective altruism. ✌
          </p>
        </TextStyled>
        <HeadShot />
      </FullPageWrap>
    );
  }
}
