import React from 'react';
import {Link} from 'reactp-router';

export default class AppHeader extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {};
  }
	render() {
		return (
			<header className='app-header'>
        app-header
        <Link to="/login">Log in</Link>
      </header>
		);
	}
}