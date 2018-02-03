"use strict";
/**
 * Module dependencies
 */
import React     from 'react';
import Reflux    from 'reflux';
import { Link }  from 'react-router';
import UserStore from 'appRoot/js/stores/users';
import UserView  from 'appRoot/js/components/users/view';

// export default class List extends React.Component {
const List = React.createClass({
	mixins: [Reflux.connect(UserStore, 'users')],
	render() {
		return (
			<ul className="user-list">
				{this.state.users ? 
					this.state.users.map(function (v) {
						return (
							<li key={v.id}>
								<Link to={`/users/${v.id}`}>
									<UserView userId={v.id} small={true} />
								</Link>
							</li>
						);
					}) : []
				}
			</ul>
		);
	}
});
export default List;