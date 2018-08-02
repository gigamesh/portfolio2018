import React, { Component } from 'react'
import TunnelVision from './animations/TunnelVision';
import TunnelIcons from './animations/TunnelIcons';
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


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      iconInterval: 3,
      visible: false,
      iconTimer: 0,
      items: [0, 1],
      tunnelWidth: 0
    }
  }

  tick(){
    let {items, iconTimer, iconInterval} = this.state;
    this.setState(prevState => ({ iconTimer: prevState.iconTimer + 1 }));
      if(iconTimer % iconInterval === 0){
        items.push(items[items.length -1] + 1);
      if(items.length > 2){ items.shift() }
    this.setState({ iconInterval: Math.floor(Math.random() * (3 - 1 + 1)) + 1})
    }
  }

  componentWillMount(){
    if(this.props.loaded === 'true'){
      this.setState({visible: true})
    };
  }

  componentDidMount() {
    setTimeout(()=> this.setState({visible: true}), 0);
    this.interval = setInterval(() => this.tick(), 1000);
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
      iconsRunning,
      tunnelWidth
      } = this.state;
    const { 
      homeNavShowing, 
      open, 
      clickHandler,
      } = this.props;

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
              <TunnelAnimation visible={this.state.visible} >
                <TunnelIcons 
                  items={this.state.items} 
                  tunnelWidth={tunnelWidth}
                  />
                <TunnelVision percentage={0.5} 
                  loaded={this.props.loaded}
                  introAnimationDone={this.props.introAnimationDone}/>
              </TunnelAnimation>
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
