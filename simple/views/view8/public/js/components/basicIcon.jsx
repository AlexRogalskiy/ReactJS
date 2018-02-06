"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicIcon extends React.Component {
	mixins: [Logger]
	propTypes: {
		message: Types.string,
        item: Types.object,
        key: Types.string
    }
    constructor(props) {
        super(props);
    }
    getDefaultProps() {
        return {
        	message: '',
            item: {},
            key: ''
        };
    }
    getInitialState() {
		return {
			message: this.props.message,
			item: this.props.item,
			key: this.props.key
		};
	}
	render() {
		const {message, ...rest} = this.props;
		return (
			<span {...rest}>{message}</span>
		);
	}
};