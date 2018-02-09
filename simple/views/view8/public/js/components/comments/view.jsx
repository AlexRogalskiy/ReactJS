"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import JQuery from 'jquery';

import BasicCommentItemList from '../elements/basicCommentItemList';
import CommentForm from '../forms/commentForm';

import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

export default class View extends React.Component {
	displayName: 'View'
	static propTypes: {
		items: Types.array,
		item: Types.object,
		key: Types.string
	}
	static defaultProps = {
        items: [],
        item: {},
        key: ''
    }
	constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            items: this.props.items,
			item: this.props.item,
			key: this.props.key
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
	onSubmit(e) {
		var comments = this.state.items;
        //comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({items: newComments});

        JQuery.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({items: data});
            },
            error: function (xhr, status, err) {
                this.setState({items: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
		});
	}
	render() {
		const { item, ...rest } = this.props;
		return (
            <div {...rest}>
                <BasicCommentItemList items={this.state.items} />
                <CommentForm onSubmit={this.onSubmit} />
            </div>
		);
	}
};