"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames';

export default class Loader extends React.Component {
	render() {
		var classes = ClassNames({
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

