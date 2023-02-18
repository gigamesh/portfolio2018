import React, { Component } from "react";
import posed from "react-pose";
import styled from "styled-components";

import { animations } from "../utils/animations";
import media from "../utils/mediaqueries";
import NavItems from "./NavItems";

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
  ${media.both.xl`
    grid-template-columns: 1fr;
    grid-template-rows: 0.5 1fr;
  `}
  }
`;

const HeadShot = styled.div`
  background: url("/img/photos/spock-cropped.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 50%;
  align-self: center;
  justify-self: center;
  width: 600px;
  height: 600px;

  ${media.both.xl`
    grid-row: 1/2;
    top: 50px;
    width: 400px;
    height: 400px;
    `}

  ${media.both.md`
      grid-row: 1/2;
      height: 50vh;
      width: 300px;
      height: 300px;
    `}
`;

const Text = posed.div(animations.main);

const TextStyled = styled(Text)`
  a {
    color: #5296ce;
    font-weight: 300;
    &:hover {
      text-decoration: underline;
      color: #205887;
    }
  }
  p {
    margin-bottom: 1rem;
  }
  color: var(--main-color);
  margin: 0 auto;
  align-self: center;
  font-size: 1rem;
  font-weight: 200;
  width: 80%;
  max-width: 650px;
  line-height: 1.4;
  padding-top: 50px;
  padding-bottom: 50px;
  h1 {
    display: block;
    position: relative;
    margin-bottom: 2rem;
    font-size: 2.4rem;
    font-weight: 100;
  }

  ${media.both.md`
    padding-top: 100px;
    width: 95%;
     h1 {
      font-size: 2rem;
      text-align: center;
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
          <h1>
            Hi{" "}
            <span role="img" aria-label="hand waving">
              👋
            </span>
          </h1>
          <p>
            I'm Matt Masurka, a software engineer, entrepreneur and musician
            based in Los Angeles. Some know me by my DJ/producer alter ego,{" "}
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
            I've produced{" "}
            <a
              href="https://www.youtube.com/watch?v=mqWq_48LxWQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              pop hits
            </a>
            , remixes for{" "}
            <a
              href="https://open.spotify.com/track/4AG78vnoHrJt4AGSzEremn"
              target="_blank"
              rel="noopener noreferrer"
            >
              multiple
            </a>{" "}
            <a
              href="https://open.spotify.com/track/38V0Rw7WwDJcLa5HP02MNR"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grammy
            </a>{" "}
            <a
              href="https://www.youtube.com/watch?v=eAt4xQbjofM"
              target="_blank"
              rel="noopener noreferrer"
            >
              winners
            </a>
            , and toured internationally. More recently, I cofounded{" "}
            <a
              href="https://sound.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              sound.xyz
            </a>
            , a protocol & platform helping musicians build stronger communities
            with their{" "}
            <a
              href="https://li-jin.co/2020/02/19/100-true-fans/"
              target="_blank"
              rel="noopener noreferrer"
            >
              100 true fans
            </a>
            . My primary contribution to the project was writing smart contracts
            for the{" "}
            <a
              href="https://github.com/soundxyz/sound-protocol"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sound Protocol
            </a>
            .
          </p>
          <p>
            In 2023, I'm shifting to an advisory role at Sound and refocusing my
            energy toward making music again. I'll also be exploring mechanisms
            that can help mitigate the{" "}
            <a
              href="https://youtu.be/WVEP0zAK-xQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Metacrisis
            </a>
            .
          </p>
        </TextStyled>
        <HeadShot />
      </FullPageWrap>
    );
  }
}
