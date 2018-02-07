"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Redirect,
  browserHistory
} from 'react-router';
import {Switch} from 'react-router-dom';

/* views */
import AppLayout from 'appRoot/views/app';
// import Home from 'appRoot/views/home';

import CSS from 'appRoot/css/app.less';

import Login from 'appRoot/js/views/login';
import PostList from 'appRoot/js/views/posts/list';
import PostView from 'appRoot/js/views/posts/view';
import PostEdit from 'appRoot/js/views/posts/edit';
import UserList from 'appRoot/js/views/users/list';
import UserView from 'appRoot/js/views/users/view';
import UserEdit from 'appRoot/js/views/users/edit';
import NotFound from 'appRoot/js/components/errors/404';

// export default () => (
//   	<Router history={browserHistory}>
//     	<Route path='/' component={AppLayout} />
//       		<IndexRoute component={Login} />
//     	</Route>
//     	<Route path='/post/:pageNum/?' component={PostList} ignoreScrollBehavior />
//     	<Route path='/posts/create' component={PostEdit} />
// 		<Route path='/posts/:postId/edit' component={PostEdit} />
// 		<Route path='/posts/:postId' component={PostView} />
// 		<Route path='/users' component={UserList} />
// 		<Route path='/users/create' component={UserEdit} />
// 		<Route path='/users/:userId' component={UserView} />
// 		<Route path='/users/:userId/edit' component={UserEdit} />
// 		<Route path='/login' component={Login} />
// 		<Route path='*' component={PostList} />
// 		<Redirect from='*' to='/' />
//   	</Router>
// );

export default class RouterLayout extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = { };
  	}
  	// componentDidUpdate(nextProps, nextState) {
	  //   //let newShoppingItems = this.calculateShoppingItems();
	  //   //this.setState({ listOfShoppingItems: newShoppingItems });
  	// }
  	// shouldComponentUpdate(nextProps, nextState) {
   //      //this.setState({ src: this.props.initialImage });
   //      //return true;
   //  }
	render() {
		return (
			<Router history={browserHistory}>
				<Switch>
					<Route exact path='/' component={AppLayout} />
					<IndexRoute component={PostList} />
					<Route exact path='/post/:pageNum/?' component={PostList} ignoreScrollBehavior />
					<Route exact path='/posts/create' component={PostEdit} />
					<Route exact path='/posts/:postId/edit' component={PostEdit} />
					<Route exact path='/posts/:postId' component={PostView} />
					<Route exact path='/users' component={UserList} />
					<Route exact path='/users/create' component={UserEdit} />
					<Route exact path='/users/:userId' component={UserView} />
					<Route exact path='/users/:userId/edit' component={UserEdit} />
					<Route exact path='/login' component={Login} />
					<Route path='*' component={PostList} />
					<Route component={NotFound} />
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		);
	}
};