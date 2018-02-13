"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
// import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class BasicContent extends React.Component {
    displayName: 'BasicContent'
	static propTypes: {
        item: Types.object
    }
    static defaultProps = {
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
    }
	render() {
        const { item, ...rest } = this.props;
		return (
			<span {...rest}>{rest.children}</span>
		);
	}
};