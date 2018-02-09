"use strict";
/**
 * Module dependencies
 */
import React from 'react';

let Types = React.PropTypes;

export default class BasicCommentItemList extends React.Component {
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
            dataClass: this.props.dataClass,
            items: this.props.items,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
    	const { dataClass, items, ...rest } = this.props;
        const { commentClass, ...restClass } = dataClass;
        const elements = items.map(function(item) {
            return (
                <Comment item={item} key={item.id} author={item.author} className={item.className ? item.className : commentClass} dataClass={restClass}>
                    {item.text}
                </Comment>
            );
        });
        return (
            <div {...rest}>
                {elements}
            </div>
        );
    }
}