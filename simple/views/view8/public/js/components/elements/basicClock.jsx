"use strict";
/**
 * Module dependencies
 */
import React from 'react';

let Types = React.PropTypes;

export default class Clock extends React.Component {
  static propTypes: {
    message: Types.string,
    date: Types.object,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    message: '',
    date: new Date(),
    item: {},
    key: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      date: this.props.date,
      item: this.props.item,
      key: this.props.key
    };
  }
  componentDidMount() {
    this.timerId = setInterval(
      ()=> this.tick(),
      1000
    );
  }  
  componentWillUnmount() {
    clearInterval(this.timerId);
  }  
  tick() {
    this.setState({
      date: new Date()
    });
  }  
  render() {
    const { message, ...rest } = this.props;
    return (
      <div {...rest}>
        <span>{message}</span>
        <span>{this.state.date.toLocaleTimeString()}</span>
      </div>
    );
  }
}