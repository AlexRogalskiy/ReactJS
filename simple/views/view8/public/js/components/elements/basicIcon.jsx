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
    displayName: 'BasicIcon'
	static propTypes: {
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        className: 'glyphicon',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
			className: this.props.className,
			item: this.props.item,
			key: this.props.key
        };
    }
	render() {
		const { item, ...rest } = this.props;
		return (
			<span {...rest}></span>
		);
	}
};