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
		title: Types.string,
		className: Types.string.isRequired,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        title: '',
        className: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
			className: this.props.className,
			item: this.props.item,
			key: this.props.key
        };
    }
	render() {
		const { title, className, ...rest } = this.props;
		return (
			<span className={className} {...rest}>{title}</span>
		);
	}
};