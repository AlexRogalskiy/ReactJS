"use strict";
/**
 * Module dependencies
 */
import React     from 'react';
import BasicIcon from './basicIcon';

let Types = React.PropTypes;

export default class BasicMenuItem extends React.Component {
    displayName: 'BasicMenuItem'
	static propTypes: {
        dataClass: Types.object,
		title: Types.string,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { iconClass: 'glyphicon' },
        title: '',
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: this.props.dataClass,
            title: this.props.title,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
    	const { dataClass, item, key, title, ...rest } = this.props;
        const { iconClass, ...restClass }  = dataClass;
        return (
            <li key={key} {...rest}><BasicIcon className={iconClass} />{title}</li>
        );
    }
}