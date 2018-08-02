import React, { Component } from 'react'
import styled from 'styled-components'
import media from '../utils/mediaqueries';
import NavItems from './NavItems';
import { animations } from '../utils/animations';
import posed from 'react-pose';
import { Header, HeaderIcon } from './ui'

const FullPageWrap = styled.div`
  background: var(--lighter-blue);
  color: #303d63;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
`

const Container = styled.div`
  top: -40px;
  position: relative;
  height: 80%;
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  ${media.portrait.md`
    width: 97%;
  `}
`

const Resume = styled.div`
  background: #fff;
  padding: 40px;
  padding-bottom: 0;
  margin: 0 auto;
  height: 100%;
  border: 2px solid var(--main-color);
  z-index: 5;
  object {
    border: 1px solid var(--main-color);
  }
  ${media.portrait.xl`
    padding: 40px;
  `}
  ${media.portrait.md`
    padding: 20px;
  `}
`
const FallbackText = styled.div`
  color: var(--light-blue);
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
`

export default class Contact extends Component {
  state = {
    visisible: false
  }

  componentDidMount(){
    this.setState({
      visisible: true
    })
  }

  render() {
    return (
      <FullPageWrap>
        {this.props.children}
        {!this.props.menuBtnShowing && 
        <NavItems 
          color={'#5296ce'} 
          hovercolor={'#205887'}
          path={this.props.location.pathname}
          />}
        <Container>
          <Header 
            pose={this.state.visisible ? 'visible' : 'hidden'}
            color={'var(--resume-color)'}>
            resume
            <HeaderIcon alt="Portfolio Paint Brush Icon" bgURL={'/img/icons/retro/directory_blue_clean.png'}
            customID='resume'
            />
          </Header>
          <Resume pose={this.state.visisible ? 'visible' : 'hidden'}>
            <object data="/resume.pdf" type="application/pdf" width="100%" height="100%">
              <FallbackText>
                <p>
                  If resume doesn't load, click here: 
                  <a href='/resume.pdf' target="_blank"> [ PDF ]</a>
                </p>
              </FallbackText>
            </object>
          </Resume>
        </Container>
      </FullPageWrap>
    )
  }
}
