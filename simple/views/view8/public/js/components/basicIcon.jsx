"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicIcon extends React.Component {
	mixins: [Logger]
	propTypes: {
		className: Types.string,
        item: Types.object,
        key: Types.string
    }
    constructor(props) {
        super(props);
    }
    getDefaultProps() {
        return {
        	className: '',
            item: {},
            key: ''
        };
    }
    getInitialState() {
		return {
			className: this.props.className,
			item: this.props.item,
			key: this.props.key
		};
	}
	render() {
		return (
			<span className={this.props.className}></span>
		);
	}
};