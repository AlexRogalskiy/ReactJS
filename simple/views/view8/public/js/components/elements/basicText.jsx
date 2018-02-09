"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicText extends React.Component {
    displayName: 'BasicText'
	static propTypes: {
        message: Types.string,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        message: '',
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
			<span {...rest}>{message}</span>
		);
	}
});