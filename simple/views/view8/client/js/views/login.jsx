import React from 'react';
import { History } from 'react-router';

export default class Login extends React.Component {
	mixins: [History],
	login(e) {
		this.history.pushState('', '/');
	}
	render() {
		return (
			<form className='login-form' onSubmit={this.login}>
				login-form
				<button type="submit">Login</button>
			</form>
		);
	}
}