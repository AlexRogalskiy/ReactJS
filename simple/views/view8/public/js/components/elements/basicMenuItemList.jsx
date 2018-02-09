"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import SearchPlugin from 'appRoot/js/components/plugins/searchPlugin';
import BasicMenuItem from 'appRoot/js/components/elements/basicMenuItem';

let Types = React.PropTypes;

export default class BasicMenuItemList extends React.Component {
    displayName: 'BasicMenuItemList'
    static propTypes: {
        dataClass: Types.object,
        items: Types.array,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { itemClass: 'menuitem', itemIconClass: 'menuitemicon' },
        items: [],
        item: {},
        key: ''
    }
    constructor(props){
        super(props);
        this.filterList = this.filterList.bind(this);
        this.state = {
            dataClass: this.props.dataClass,
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
        const { dataClass, items, ...rest } = this.props;
        const { itemClass, itemIconClass, ...restClass } = dataClass;
        return (
            <div {...rest} >
                <SearchPlugin filter={this.filterList} />
                <ul>
                    {
                        this.state.items.map(function(item) {
                            restClass.iconClass = item.iconClass ? item.iconClass : itemIconClass;
                            return <BasicMenuItem item={item} key={item.id} title={item.title} className={item.className ? item.className : itemClass} dataClass={restClass} />
                        })
                    }
                </ul>
            </div>
        );
    }
}