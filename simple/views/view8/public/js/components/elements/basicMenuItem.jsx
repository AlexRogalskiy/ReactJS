"use strict";
/**
 * Module dependencies
 */
import React     from 'react';
import BasicIcon from './basicIcon';

let Types = React.PropTypes;

export default class BasicMenuItem extends React.Component {
	propTypes: {
		title: Types.string,
        item: Types.object,
        key: Types.string
    }
    constructor(props) {
        super(props);
    }
    getDefaultProps() {
        return {
        	title: '',
            item: {},
            key: ''
        };
    }
    getInitialState() {
		return {
			title: this.props.title,
			item: this.props.item,
			key: this.props.key
		};
	}
    render() {
    	const { title, ...rest } = this.props;
        return (
            <li {...rest}><BasicIcon message={title} /></li>
        );
    }
}