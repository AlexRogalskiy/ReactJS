"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import Reflux     from 'reflux';
import Classnames from 'classnames';
import UserStore  from 'appRoot/js/stores/users';

// export default class View extends React.Component {
const View = React.createClass({
	mixins: [
		Reflux.connectFilter(UserStore, 'user', function (users) {
			return Array.find(users, function (user) {
				return user.id === parseInt(this.props.userId, 10);
			}.bind(this)); 
		})
	],
	render() {
		var user = this.state.user;
		return user ? (
			<div className={Classnames({
						'user': true,
						'small': this.props.small
				})}>
				<img className={Classnames({
						'profile-img': true,
						'small': this.props.small
					})} src={user.profileImageData} />
				<div className="user-meta">
					<strong>{user.blogName}</strong>
					<small>
						{user.firstName}&nbsp;{user.lastName}
					</small>
				</div> 
			</div>
		) : <div className="user" />;
	}
});

export default View;