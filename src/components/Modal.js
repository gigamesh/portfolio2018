import React, { Component } from "react";
import styled from "styled-components";
import media from "../utils/mediaqueries";
import { animateScroll } from "react-scroll";
import posed from "react-pose";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ dimensions }) =>
    dimensions ? dimensions.height + "px" : "100vh"};
  width: ${({ dimensions }) =>
    dimensions ? dimensions.width + "px" : "100vw"};
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: opacity 600ms ease;
  opacity: ${props => (props.visible === "true" ? 0.92 : 0)};
`;

const FullPageWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ dimensions }) =>
    dimensions ? dimensions.height + "px" : "100vh"};
  width: ${({ dimensions }) =>
    dimensions ? dimensions.width + "px" : "100vw"};
  z-index: 3;
  color: var(--main-color);
  p {
    font-weight: 300;
  }
  a {
    font-weight: 300;
    color: var(--dark-blue);
    &:hover {
      color: var(--blue);
    }
  }
`;
const OuterWrap = styled.div`
  position: relative;
  padding: 0 5vw;
  max-width: 1000px;
  margin: 0 auto;
  top: 80px;
  /* ${media.portrait.xl`
    width: 55%;
  `}
  ${media.portrait.lg`
    width: 65%;
  `}
  ${media.portrait.md`
    width: 70%;
  `} */
  ${media.landscape.md`
    top: 20px;  
  `}
  @media (max-width: 1100px){
    top: 5vh;  
  }
`;

let PoseDivWrap = posed.div({
  hidden: {
    opacity: 0,
    y: -200
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
});

PoseDivWrap = styled(PoseDivWrap)`
  width: 100%;
  height: 100%;
`;

const InnerWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5%;
  ${media.portrait.xl`
    display: block;
  `}
`;

const HeaderTwo = styled.h2`
  text-align: center;
  align-self: flex-start;
  font-size: 4em;
  line-height: 1em;
  margin: 0 auto 5%;
  ${media.portrait.xl`
    font-size: 3.5em;
  `}
  ${media.portrait.lg`
    font-size: 3em;
  `}
  ${media.portrait.sm`
    padding-bottom: 15px;
    font-size: 2.6em;
  `}
  ${media.portrait.xs`
    font-size: 2.1em;
  `}
  ${media.landscape.lg`
    font-size: 4em;
    padding-bottom: 15px;
  `}
  ${media.landscape.md`
    font-size: 3em;
    padding-bottom: 15px;
  `}
  ${media.landscape.sm`
    font-size: 2.6em;
  `}
  ${media.landscape.xs`
    font-size: 2.2em;
    padding-bottom: 10px;
  `}
`;
const CloseIcon = styled.div`
  position: relative;
  top: 1em;
  float: right;
  line-height: 100%;
  cursor: pointer;
  transition: transform 200ms ease;
  i {
    font-size: 2.2em;
  }
  &:hover {
    transform: scale(1.2);
  }
  ${media.portrait.lg`
  top: -10px;
  right: -10px;
  `}
`;
const Img = styled.img`
  width: 40vw;
  max-width: 400px;
  float: left;
  margin-right: 5%;
  margin-bottom: 10px;
  height: auto;
  transition: box-shadow 100ms ease;
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0px 0px 2px 4px rgba(88, 135, 211, 0.5);
  }
`;
const Text = styled.p`
  position: relative;
`;
const TextWrap = styled.div`
  font-size: 1.2em;
  ${media.portrait.md`
    font-size: 1.2em
  `}
  ${media.portrait.sm`
    font-size: 1em
  `}
  button {
    display: block;
  }
`;
const Button = styled.button`
  background: var(--light-blue);
  font-size: 1em;
  width: 150px;
  padding: 0.5em;
  border-radius: 7px;
  color: white;
  border: none;
  margin-right: 1em;
  &:focus {
    outline-style: none;
  }
  cursor: pointer;
  &:hover {
    background: var(--blue);
  }
`;
const Link = styled.a`
  /* display: block; */
  /* margin: 5px auto; */
  text-align: center;
`;

const ButtonWrap = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export default class Modal extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 0);
    animateScroll.scrollToTop({ duration: 1000 });
  }

  render() {
    const { title, text, url, img, src } = this.props.item;
    let { visible } = this.state;

    return (
      <React.Fragment>
        <Overlay
          visible={this.state.visible.toString()}
          dimensions={this.props.dimensions}
        />
        <FullPageWrap dimensions={this.props.dimensions}>
          <OuterWrap>
            <PoseDivWrap pose={visible ? "visible" : "hidden"}>
              <CloseIcon onClick={this.props.close}>
                <i className="material-icons">close</i>
              </CloseIcon>
              <HeaderTwo>{title}</HeaderTwo>
              <InnerWrap>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 auto" }}
                >
                  <Img src={img} alt={title} />
                </a>
                <TextWrap>
                  <Text>{text}</Text>
                  <ButtonWrap id="link">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <Button>View app</Button>
                    </a>
                    {src && (
                      <Link href={src} target="_blank">
                        [ View source code ]
                      </Link>
                    )}
                  </ButtonWrap>
                </TextWrap>
              </InnerWrap>
            </PoseDivWrap>
          </OuterWrap>
        </FullPageWrap>
      </React.Fragment>
    );
  }
}
