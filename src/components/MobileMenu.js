import React from 'react';
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose';
import BigNavMobile from './BigNavMobile';
import MobileMenuBtn from './MobileMenuBtn';
import { Link } from 'react-router-dom';
import media from '../utils/mediaqueries'
import { animations } from '../utils/animations';

let MobileOverlay = posed.div({
  enter: { 
    opacity: 1,
    transition: {ease: [0,0,1,1], duration: 200}
    },
  exit: { 
    opacity: 0,
    transition: ({duration}) => ({
    ease: [0,0,1,1], 
    delay: 100, 
    duration: duration
    })
  }
})

MobileOverlay = styled(MobileOverlay)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background: #f7f7f7;
  opacity: 0;
  transition: opacity 300ms ease;
`

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const NameAndHomeWrap = posed.div({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
})

let NameAndHomeIcon = posed.div(animations.homeNav);

NameAndHomeIcon = styled(NameAndHomeIcon)`
  position: absolute;
  right: 1.5vmax;
  top: 1.5vmax;
  font-size: 2.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 200;
  i {
    -webkit-text-stroke: var(--main-color) 1px;
    color: transparent;
    display: block;
    font-size: 1.5em;
    &:hover {
      color: var(--lightest-blue);
    }
    ${media.portrait.xs`
    font-size: 1em;
    `}
    ${media.landscape.xs`
    font-size: 1em;
    `}
  }
  span {
    display: block;
    position: relative;
    top: 5px;
    white-space: pre;
  }
  ${media.portrait.sm`
    span {
      display: none;
    }
  `}
  ${media.landscape.md`
    span {
      display: none;
    }
  `}
`

class MobileMenu extends React.Component {

  render(){
    let { 
      mobileMenuOpen, 
      clickHandler, 
      bigNavMobileOpen,
      btncolor,
      dimensions,
      source,
      pathname
    } = this.props;

    let duration = 300;
    if((source && pathname) && source !== pathname){
      duration = 0;
    } 

    return (
      <React.Fragment>
        <MobileMenuBtn 
          open={mobileMenuOpen} 
          clickHandler={clickHandler}
          btncolor={btncolor}
          dimensions={dimensions}/>
          <PoseGroup>
            { mobileMenuOpen && 
            <MobileOverlay key={source} duration={duration}>
              <CenterDiv>
                <NameAndHomeWrap pose={bigNavMobileOpen ? "visible" : "hidden"}>
                  <NameAndHomeIcon>
                    <span>Matthew Masurka </span>
                      <Link to='/' onClick={(e) => clickHandler(e, pathname)}>
                      <i className="material-icons">
                        home
                      </i>
                    </Link>
                  </NameAndHomeIcon>
                </NameAndHomeWrap>
                <PoseGroup>
                  {mobileMenuOpen && 
                  <BigNavMobile
                    clickHandler={clickHandler}
                    visible={bigNavMobileOpen}
                    key={'BigNavMobile'}
                    pathname={pathname}
                    />}
                </PoseGroup>
              </CenterDiv>
            </MobileOverlay>}
          </PoseGroup>
      </React.Fragment>
    )
  }
}

export default MobileMenu