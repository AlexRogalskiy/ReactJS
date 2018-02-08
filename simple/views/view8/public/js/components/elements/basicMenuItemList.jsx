"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import SearchPlugin from '../plugins/searchPlugin';
import BasicMenuItem from './basicMenuItem';

let Types = React.PropTypes;

class BasicMenuItemList extends React.Component {
    static propTypes: {
        title: Types.string,
        items: Types.array,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        title: '',
        items: [],
        item: {},
        key: ''
    }
    constructor(props){
        super(props);
        this.filterList = this.filterList.bind(this);
        this.state = {
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
        return (
            <div>
                <h2>{title}</h2>
                <SearchPlugin filter={this.filterList} />
                <ul>
                    {
                        this.state.items.map(function(item) {
                            return <BasicMenuItem item={item} key={item.id} title={item.title} {...rest} />
                        })
                    }
                </ul>
            </div>
        );
    }
}