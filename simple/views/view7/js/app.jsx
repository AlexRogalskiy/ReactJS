/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Routerr, Routee, browserHistory, IndexRoutee} from 'react-router';
import {Switch, BrowserRouter as Router, Route, IndexRoute, Redirect} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import CSS from '../css/app.less';
import AppHeader from 'appRoot/views/appHeader';
import Login from 'appRoot/views/login';
import PostList from 'appRoot/views/posts/list';
import PostView from 'appRoot/views/posts/view';
import PostEdit from 'appRoot/views/posts/edit';
import UserList from 'appRoot/views/users/list';
import UserView from 'appRoot/views/users/view';
import UserEdit from 'appRoot/views/users/edit';

export default class AppLayout extends React.Component {
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

const render = Component => {
  	ReactDOM.render(
    	<AppContainer>
      		<Component />
    	</AppContainer>,
    	document.getElementById('view')
  	)
}

// ReactDOM.render(<AppContainer><AppLayout /></AppContainer>, document.getElementById('view'));
render(AppLayout)