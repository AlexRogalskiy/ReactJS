"use strict";
/**
 * Module dependencies
 */
import React from 'react';

let Types = React.PropTypes;

export default class BasicCommentItem extends React.Component {
	static propTypes: {
        dataClass: Types.object,
        item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        dataClass: { commentAuthorClass: 'commentAuthor', commentTextClass: 'commentText' },
        item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: this.props.dataClass,
            item: this.props.item,
            key: this.props.key
        };
    }
    render() {
    	const { dataClass, item, ...rest } = this.props;
        const { commentAuthorClass, commentTextClass } = dataClass;
        return (
            <div className={rest.className}>
                <h2 className={commentAuthorClass}>
                    {rest.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <span className={commentTextClass}>{...rest.children}</span>
            </div>
        );
    }
}