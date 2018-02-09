"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

export default class Loader extends React.Component {
	displayName: 'Loader'
	static propTypes: {
        item: Types.object,
        key: Types.string
	}
	static defaultProps = {
		className: 'loader',
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
		const classes = ClassNames({'loader-container': true, 'inline': this.props.inline});
		return (
			<div {...rest}>
				<div className={classes}>
					<aside></aside>
					<aside></aside>
					<aside></aside>
					<aside></aside>
					<aside></aside>
				</div>
			</div>
		);
	}
};

