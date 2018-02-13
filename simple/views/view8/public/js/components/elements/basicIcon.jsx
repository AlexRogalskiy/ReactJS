"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicIcon extends React.Component {
    displayName: 'BasicIcon'
	static propTypes: {
        item: Types.object
    }
    static defaultProps = {
        className: 'glyphicon',
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
			className: props.className,
			item: props.item
        };
    }
	render() {
		const { item, ...rest } = this.props;
		return (
			<span {...rest}></span>
		);
	}
};