import React, { Component } from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import posed from "react-pose";
import { animations } from "../utils/animations";

const FullPageWrap = styled.div`
  overflow: hidden;
  /* background: var(--lightest-blue); */
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
  p {
    margin-bottom: 1rem;
  }
  color: var(--main-color);
  margin: 0 auto;
  align-self: center;
  font-size: 1.2em;
  font-weight: 200;
  width: 80%;
  max-width: 650px;
  text-align: justify;
  line-height: 1.4;
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
      // top: -20px;
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
    textVisible: false
  };

  componentDidMount() {
    this.setState({
      textVisible: true
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
            I'm Matt, a web developer, entrepreneur and musician based in Los
            Angeles. Some people know me as{" "}
            <a
              href="https://open.spotify.com/artist/1Bo8Afb2Qbjs4x6kJHyjle?si=kj3V1cQLS32h8Ibfr4zLZA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gigamesh
            </a>
            , my DJ/producer alter-ego I performed under for many years.
          </p>
          <p>
            In 2017, I decided to pursue my passion for technology and learn to
            code. I spent the next 3 years honing my skills as a front end
            developer for organizations like Google, Cisco, RadicalxChange, and
            Optimism (to name a few). My current primary focuses are{" "}
            <a
              href="https://finfren.com"
              target="_blank"
              rel="noopenner noreferrer"
            >
              FinFren
            </a>
            , a service I built for cryptocurrency traders, as well as the ways
            I might be able to help deliver the incredible potential of{" "}
            <a
              href="https://twitter.com/Gigamesh/status/1343401220455636993?s=20"
              target="_blank"
              rel="noopenner noreferrer"
            >
              Web3
            </a>
            . ✌
          </p>
        </TextStyled>
        <HeadShot />
      </FullPageWrap>
    );
  }
}
