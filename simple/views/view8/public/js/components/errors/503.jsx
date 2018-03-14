"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';

// import Logger      from 'appRoot/js/mixins/logger';
import BasicContent from 'appRoot/js/components/elements/basicContent';
import BasicHeader from 'appRoot/js/components/elements/basicHeader';

let Types = React.PropTypes;

export default class InternalServerError extends React.Component {
  displayName: 'InternalServerError'
  static propTypes: {
    dataClass: Types.object,
  	message: Types.string,
    item: Types.object
  }
  static defaultProps = {
    dataClass: { headerClass: 'header' },
    message: '503 [ Internal server error ]',
    item: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      dataClass: props.dataClass,
      message: props.message,
      item: props.item
    };
  }
  render() {
    const { dataClass, item, message, ...rest } = this.props;
    const { headerClass, ...restClass } = dataClass;
    return (
      <BasicContent {...rest}><BasicHeader className={headerClass}>{message}</BasicHeader></BasicContent>
    );
  }
}