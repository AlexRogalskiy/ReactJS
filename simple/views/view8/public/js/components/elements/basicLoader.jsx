"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

export default class BasicLoader extends React.Component {
	displayName: 'BasicLoader'
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
        	className: props.className,
            item: props.item,
			key: props.key
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

