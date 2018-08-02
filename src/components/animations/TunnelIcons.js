import React from "react"
import posed, { PoseGroup } from "react-pose"
import styled from 'styled-components'
import { icons } from '../../utils/iconURLs'

const posOrNegRandom = num => {
  return num * (Math.random() < 0.5 ? -1 : 1);
}
const posOrNegAlternate = (num, count) =>{
  return num * (count % 2 === 0 ? 1 : -1);
}

const TunnelIcons = ({visible, items, count, tunnelWidth}) => {
  let duration = Math.floor(Math.random() * (12000 - 8000 + 1) + 8000);

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
      y: posOrNegAlternate(Math.floor(Math.random() * (2000 - 0 + 1)), items[0]),
      x: posOrNegRandom(Math.floor(Math.random() * (1500 - 800 + 1)) + 800),
      scale: 5,
      rotate: posOrNegRandom(Math.floor(Math.random() * (90 - 10 + 1)) + 10),
      transition: {
        default: { ease: [.97,.04,.96,.06], duration: duration},
        rotate: { ease: [0,0,1,1], duration: duration},  
      }
    }
  }
  let IconAnim = posed.img(config);

  IconAnim = styled(IconAnim)`
    z-index: 5;
    position: absolute;
    top: ${({w}) => (
      w >= 520 ? '10%'
      : (w < 520 && w >= 464) ? '8%'
      : (w < 464 && w >= 408) ? '6%'
      : (w < 408 && w >= 352) ? '4%'
      : '2%' 
    )};
    left: ${({w}) => (
      w >= 520 ? '22%'
      : (w < 520 && w >= 464) ? '19%'
      : (w < 464 && w >= 408) ? '16%'
      : (w < 408 && w >= 352) ? '13%'
      : '11%' 
    )};
  `

  return (
    <PoseGroup preEnterPose='start'>
      {document.visibilityState === 'visible' && items.map(item => (
          <IconAnim
            key={item}
            src={icons[item % icons.length]} 
            alt='Animated Icon'
            w={tunnelWidth}
          />
        ))
      }
    </PoseGroup>
  )
}

export default TunnelIcons