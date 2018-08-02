import React, { Component } from 'react'
import styled from 'styled-components'
import media from '../utils/mediaqueries';
import NavItems from './NavItems';
import posed from 'react-pose';
import { animations } from '../utils/animations';

const FullPageWrap = styled.div`
  /* z-index: 0; */
  overflow: hidden;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${media.portrait.lg`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  `}
  }
`

const HeadShot = styled.div`
  background: url("/img/photos/headshot.jpg");
  background-size: cover;
  background-position: center; 
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  ${media.portrait.lg`
    grid-row: 1/2;
    background: url("/img/photos/headshot-small.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  `}
`

const Text = posed.p(animations.main)

const TextStyled = styled(Text)`
  a {
    color: #5296ce;
    font-weight: 300;
    &:hover {
      color: #205887
    }
  }
  color: var(--main-color);
  margin: 0 auto;
  align-self: center;
  font-size: 1.8em;
  font-weight: 200;
  width: 80%;
  max-width: 600px;
  line-height: 130%;
  h2 {
    text-align: center;
    position: relative;
    top: -30px;
    font-size: 3em;
    /* font-weight: 100; */
  }
  ${media.portrait.lg`
    font-size: 1.6em;
    h2 {
      top: -20px;
      font-size: 2.5em;
    }
  `}
  ${media.portrait.md`
    font-size: 1.3em;
  `}
  ${media.portrait.sm`
    font-size: 1em;
    h2 {
      font-size: 1.8em;
      top: -10px;
    }
  `} 
  ${media.portrait.xs`
    font-size: 0.9em;
    width: 90%;
    h2 {
      font-size: 1.5em;
      top: -5px;
    }
  `}
  ${media.landscape.lg`
    font-size: 1.6em;
    h2 {
      top: -20px;
      font-size: 2.5em;
    }
  `}
  ${media.landscape.md`
    font-size: 1.3em;
  `}
  ${media.landscape.sm`
    font-size: 1em;
    h2 {
      font-size: 1.8em;
      top: -10px;
    }
  `}
  ${media.landscape.xs`
    font-size: 0.9em;
    width: 90%;
    h2 {
      font-size: 1.5em;
      top: -5px;
    }
  `}
`

export default class Contact extends Component {
  state = {
    textVisible: false
  }

  componentDidMount(){
    this.setState({
      textVisible: true
    })
  }

  render() {
    return (
      <FullPageWrap>
        <NavItems 
          color={'#5296ce'} 
          hovercolor={'#205887'}
          path={this.props.location.pathname}
          />
        <TextStyled pose={this.state.textVisible ? "visible" : "hidden"}>
          <h2>Hello!</h2>
            I'm Matt. I love making web apps, animations, data models, and music. Until recently, I've been travelling the world as a professional <a href="http://www.gigameshmusic.com" target="_blank">music producer & DJ</a>. It was incredible, but in late 2017 I decided to pursue my love of technology and learn how to code. I started with the Javascript + React stack and quickly fell in love. In addition to code and music, I'm a big enthusiast for visual design, blockchain technology, and social justice. ✌
        </TextStyled>

          <HeadShot/>

      </FullPageWrap>
    )
  }
}
