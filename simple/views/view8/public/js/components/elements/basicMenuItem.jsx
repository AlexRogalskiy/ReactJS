"use strict";
/**
 * Module dependencies
 */
import React     from 'react';
import BasicIcon from './basicIcon';

let Types = React.PropTypes;

export default class BasicMenuItem extends React.Component {
	static propTypes: {
		title: Types.string,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        title: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
    	const { key, title, ...rest } = this.props;
        return (
            <li key={key}><BasicIcon title={title} {...rest} /></li>
        );
    }
}