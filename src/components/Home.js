import React, { Component } from 'react'
import throttle from 'react-throttle-render'
import TunnelVision from './animations/TunnelVision';
import TunnelShapes from './animations/TunnelShapes';
import './LandingPage.css';
import BigNavHome from './BigNavHome'
import {
  FullWrap,
  InnerWrap,
  Content,
  RevealBoxBottom,
  RevealBoxWrapper,
  NamePosed,
  BottomTextPosed,
  TunnelAnimation,
  } from './homeStyledComps';

const TunnelShapesThrottled = throttle(30)(TunnelShapes);
const TunnelThrottled = throttle(30)(TunnelAnimation);

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      iconInterval: 4,
      visible: false,
      iconTimer: 0,
      items: [0, 1],
      tunnelWidth: 0,
      ballCount: 0
    }
  }

  tick(){
    let { items, iconTimer, iconInterval } = this.state;
    this.setState(prevState => ({ iconTimer: prevState.iconTimer + 1 }));
      if(iconTimer % iconInterval === 0){
        items.push(items[items.length -1] + 1);
        this.setState(prevState => ({ballCount: prevState.ballCount + 1}));
      if(items.length > 2){ items.shift() }
    this.setState({ iconInterval: Math.floor(Math.random() * (4 - 1 + 1)) + 1})
    }
  }

  componentWillMount(){
    if(this.props.loaded === 'true'){
      this.setState({visible: true})
    };
  }

  componentDidMount() {
    setTimeout(()=> this.setState({visible: true}), 0);
    this.interval = setInterval(() => this.tick(), 500);
    this.updateTunnelWidth();
  }

  updateTunnelWidth = () => {
    this.setState({tunnelWidth: this.contentDiv.clientWidth})
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.tunnelWidth !== this.contentDiv.clientWidth){
      this.updateTunnelWidth();
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    const { 
      visible, 
      tunnelWidth,
      iconTimer,
      ballCount
      } = this.state;
    const { 
      homeNavShowing
      } = this.props;

    // console.log(this.state.items);
    return (
      <FullWrap>
        {this.props.children}
        <InnerWrap>
          <Content 
            homenav={homeNavShowing.toString()}
            innerRef={contentDiv => this.contentDiv = contentDiv}
            >
            <RevealBoxWrapper>
              <div id='reveal-up'>
                <NamePosed
                  pose={this.state.visible ? 'visible' : 'hidden'}>
                  Matt Masurka
                </NamePosed> 
              </div>
            </RevealBoxWrapper>
              <TunnelThrottled visible={this.state.visible} >
                <TunnelShapesThrottled 
                  items={this.state.items} 
                  tunnelWidth={tunnelWidth}
                  timer={iconTimer}
                  ballCount={ballCount}
                  />
                <TunnelVision percentage={0.5} 
                  loaded={this.props.loaded}
                  introAnimationDone={this.props.introAnimationDone}/>
              </TunnelThrottled>
            <RevealBoxBottom>
              <div id='reveal-down'>
                <BottomTextPosed
                pose={this.state.visible ? 'visible' : 'hidden'}>
                    web development & design
                </BottomTextPosed>
              </div>
            </RevealBoxBottom>
          </Content>
        {homeNavShowing &&
        <BigNavHome visible={visible}>
          {this.props.children}
        </BigNavHome>}
        </InnerWrap>
      </FullWrap>
    )
  }
}
