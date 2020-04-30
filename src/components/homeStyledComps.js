import posed from "react-pose";
import media from "../utils/mediaqueries";
import styled from "styled-components";

export const FullWrap = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  user-select: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const InnerWrap = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-color);
  span {
    color: var(--main-color);
  }
`;

export const Content = styled.div`
  right: ${props => (props.homenav === "true" ? "2vmax" : 0)};
  width: 70vmin;
  max-width: 520px;
  min-width: 210px;
  user-select: none;
  position: relative;
  h1 {
    font-weight: 200;
    font-size: 3.5em;
    }
  h2 {
    position: relative;
    float: right;
    font-weight: 300;
    font-size: 1.6em;
    }
  ${media.portrait.xl`
    margin: 0;
  `}
  ${media.portrait.md`
    margin: 0;
    width: 75vmin;  
    h1 {
      font-size: 2.8em;
    }
    h2 {
      font-size: 1.4em;
    }
  `}
  ${media.portrait.sm`
    width: 85vmin;
    h1 {
      font-size: 2.4em;
    }
    h2 {
      font-size: 1.2em;
    }
  `}
  ${media.portrait.xs`
    min-width: 280px
    width: 90vmin;
    h1 {
      font-size: 1.8em;
    }
    h2 {
      font-size: 1em;
    }
  `}
  ${media.landscape.xl`
    max-width: 460px;
    width: 58vmin;
    h1 {
      font-size: 3.1em;
    }
  `}
  ${media.landscape.lg`
    h1 {
      font-size: 2.7em;
    }
    h2 {
      font-size: 1.5em;
    }
  `}
  ${media.landscape.md`
    max-width: 440px;
    h1 {
      font-size: 2.2em;
    }
    h2 {
      font-size: 1.1em;
    }
  `}
  ${media.landscape.sm`
    max-width: 320px;
    h1 {
      font-size: 1.6em;
    }
    h2 {
      font-size: .8em;
    }
  `}
  ${media.landscape.xs`
    h1 {
      font-size: 1.3em;
    }
    h2 {
      font-size: .6em;
    }
  `}
  max-width: ${({ homenav }) => (homenav === "true" ? "520px" : "none")};
`;

export const RevealBoxWrapper = styled.div`
  height: 60px;
  overflow: hidden;
  padding-bottom: 3px;
  ${media.portrait.md`
    height: 48px;
  `}
  ${media.portrait.sm`
    height: 40px;
  `}
  ${media.portrait.xs`
    height: 30px;
  `}
  ${media.landscape.xl`
    height: 55px;
  `}
  ${media.landscape.lg`
    height: 47px;
  `}
  ${media.landscape.md`
    height: 38px;
  `}
  ${media.landscape.sm`
    height: 28px;
  `}
  ${media.landscape.xs`
    height: 24px;
  `}
`;

export const RevealBoxBottom = styled(RevealBoxWrapper)`
  top: -5px;
  position: relative;
  ${media.landscape.md`
    height: 35px;
  `} ${media.landscape.xs`
    height: 25px;
  `};
`;

export const NamePosed = posed.h1({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60 },
    delay: 800
  }
});

export const BottomTextPosed = posed.h2({
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 60 },
    delay: 1200,
    paddingTop: "15px"
  }
});

export const TunnelWrapper = styled.div`
  transition: opacity 1s linear;
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 0;
  padding-top: 100%;
`;

export const ColorSquare = styled.div`
  background: ${({ color }) => color};
  top: 1px;
  height: 18px;
  width: 18px;
  position: relative;
  display: inline-block;
  margin-right: 6px;
  ${media.landscape.lg`
    height: 15px;
    width: 15px;
  `}
  ${media.landscape.md`
    height: 10px;
    width: 10px;
    margin-right: 4px;
  `}
  ${media.portrait.sm`
    height: 15px;
    width: 15px;
  `}
  ${media.portrait.xs`
    top: 0;
    height: 12px;
    width: 12px;
    margin-right: 4px;
`}
`;
