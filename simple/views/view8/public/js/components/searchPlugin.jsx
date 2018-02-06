"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import update from 'react-addons-update';

let Types = React.PropTypes;

class SearchPlugin extends React.Component{
    propTypes: {
        item: Types.object,
        key: Types.string
    }
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
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
    onTextChanged(e){
        var text = e.target.value.trim();
        this.props.filter(text);
    }
    render() {
        return (
            <input onChange={this.props.onTextChanged ? this.props.onTextChanged : this.onTextChanged} {...update(this.props, {children: {$set: null}})} />
        );
    }
}