"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames';
import lifecycle  from 'appRoot/js/mixins/lifecycle';
// import Color      from 'appRoot/js/mixins/color';

let Types = React.PropTypes;

// @lifecycle
export default class BasicHeader extends React.Component {
    displayName: 'BasicHeader'
	static propTypes = {
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
            item: props.item,
            key: props.key
        };
    }
	render() {
        const { item, ...rest } = this.props;
		return (
            <h1 {...rest}>{rest.children}</h1>
        );
	}
};