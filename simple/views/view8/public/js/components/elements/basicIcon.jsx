"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Utils from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicIcon extends React.Component {
	static propTypes: {
		message: Types.string,
		className: Types.string.isRequired,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        message: '',
        className: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
			className: this.props.className,
			item: this.props.item,
			key: this.props.key
        };
    }
	render() {
		const { message, className, ...rest } = this.props;
		return (
			<span className={className} {...rest}>{message}</span>
		);
	}
};