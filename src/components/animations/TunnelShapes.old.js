import React from "react"
import posed, { PoseGroup } from "react-pose"
import styled from 'styled-components'
import { darken } from 'polished'

const colors = [
  '#7aa7ee',
  '#f08989',
  '#f7eb80',
  '#a9f196'
];

const posOrNegRandom = num => {
  return num * (Math.random() < 0.5 ? -1 : 1);
}
const posOrNegAlternate = (num, count) =>{
  return num * (count % 2 === 0 ? 1 : -1);
}

const TunnelShapes = (
  {visible, items, count, tunnelWidth, timer, ballCount}
  ) => {
  let duration = Math.floor(Math.random() * (9000 - 4000 + 1) + 4000);

  let config = {
    start: {
      y: 0,
      x: 0,
      scale: 0,
      rotate: 0
    },
    enter: {
      y: 0,
      x: 0,
      scale: 0,
      rotate: 0
    },
    exit: {
      y: posOrNegAlternate(Math.floor(Math.random() * (2000 - 500 + 1)) + 500, items[0]),
      x: posOrNegRandom(Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500),
      scale: Math.floor(Math.random() * (35 - 8 + 1)) + 8,
      rotate: posOrNegRandom(Math.floor(Math.random() * (90 - 10 + 1)) + 10),
      transition: {
        default: { ease: [1,.01,1,0], duration: duration},
        rotate: { ease: [0,0,1,1], duration: duration},  
      }
    }
  }
  let ColorDiv = posed.div(config);

  ColorDiv = styled(ColorDiv)`
    position: absolute;
    width: ${({size}) => size || '100px'};
    height: ${({size}) => size || '100px'};
    background: radial-gradient(circle at 30% 15%, 
      ${({color}) => color + ',' + darken(.15, color)});
    border-radius: 50%;
    z-index: 5;
    top: ${({w}) => (
      w >= 520 ? '17%'
      : (w < 520 && w >= 464) ? '16.2%'
      : (w < 464 && w >= 408) ? '15.7%'
      : (w < 408 && w >= 330) ? '14%'
      : '11%' 
    )};
    left: ${({w}) => (
      w >= 520 ? '28%'
      : (w < 520 && w >= 464) ? '27%'
      : (w < 464 && w >= 408) ? '26.7%'
      : (w < 408 && w >= 330) ? '24.4%'
      : '23%' 
    )};
  `
  // console.log(ballCount);
  return (
    <PoseGroup preEnterPose='start'>
      {document.visibilityState === 'visible' && items.map(item => {
        return (
          <ColorDiv
            size='60px' color={colors[ballCount % colors.length]}
            key={item}
            w={tunnelWidth}
          />
          )
        })
      }
    </PoseGroup>
  )
}

export default TunnelShapes