"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import BasicCommentItem from 'appRoot/js/components/elements/basicCommentItem';

let Types = React.PropTypes;

export default class BasicCommentItemList extends React.Component {
    displayName: 'BasicCommentItemList'
	static propTypes: {
        dataClass: Types.object,
		items: Types.array,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { commentClass: 'comment' },
        items: [],
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item,
            key: props.key
        };
    }
    render() {
    	const { dataClass, items, ...rest } = this.props;
        const { commentClass, ...restClass } = dataClass;
        const elements = items.map(function(item) {
            return (
                <BasicCommentItem item={item} key={item.id} author={item.author} className={item.className ? item.className : commentClass} dataClass={restClass}>
                    {item.data}
                </BasicCommentItem>
            );
        });
        return (
            <div {...rest}>
                {elements}
            </div>
        );
    }
}