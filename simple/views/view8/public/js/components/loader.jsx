"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

export default class Loader extends React.Component {
	mixins: [Logger]
	propTypes: {
        item: Types.object,
        key: Types.string
	}
	constructor(props) {
        super(props);
    }
    getDefaultProps() {
        return {
            item: {},
            key: ''
        };
    }
    getInitialState() {
		return {
			item: this.props.item,
			key: this.props.key
		};
	}
	render() {
		let classes = ClassNames({
			'loader-container': true,
			'inline': this.props.inline
		});
		return (
			<div className="loader">
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

