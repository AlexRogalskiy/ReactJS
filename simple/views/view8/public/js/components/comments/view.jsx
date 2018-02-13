"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import JQuery from 'jquery';

import BasicCommentItemList from 'appRoot/js/components/elements/basicCommentItemList';
import CommentForm from 'appRoot/js/components/forms/commentForm';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class View extends React.Component {
	displayName: 'View'
	static propTypes: {
        dataClass: Types.object,
		items: Types.array,
		item: Types.object,
	}
	static defaultProps = {
        dataClass: { commentListClass: 'commentList', commentFormClass: 'commentForm' },
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
			item: props.item
        };
    }
    loadComments() {
        JQuery.get(this.props.url).then(
            (data) => {
                this.setState({items: data});
            },
            (err) => {
                Logger.error(this.props.url, err);
            }
        );
	}
	componentDidMount() {
        this.loadComments();
        //setInterval(this.loadComments, this.props.pollInterval);
	}
	onCommentSubmit(comment) {
		const comments = this.state.items;
        //comment.id = Date.now();
        const newComments = comments.concat([comment]);
        this.setState({items: newComments});

        JQuery.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({ items: data });
            },
            error: function (xhr, status, err) {
                this.setState({items: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
		});
	}
	render() {
		const { dataClass, item, ...rest } = this.props;
        const { commentListClass, commentFormClass, ...restClass } = dataClass;
		return (
            <div {...rest}>
                <BasicCommentItemList items={this.state.items} className={commentListClass} dataClass={restClass} />
                <CommentForm onCommentSubmit={this.onCommentSubmit}  className={commentFormClass} dataClass={restClass} />
            </div>
		);
	}
};