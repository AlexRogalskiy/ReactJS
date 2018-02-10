"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import Reflux     from 'reflux';
import { Link }   from 'react-router';
import ClassNames from 'classnames';
import Moment     from 'moment';
import Actions    from 'appRoot/js/actions';
import PostStore  from 'appRoot/js/stores/posts';
import UserStore  from 'appRoot/js/stores/users';
import Session    from 'appRoot/js/stores/sessionContext';
import Loader     from 'appRoot/js/components/loader';

let dateFormat    = 'MM/DD/YYYY HH:mm:ss';

// export default class View extends React.Component {
const View = React.createClass({
	mixins: [
		Reflux.connect(Session, 'session'),
		Reflux.connect(UserStore, 'users')
	],
	getInitialState: function() {
		return {
			post: this.props.post
		};
	},
	componentWillMount: function() {
		if (this.state.post) {
		} else {
			this.getPost();
		}
	},
	getUserFromPost: function(post) {
		return Array.find(this.state.users, function (user) {
			return user.id === post.user;
		});
	},
	getPost: function() {
		if (this.isMounted()) {
			this.setState({loading: true});
		} else {
			this.state.loading = true;
		}

		Actions.getPost(this.props.params.postId)
		.then(function (data) {
			//this.state.posts = this.state.posts.concat(data);
			this.setState({
				loading: false,
				post: data
			});
		}.bind(this));  	
	},
	render: function() {
		if (this.state.loading) { return <Loader />; }
		let post = this.state.post
		,   user = this.getUserFromPost(post)
		,   name = user.firstName && user.lastName ? 
				user.firstName + ' ' + user.lastName : 
				user.firstName ?
				user.firstName : 
				user.username
		;
		return this.props.mode === 'summary' ? (
			<li className="post-view-summary">
				<aside>
					<img className="profile-img small" src={user.profileImageData} />
					<div className="post-metadata">
						<strong>{post.title}</strong>
						<span className="user-name">{name}</span>
						<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
					</div>
				</aside>
				<summary>{post.summary}</summary>
				&nbsp;
				<Link to={`/posts/${post.id}`}>read more</Link> 
				{
					user.id === this.state.session.id ? (
						<div>
							<Link to={`/posts/${post.id}/edit`}>
								<button>edit post</button>
							</Link>
						</div>
					) : ''
				}
			</li> 
		) : (
			<div className="post-view-full">

				<div className="post-view-container">
					<h2>
						<img className="profile-img" src={user.profileImageData} />
						<div className="post-metadata">
							<strong>{post.title}</strong>
							<span className="user-name">{name}</span>
							<em>{Moment(post.date, 'x').format(dateFormat)}</em> 
						</div> 
					</h2>
					<section className="post-body" dangerouslySetInnerHTML={{__html: post.body}}>
					</section>
				</div>
			</div>

		);
	}
});

export default View;