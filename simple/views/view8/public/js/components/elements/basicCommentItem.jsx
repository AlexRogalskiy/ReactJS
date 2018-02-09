"use strict";
/**
 * Module dependencies
 */
import React from 'react';

let Types = React.PropTypes;

export default class BasicCommentItem extends React.Component {
    displayName: 'BasicCommentItem'
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
    rawMarkup() {
        const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }
    render() {
    	const { dataClass, item, author, ...rest } = this.props;
        const { commentAuthorClass, commentTextClass } = dataClass;
        return (
            <div {...rest}>
                <h2 className={commentAuthorClass}>
                    {author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <span className={commentTextClass}>{...rest.children}</span>
            </div>
        );
    }
}