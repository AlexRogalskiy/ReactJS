"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import UserView  from 'appRoot/js/components/users/view';

export default class View extends React.Component {
	render() {
		return (
			<div className="user-view">
				<UserView userId={this.props.params.userId} />
			</div>
		);
	}
};