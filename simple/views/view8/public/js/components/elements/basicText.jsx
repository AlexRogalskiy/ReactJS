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
        item: Types.object
    }
    static defaultProps = {
        message: '',
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            item: props.item
        };
    }
	render() {
        const { message, item, ...rest } = this.props;
		return (
			<span {...rest}>{message}</span>
		);
	}
});