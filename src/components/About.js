import React, { Component } from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";
import posed from "react-pose";
import { animations } from "../utils/animations";

const FullPageWrap = styled.div`
  /* background: var(--lightest-blue); */
  min-height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${media.portrait.xl`
    grid-template-columns: 1fr;
    grid-template-rows: 0.5 1fr;
  `}
  }
`;

const HeadShot = styled.div`
  background: url("/img/photos/new-headshot.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  -height: 100%;
  ${media.portrait.xl`
    grid-row: 1/2;
    max-width: 40vh;
    margin: 60px auto 0;
    height: 40vh;
    background: url("/img/photos/new-headshot-small.png");
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
  padding-top: 30px;
  padding-bottom: 50px;
  h1 {
    display: block;
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
    font-size: 2.8em;
    font-weight: 100;
  }
  ${media.portrait.lg`
    font-size: 1em;
    h1 {
      font-size: 2.3em;
    }
  `}
  ${media.portrait.md`
      width: 90%;
    h1 {
      font-size: 2em;
    }
  `}
  ${media.portrait.sm`
    font-size: 1em;
    h1 {
      font-size: 1.8em;
    }
  `} 
  ${media.portrait.xs`
    font-size: 0.9em;
    width: 95%;
    h1 {
      font-size: 1.5em;
    }
  `}
  @media (max-width: 400px) and (min-height: 700px) {
    width: 80%;
    font-size: 1em;
    h1 {
      font-size: 1.7em;
    }
  }
  ${media.landscape.xl`
    font-size: 1.7em;
    h1 {
      font-size: 2.5em;
    }
  `}
  ${media.landscape.lg`
    font-size: 1.2em;
    h1 {
      font-size: 2.5em;
    }
  `}
  ${media.landscape.sm`
    font-size: 1em;
    h1 {
      font-size: 1.8em;
    }
  `}
  ${media.landscape.xs`
    font-size: 0.9em;
    width: 90%;
    h1 {
      font-size: 1.5em;
    }
  `}
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
          <h1>Hello!</h1>
          <p>
            I'm Matt, a web developer, entrepreneur and musician based in Los
            Angeles. Some people know me by my DJ/producer alter ego,{" "}
            <a
              href="https://open.spotify.com/artist/1Bo8Afb2Qbjs4x6kJHyjle?si=kj3V1cQLS32h8Ibfr4zLZA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gigamesh
            </a>
            .
          </p>
          <p>
            In 2017, I decided to pursue my passion for technology and learn to
            code. I spent the next 3 years honing my skills as a front end
            developer on projects for organizations like Left Field Labs,
            Google, Cisco, and RadicalxChange. Lately, I'm focused on{" "}
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
