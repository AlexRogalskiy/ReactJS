import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  Switch,
  Redirect,
  browserHistory
} from 'react-router';

/* views */
import App from './views/app';
import Home from './views/home';

import CSS from 'appRoot/css/app.less';
import AppHeader from 'appRoot/js/views/appHeader';
import Login from 'appRoot/js/views/login';
import PostList from 'appRoot/js/views/posts/list';
import PostView from 'appRoot/js/views/posts/view';
import PostEdit from 'appRoot/js/views/posts/edit';
import UserList from 'appRoot/js/views/users/list';
import UserView from 'appRoot/js/views/users/view';
import UserEdit from 'appRoot/js/views/users/edit';

export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

class AppLayout extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = { };
  	}
  	componentDidUpdate(nextProps, nextState) {
	    //let newShoppingItems = this.calculateShoppingItems();
	    //this.setState({ listOfShoppingItems: newShoppingItems });
  	}
  	shouldComponentUpdate(nextProps, nextState) {
        //this.setState({ src: this.props.initialImage });
        //return true;
    }
	render() {
		return (
			<div className='app-container'>
				<AppHeader />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
};

class RouterLayout extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = { };
  	}
  	componentDidUpdate(nextProps, nextState) {
	    //let newShoppingItems = this.calculateShoppingItems();
	    //this.setState({ listOfShoppingItems: newShoppingItems });
  	}
  	shouldComponentUpdate(nextProps, nextState) {
        //this.setState({ src: this.props.initialImage });
        //return true;
    }
	render() {
		return (
			<Router history={browserHistory}>
				<Switch>
					<Route path='/' component={AppLayout} />
					<IndexRoute component={PostList} />
					<Route path='/post/:pageNum/?' component={PostList} ignoreScrollBehavior />
					<Route path='/posts/create' component={PostEdit} />
					<Route path='/posts/:postId/edit' component={PostEdit} />
					<Route path='/posts/:postId' component={PostView} />
					<Route path='/users' component={UserList} />
					<Route path='/users/create' component={UserEdit} />
					<Route path='/users/:userId' component={UserView} />
					<Route path='/users/:userId/edit' component={UserEdit} />
					<Route path='/login' component={Login} />
					<Route path='*' component={PostList} />
					<Redirect from='*' to='/' />
				</Switch>
			</Router>
		);
	}
}