"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import UserList   from 'appRoot/js/views/users/list';
import PostList   from 'appRoot/js/components/posts/list';

export default class List extends React.Component {
	render() {
		return (
			<div className="post-list-view">
				<PostList />
				<div className="users-list">
					<UserList />
				</div>
			</div>
		);
	}
};