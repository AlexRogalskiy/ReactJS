"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicHeader extends React.Component {
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
		return (
            <h1 {...this.props}>{this.props.children}</h1>
        );
	}
};