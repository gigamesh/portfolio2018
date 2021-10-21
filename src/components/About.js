import React, { Component } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

import { animations } from '../utils/animations';
import media from '../utils/mediaqueries';
import NavItems from './NavItems';

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
  height: 100%;
  align-self: flex-end;
  ${media.portrait.xl`
    grid-row: 1/2;
    height: 50vh;
    max-width: 340px;
    margin: 0 auto;
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
      color: #205887;
    }
  }
  p {
    margin-bottom: 1rem;
  }
  color: var(--main-color);
  margin: 0 auto;
  align-self: center;
  font-size: 1.5rem;
  font-weight: 200;
  width: 80%;
  max-width: 650px;
  text-align: justify;
  line-height: 1.4;
  padding-top: 50px;
  padding-bottom: 50px;
  h1 {
    display: block;
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
    font-size: 2.4rem;
    font-weight: 100;
  }
  ${media.portrait.xl`
    align-self: flex-start;
  `}
  ${media.portrait.lg`
    font-size: 1.5rem;
    h1 {
      font-size: 2.3rem;
    }
    `}
  ${media.portrait.md`
      width: 90%;
      h1 {
        font-size: 2rem;
      }
      `}
  ${media.portrait.sm`
    font-size: 1rem;
    h1 {
      font-size: 1.8rem;
    }
    `} 
  ${media.portrait.xs`
    font-size: 0.9rem;
    width: 95%;
    h1 {
      font-size: 1.5rem;
    }
  `}
  @media (max-width: 400px) and (min-height: 700px) {
    width: 80%;
    font-size: 1erm;
    h1 {
      font-size: 1.7rem;
    }
  }
  ${media.landscape.xl`
    font-size: 1.3rem;
    h1 {
      font-size: 2.5rem;
    }
  `}
  ${media.landscape.lg`
    font-size: 1.2rem;
    h1 {
      font-size: 2.5rem;
    }
  `}
  ${media.landscape.sm`
    font-size: 1.5rem;
    h1 {
      font-size: 1.8rem;
    }
  `}
  ${media.landscape.xs`
    font-size: 0.9rem;
    width: 90%;
    h1 {
      font-size: 1.5rem;
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
            After falling down the crypto rabbit hole in 2017, I decided to
            learn to code. I spent the next 3 years honing my skills as a front
            end developer on projects for organizations like Left Field Labs,
            Google, Cisco, and RadicalxChange. I dove fully into web3 in 2021
            when I joined{" "}
            <a
              href="https://optimism.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Optimism
            </a>{" "}
            and built their Gateway from mainnet Ethereum.
          </p>
          <p>
            Currently, I'm a cofounder of{" "}
            <a href="https://sound.xyz">sound.xyz</a>, a platform for musicians
            to build a community for their{" "}
            <a
              href="https://kk.org/thetechnium/1000-true-fans/"
              target="_blank"
              rel="noopener noreferrer"
            >
              1,000 true fans
            </a>
            .
          </p>
        </TextStyled>
        <HeadShot />
      </FullPageWrap>
    );
  }
}
