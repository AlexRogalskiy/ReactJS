"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import SearchPlugin from '../plugins/searchPlugin';
import BasicMenuItem from './basicMenuItem';

let Types = React.PropTypes;

class BasicMenuItemList extends React.Component {
    propTypes: {
        title: Types.string,
        items: Types.array,
        item: Types.object,
        key: Types.string
    }
    constructor(props){
        super(props);
        this.filterList = this.filterList.bind(this);
    }
    getDefaultProps() {
        return {
            title: '',
            items: [],
            item: {},
            key: ''
        };
    }
    getInitialState() {
        return {
            title: this.props.title,
            items: this.props.items,
            item: this.props.item,
            key: this.props.key
        };
    }
    filterList(text) {
        let filteredList = this.props.items.filter(function(item) {
            return item.toLowerCase().search(text.toLowerCase()) !== -1;
        }); 
        this.setState({items: filteredList});
    }
    render() {
        const { title, ...rest } = this.props;
        return(
            <div>
                <h2>{title}</h2>
                <SearchPlugin filter={this.filterList} />
                <ul>
                    {
                        this.state.items.map(function(item) {
                            return <BasicMenuItem key={item} name={item} {...rest} />
                        })
                    }
                </ul>
            </div>);
    }
}