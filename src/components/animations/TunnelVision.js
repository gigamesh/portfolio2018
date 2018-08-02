import React from 'react'
import Lottie from 'react-lottie';
import * as tunnelVision from './tunnelvision.json'
import * as tunnelVisionIntro from './tunnelvisionintro.json'
import PropTypes from 'prop-types';

export default class TunnelVision extends React.Component {
  state = {
    introDone: false
    }
  static propTypes = {
    ...Lottie.propTypes,
    percentage: PropTypes.number,
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        introDone: true
      })
      this.props.introAnimationDone();
    }, 900)
  }

  render() {
    // console.log('introDone?', this.state.introDone);
    // console.log('loaded?', this.props.loaded);

    const partOne = (
      <Lottie options={{
          loop: false,
          animationData: tunnelVisionIntro,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={'100%'}
          width={'100%'}
          isStopped={false}
          isPaused={false}/>      
    )
    const partTwo = (
      <Lottie options={{
          loop: true,
          animationData: tunnelVision,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          isClickToPauseDisabled={true}
          height={'100%'}
          width={'100%'}
          isStopped={false}
          isPaused={false}
          onClick={()=> console.log('clicked!')}/>        
    )

    return this.state.introDone || this.props.loaded === 'true' ? partTwo : partOne;
  }
}