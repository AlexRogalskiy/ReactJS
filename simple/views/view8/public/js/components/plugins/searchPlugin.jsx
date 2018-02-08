"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import update from 'react-addons-update';

let Types = React.PropTypes;

class SearchPlugin extends React.Component{
    static propTypes: {
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        item: {},
        key: ''
    }
    constructor(props){
        super(props);
        this.onChanged = this.onChanged.bind(this);
        this.state = {
            item: this.props.item,
            key: this.props.key
        };
    }
    onChanged(e) {
        let text = e.target.value.trim();
        this.props.filter(text);
    }
    render() {
        return (
            <input onChange={this.props.onChanged ? this.props.onChanged : this.onChanged} {...update(this.props, {children: {$set: null}})} />
        );
    }
}