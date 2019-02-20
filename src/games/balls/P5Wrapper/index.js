import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class P5Wrapper extends Component {
  componentDidMount() {
    this.canvas = new window.p5(this.props.sketch, this.wrapper)
    this.canvas.wrapper = this.wrapper
    this.canvas.props = this.props.p5Props
    this.canvas.onSetAppState = this.props.onSetAppState
  }

  shouldComponentUpdate(nextProps) {
    this.canvas.props = nextProps.p5Props
    return false
  }

  componentWillUnmount() {
    this.canvas.remove()
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper} style={{width: '100%', height: '100%'}} />
  }
};

P5Wrapper.propTypes = {
  sketch: PropTypes.func.isRequired,
  p5Props: PropTypes.object.isRequired,
  onSetAppState: PropTypes.func.isRequired,
};
