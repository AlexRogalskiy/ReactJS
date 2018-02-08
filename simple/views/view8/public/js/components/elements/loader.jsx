"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ClassNames from 'classnames';
// import Utils     from 'appRoot/js/mixins/logger';

export default class Loader extends React.Component {
	static propTypes: {
        item: Types.object,
        key: Types.string
	}
	static defaultProps = {
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.state = {
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

