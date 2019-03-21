import styled from 'styled-components'
import posed from 'react-pose'
import { animations } from '../utils/animations';
import media from '../utils/mediaqueries';

export const PosedH2 = posed.h2(animations.header);

export const Header = styled(PosedH2)`
  display: block;
  width: 100%;
  position: relative;
  right: 0;
  top: 44px;
  z-index: 1;
  text-align: right;
  align-self: flex-start;
  margin: 0 auto;
  font-size: 6em;
  line-height: 1.2em;
  font-weight: 700;
  padding-bottom: 20px;
  padding-top: 10px;
  color: ${({color}) => color || '#fff'};
  -webkit-text-stroke: var(--main-color) 1px;
  ${media.portrait.md`
    font-size: 5.2em;
    top: 40px;
  `}
  ${media.portrait.sm`
    font-size: 3.6em;
    top: 35px;
  `}
  ${media.portrait.xs`
    font-size: 3.4em;
    top: 33px;
  `}
  ${media.landscape.xs`
    top: 38px;
    font-size: 4.2em;
  `}
`

export const HeaderIcon = styled.div`
  width: 75px;
  height: 75px;
  background: url('${({bgURL}) => bgURL}');
  background-size: cover;
  display: inline-block;
  margin-left: 15px;
  position: relative;
  top: ${({customID}) => customID === 'contact' ? '15px' 
    : customID === 'resume' ? '13px' : 0};
  ${media.portrait.md`
    margin-left: 10px;
    width: 60px;
    height: 60px;
    top: ${({customID}) => customID === 'contact' ? '12px' 
    : customID === 'resume' ? '11px' : 0 };
  `}
  ${media.portrait.sm`
    margin-left: 6px;
    width: 50px;
    height: 50px;
    top: ${({customID}) => customID === 'contact' ? '10px' 
    : customID === 'resume' ? '9px' : 0}; 
  `} 
  ${media.portrait.xs`
    display: none;
    margin: 0;  
  `} 
  ${media.landscape.xs`
    width: 50px;
    height: 50px;
    top: ${({customID}) => customID === 'contact' ? '10px' 
    : customID === 'resume' ? '9px' : 0}; 
  `} 
`
