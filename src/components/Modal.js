import React, { Component } from 'react'
import styled from 'styled-components'
import media from '../utils/mediaqueries';
import { animateScroll } from 'react-scroll';
import { PosedH2 } from './ui'
import posed from 'react-pose'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({dimensions}) => dimensions ? dimensions.height + 'px' : '100vh'};
  width: ${({dimensions}) => dimensions ? dimensions.width + 'px' : '100vw'};
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: opacity 300ms ease;
  opacity: ${props => props.visible === 'true' ? .92 : 0};
`

const FullPageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({dimensions}) => dimensions ? dimensions.height + 'px' : '100vh'};
  width: ${({dimensions}) => dimensions ? dimensions.width + 'px' : '100vw'};
  z-index: 3;
  color: var(--main-color);
  p { font-weight: 300;}
  a {
    font-weight: 300;
    color: var(--dark-blue);
    &:hover {
      color: var(--blue);
    }
  }
`
const OuterWrap = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  top: 45%;
  transform: translateY(-50%);
  ${media.portrait.lg`
    top: 80px;
    transform: translateY(0);  
  `}
  ${media.landscape.md`
    top: 20px;
    transform: translateY(0);  
  `}
  @media (max-width: 1100px){
    top: 5vh;
    transform: translateY(0);  
  }
`

let PoseDivWrap = posed.div({
  hidden: {
    opacity: 0,
    y: -1000,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50
    }
  }
});

PoseDivWrap = styled(PoseDivWrap)`
  width: 100%;
  height: 100%;
`

const InnerWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  ${media.portrait.xl`
    display: block;
  `}
`

const HeaderTwo = styled(PosedH2)`
  text-align: center;
  align-self: flex-start;
  font-size: 4em;
  line-height: 1em;
  padding-bottom: 40px;
  width: 80%;
  margin: 0 auto;
  ${media.portrait.xl`
    font-size: 3.8em;
  `}
  ${media.portrait.lg`
    font-size: 3em;
  `}
  ${media.portrait.sm`
    padding-bottom: 15px;
    font-size: 2.7em;
  `}
  ${media.portrait.xs`
    font-size: 2.3em;
  `}
  ${media.landscape.md`
    font-size: 3.5em;
    padding-bottom: 15px;
  `}
  ${media.landscape.sm`
    font-size: 2.9em;
  `}
  ${media.landscape.xs`
    font-size: 2.2em;
    padding-bottom: 10px;
  `}
`
const CloseIcon = styled.div`
  position: absolute;
  right: 0;
  line-height: 100%;
  cursor: pointer;
  transition: transform 200ms ease;
  i {
    font-size: 2.5em;
  }
  &:hover {
    transform: scale(1.2);
  }
  ${media.portrait.lg`
  top: -10px;
  right: -10px;
    i {
      font-size: 2.2em;
    }
  `}
  ${media.landscape.xs`
    i {
      font-size: 2.2em;
    }
  `}
`
const Img = styled.img`
  opacity: 1;
  display: inline-block;
  float: left;
  width: 45vw;
  max-width: 550px;
  margin: 0 auto 30px;
  height: auto;
  transition: box-shadow 100ms ease;
  box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.3);
  &:hover {
    box-shadow: 0px 0px 2px 4px rgba(88, 135, 211, 0.5);
  }
  ${media.portrait.xl`
    width: 70vw;
    max-width: none;
    float: none;
    display: block;
  `}
  ${media.portrait.lg`
    width: 80vw;
  `}
  ${media.landscape.sm`
    width: 60vh;
    float: none;
    display: block;
  `}
`
const Text = styled.p`
  position: relative;
  font-size: 1.7em;
  margin: 0;
  top: -8px;
  ${media.portrait.lg`
    font-size: 1.5em;
  `}
  ${media.portrait.md`
    font-size: 1.2em;
  `}
  ${media.landscape.md`
    font-size: 1.4em;
  `}
  ${media.landscape.sm`
    font-size: 1em;
  `}
`
const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  max-width: 550px;
  margin: 0 auto;
  padding: 0 30px;
  p#link {
    text-align: center
  }
  ${media.portrait.xl`
    max-width: none;
    width: 70vw;
  `}
  ${media.portrait.lg`
    width: 80vw;
  `}
  ${media.landscape.md`
    width: 85%;
    max-width: 550px;
  `}
`

export default class Modal extends Component {
  state = {
    visible: false
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        visible: true
      })
    },0)
    animateScroll.scrollToTop({duration: 500});
  }

  render() {
    const { title, text, url, img } = this.props.item;
    let { visible } = this.state;

    return (
      <React.Fragment>
        <Overlay 
          visible={this.state.visible.toString()}
          dimensions={this.props.dimensions}
          />
        <FullPageWrap 
          dimensions={this.props.dimensions}>
          <OuterWrap>
            <PoseDivWrap pose={visible ? 'visible' : 'hidden'}>
              <CloseIcon onClick={this.props.close}>
                <i className="material-icons">
                  close
                </i>
              </CloseIcon>
                  <HeaderTwo>
                    {title}
                  </HeaderTwo>
                <InnerWrap>
                  <a href={url} target="_blank" style={{margin: '0 auto'}}>
                    <Img src={img} alt={title} />
                  </a>
                  <TextWrap>
                    <Text>
                      {text}
                      <p id='link'>
                        <a href={url} target="_blank">Click to open in a new tab</a>
                      </p>
                    </Text>
                  </TextWrap>
                </InnerWrap>
              </PoseDivWrap>
            </OuterWrap>
          </FullPageWrap>
        </React.Fragment>
    )
  }
}
