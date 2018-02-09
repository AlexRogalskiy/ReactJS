"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicTextContent extends React.Component {
    displayName: 'BasicTextContent'
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
		return (
			<span {...this.props}>{this.props.children}</span>
		);
	}
});