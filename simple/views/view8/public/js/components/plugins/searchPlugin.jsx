"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import update from 'react-addons-update';

let Types = React.PropTypes;

export default class SearchPlugin extends React.Component{
    static propTypes: {
        item: Types.object
    }
    static defaultProps = {
        item: {}
    }
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            item: props.item
        };
    }
    onChange(e) {
        const text = e.target.value.trim();
        this.props.filter(text);
        if(this.props.onChange) {
            this.props.onChange(e);
        }
    }
    render() {
        const { item, onChange, ...rest } = this.props;
        return (
            <input onChange={this.onChange} {...update(rest, {children: {$set: null}})} />
        );
    }
}