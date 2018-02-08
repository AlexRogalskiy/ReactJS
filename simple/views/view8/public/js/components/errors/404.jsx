"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import update     from 'react-addons-update';
import ClassNames from 'classnames';
// import Utils      from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class NotFound extends React.Component {
  static propTypes: {
  	message: Types.string,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    message: '404 [ Resource not found ]',
    item: {},
    key: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      item: this.props.item,
      key: this.props.key
    };
  }
  render() {
    const { message, ...rest } = this.props;
    return (
    	<h2 {...rest}>{message}</h2>
    );
  }
}